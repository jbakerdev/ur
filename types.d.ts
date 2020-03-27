declare enum Difficulty {
    EASY='easy',
    MEDIUM='medium',
    HARD='hard'
}

declare enum UIReducerActions { 
    HIDE_MODAL='hmdl',
    SHOW_MODAL='smdl',
    QUIT='qg',
    NEW_SESSION='ngms',
    TICK='t',
    UPDATE_NPCS='uplay',
    LOSE= 'loose',
    WIN='win',
    RESET='reset',
    UPDATE_SELECTED='uslel',
    UPDATE_ACTIVE='uact',
    UPDATE_PLAYER='upl'
}

declare enum Modal {
    HELP='halp'
}

interface Asset {
    key: string
    type: string
    resource: any
    data?: any
}

interface Piece {
    id:string
    step:number
    color: string
}

interface PlayerState {
    id:string
    pieces: Array<Piece>
    isAI: boolean
    path: Array<Tuple>
}

interface Tuple {
    tileX: number
    tileY: number
}

interface RState {
    engineEvent: UIReducerActions
    modal: Modal
    human: PlayerState
    cpu: PlayerState
    activePlayerId: string
    currentRoll: number
    selectedPiece: Piece
}