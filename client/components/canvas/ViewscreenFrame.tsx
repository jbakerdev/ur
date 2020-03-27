import * as React from 'react'
import AppStyles from '../../AppStyles';
import Viewscreen from './Viewscreen'
import { TopBar, Button, LightButton, RangeInput, Icon, ProgressBar } from '../Shared'
import { Modal } from '../../enum';
import Lose from '../views/Lose';
import Win from '../views/Win';
import { Icons } from '../../assets/Assets';
import Help from '../views/Help';

interface Props {
    npcs: Array<PlayerState>
    modal:Modal
    hasWon:boolean
    hasLost:boolean
    tiles: Array<Tile>
    food:number
    foodGain: number
    hammers: number
    hammerGain: number
    turn:number
}

export default class ViewscreenFrame extends React.Component<Props> {

    render(){
        return (
                <div style={{position:'relative', padding:'17px', backgroundImage:'url('+require('../../assets/ui/cheetex_bones.png')+')', backgroundColor:'magenta', backgroundBlendMode:'darken'}}>
                    {this.props.hasLost && <Lose/>}
                    {this.props.hasWon && <Win/>}
                    <Viewscreen {...this.props} />
                    <div style={{position:"absolute", bottom:15, right:20, background:'black', padding:'5px', width:'calc(100% - 48px)'}}>
                        <div style={{display:'flex'}}>
                            <div style={{display:'flex', flexDirection:'column', justifyContent:"space-around"}}>
                                <h4>{Icon('Food','')} {this.props.food} (+{this.props.foodGain})</h4>
                                <h4>{Icon('Money','')} {this.props.hammers} (+{this.props.hammerGain})</h4>
                            </div>
                            {this.props.tiles.length > 0 ? 
                            <div style={{marginLeft:'30px', marginTop:'10px'}}>
                                <div>
                                    <h4 style={{marginBottom:'5px'}}>PLACING {this.props.tiles.length} GIFTS: (SPACE or ENTER)</h4>
                                </div>
                                <div style={{display:"flex", alignItems:'center'}}>
                                    {Icon(this.props.tiles[0].iconName, '', true)}
                                    <h5 style={{marginLeft:'10px'}}>{this.props.tiles[0].description}</h5>
                                </div>
                            </div> : this.props.turn > 75 ? <h4 style={{color:'magenta', marginLeft:'30px', marginTop:'10px'}}>UNDUKU IS BORED...</h4> : <h4 style={{marginLeft:'30px', marginTop:'10px'}}>NO MORE GIFTS.</h4>
                            }
                        </div>
                        
                    </div>
                </div>
        )
    }
}