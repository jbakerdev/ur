import { Scene, GameObjects, Tilemaps, Geom } from "phaser";
import { store } from "../../../App";
import { defaults, Sprites } from '../../../assets/Assets'
import { Modal, UIReducerActions, StaticLayers } from "../../../enum";
import { onLose, onWin, onUpdateNPCs, onPlacedTile, onUpdateResources, onUpdateFoodGain, onUpdateHammerGain } from "../../uiManager/Thunks"

const TILE_WIDTH = 16
const IMMUNITY_STEP = 8

export default class BoardScene extends Scene {

    unsubscribeRedux: Function
    selectIcon: GameObjects.Image
    selectedTile: Tilemaps.Tile
    sounds: any
    pieceSprites: Array<GameObjects.Sprite>
    map:Tilemaps.Tilemap
    tileLayer: Tilemaps.StaticTilemapLayer
    messages: Array<GameObjects.Text>

    constructor(config){
        super(config)
        this.unsubscribeRedux = store.subscribe(this.onReduxUpdate)
    }

    preload = () =>
    {
        defaults.forEach(asset=>{
            (this.load[asset.type] as any)(asset.key, asset.resource, asset.data)
        })
        console.log('assets were loaded.')
    }
    
    onReduxUpdate = () => {
        const uiState = store.getState()
        let engineEvent = uiState.engineEvent
        if(engineEvent)
            switch(engineEvent){
                case UIReducerActions.TICK:
                    break
            }
    }

    create = () =>
    {
        this.sound.volume = 0.4
        this.sounds = {
            step: this.sound.add('step'),
            intro: this.sound.add('intro'),
            rock: this.sound.add('rock'),
            end: this.sound.add('end'),
            destroyed: this.sound.add('destroyed'),
            error: this.sound.add('error')
        }
        this.pieceSprites = []
        this.messages = []
        this.map = this.make.tilemap({ key: 'map'})
        let tileset = this.map.addTilesetImage('TILESET', 'TILESET')
        
        this.map.createStaticLayer('board', tileset)
        this.tileLayer = this.map.createStaticLayer('tiles', tileset)
        
        this.setSelectIconPosition(this.selectedTile)
        
        this.cameras.main.setZoom(2)
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        this.cameras.main.setScroll(this.map.widthInPixels/2, this.map.heightInPixels/2)
        
        this.input.keyboard.on('keydown-LEFT', (event) => {
            let targetTile = this.getPlayerPieceTile(1)
            targetTile && this.setSelectIconPosition(targetTile)
        })
        this.input.keyboard.on('keydown-RIGHT', (event) => {
            let targetTile = this.getPlayerPieceTile(-1)
            targetTile && this.setSelectIconPosition(targetTile)
        })
        this.input.keyboard.on('keydown-SPACE', (event) => {
            let state = store.getState()
            if(state.human.id === state.activePlayerId){
                this.moveHumanPiece(state.selectedPiece, state.currentRoll)
                onEndHumanTurn()
                this.runAITurn()
            }
        })
        this.input.mouse.disableContextMenu()
    }

    runAITurn = () => {
        let state = store.getState()
        let aiRoll = Phaser.Math.Between(0,4)
        //Find threatened player pieces and move threatening piece
        let threatPiece = state.cpu.pieces.find(p=>state.human.pieces.findIndex(h=>h.step === p.step+aiRoll && h.step !== IMMUNITY_STEP)!==-1)
        if(threatPiece) this.collideAIPiece(threatPiece, aiRoll)
        else {
            let furthest = state.cpu.pieces.sort((p1,p2)=>p1.step-p2.step)
            let validMove = false
            furthest.forEach(p=>{
                if(!validMove)
                    validMove = this.tryMoveAIPiece(p, aiRoll)
            })
        }
        if(state.cpu.pieces.filter(p=>p.step === state.cpu.path.length-1).length === state.cpu.pieces.length) {
            onLose()
            return
        }
        onStartHumanTurn(state.human.id, Phaser.Math.Between(0,4))
    }

    getPlayerPieceTile = (index:number) => {
        let state = store.getState()
        let selectedIndex = state.human.pieces.findIndex(p=>p.id === state.selectedPiece.id)
        let newPiece = state.human.pieces.filter(p=>p.step < state.human.path.length-1)[(selectedIndex+index)%state.human.pieces.length]
        onUpdateSelectedPiece(newPiece)
        return this.tileLayer.getTileAt(state.human.path[newPiece.step].tileX, state.human.path[newPiece.step].tileY)
    }

    collideAIPiece = (piece:Piece, amount:number) => {
        let collisionPiece = store.getState().human.pieces.find(p=>p.step === piece.step+amount)
        collisionPiece.step=0
        let startingTile = this.playerStart
        this.tweens.add({
            targets: collisionPiece,
            x: startingTile.getCenterX(),
            y: startingTile.getCenterY(),
            duration: 500
        })
        onUpdatePiece(collisionPiece)
        this.movePiece(piece, amount)
    }

    tryMoveAIPiece = (piece:Piece, amount:number) => {
        if(piece.step+amount > store.getState().human.path.length-1){
            return false
        }
        this.movePiece(piece, amount)
        return true
    }

    movePiece = (piece:Piece, amount:number) => {
        let targetTile = this.getLandingTileForPiece(piece)
        let pieceSpr = this.pieceSprites.find(p=>p.name === piece.id)
        piece.step+=amount
        if(piece.step > store.getState().human.path.length-1){
            //score piece
            onScorePiece(piece)
            targetTile = this.getScoringTileForPiece(piece)
        }
        this.tweens.add({
            targets:pieceSpr, 
            x: targetTile.getCenterX(),
            y: targetTile.getCenterY(),
            duration: 500,
        })
        onUpdatePiece(piece)
    }

    moveHumanPiece = (piece:Piece, amount:number) => {
        let pieceSpr = this.pieceSprites.find(p=>p.name === piece.id)
        let enemy = store.getState().cpu
        let collisionPiece = enemy.pieces.find(p=>p.step === piece.step+amount)
        if(collisionPiece && collisionPiece.step !== IMMUNITY_STEP){
            collisionPiece.step=0
            let startingTile = this.aiStart
            this.tweens.add({
                targets: collisionPiece,
                x: startingTile.getCenterX(),
                y: startingTile.getCenterY(),
                duration: 500
            })
            onUpdatePiece(collisionPiece)
        }
        let state = store.getState()
        if(collisionPiece && (collisionPiece.step === IMMUNITY_STEP || piece.step+amount > state.human.path.length-1)) {
            this.sounds.error.play()
            this.tweens.add({
                targets:pieceSpr, 
                x: pieceSpr.x+5,
                y: pieceSpr.y-5,
                duration: 100,
                yoyo:true,
                repeat: 3
            })
            return
        }
        this.movePiece(piece, amount)
        if(state.human.pieces.filter(p=>p.step === state.human.path.length-1).length === state.human.pieces.length) {
            onWin()
        }
    }

    getLandingTileForPiece = (peice:Piece) => {
        let state = store.getState()
        let tuple = state.human.path[peice.step+state.currentRoll]
        return this.tileLayer.getTileAt(tuple.tileX, tuple.tileY)
    }

    setSelectIconPosition(targetTile:Tilemaps.Tile){
        if(!this.selectIcon){
            this.selectIcon = this.add.image(this.selectedTile.pixelX, this.selectedTile.pixelY, 'selected').setDepth(2).setScale(0.5)
            this.add.tween({
                targets: this.selectIcon,
                scale: 1,
                duration: 1000,
                repeat: -1,
                ease: 'Stepped',
                easeParams: [3],
                yoyo: true
            })
        }
        this.selectIcon.setPosition(targetTile.getCenterX(), targetTile.getCenterY())
        this.selectedTile = targetTile
        this.sounds.step.play()
    }

    showText = (x:number, y:number, text:string, color:string) => {
        let font = this.add.text(x, y, text, {
            fontFamily: 'Arcology', 
            fontSize: '8px',
            color
        })
        font.setDepth(4)
        this.messages.push(font)
        font.setPosition(x-(font.displayWidth/2), y-(30*this.messages.length))
        this.add.tween({
            targets: font,
            ease: 'Stepped',
            easeParams:[4],
            duration: 1500,
            alpha: 0,
            y: y+30,
            onComplete: ()=>{
                font.destroy()
                this.messages = this.messages.filter(f=>f.alpha > 0)
            }
        })
    }
}