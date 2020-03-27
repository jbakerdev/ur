import * as React from 'react';
import AppStyles, { colors } from '../AppStyles';
import { ButtonStrip, Select, Button } from './Shared'
import { onToggleCreativeMode, onInitSession, onShowModal } from './uiManager/Thunks';
import { Difficulty, Modal } from '../enum';
import Help from './views/Help';
const boot = require('../assets/audio/intro.mp3')

interface Props {
    creativeMode: boolean
    modal: Modal
}

export default class Login extends React.Component<Props> {

    state = { transitionState: 0, audio: new Audio(boot) }

    componentDidMount(){
        this.state.audio.loop = true
        this.state.audio.play()
    }

    componentWillUnmount(){
        this.state.audio.pause()
    }

    render(){
        return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <div>
                <div style={{backgroundImage: 'url('+require('../assets/lovecraft.jpg')+')', backgroundSize:'cover', width:'800px', height:'800px'}}>
                    {this.props.modal === Modal.HELP && <Help/>}
                    <h3 style={{fontFamily:'Arcology', fontSize:'75px', paddingTop:'50%', paddingLeft:'10px'}}>DREAD UNDUKU</h3>
                    <div style={{padding:'10px'}}>
                        <div style={{marginBottom:'10px'}}>
                        {ButtonStrip([
                            {text: 'Amusing', handler: ()=>{onInitSession(Difficulty.EASY)}, active: false},
                            {text: 'Cruel', handler: ()=>{onInitSession(Difficulty.MEDIUM)}, active: false},
                            {text: 'Devilish', handler: ()=>{onInitSession(Difficulty.HARD)}, active: false},
                        ])}
                        </div>
                        {ButtonStrip([
                            {text: 'Malice', handler: onToggleCreativeMode, active: !this.props.creativeMode},
                            {text: 'Apathy', handler: onToggleCreativeMode, active: this.props.creativeMode}
                        ])}
                        <div style={{marginTop:'100px'}}>
                        {ButtonStrip([
                            {text: 'UNDUKU?', handler: ()=>onShowModal(Modal.HELP), active: false}
                        ])}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}