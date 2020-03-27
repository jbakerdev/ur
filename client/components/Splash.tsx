import * as React from 'react';
import AppStyles from '../AppStyles';
import { TopBar } from './Shared'
import Login from './Login';
const boot = require('../assets/audio/chime.mp3')

interface Props {
    creativeMode: boolean
    modal:Modal
}

export default class Splash extends React.Component<Props> {

    state = { transitionState: 0, audio: new Audio(boot) }

    componentDidMount(){
        setTimeout(()=>{this.setState({transitionState: 1});this.state.audio.play()}, 1000)
        setTimeout(()=>{this.setState({transitionState: 2})}, 4000)
        setTimeout(()=>{this.setState({transitionState: 3})}, 7000)
    }

    render(){
        return this.state.transitionState === 3 ? 
         <Login modal={this.props.modal} creativeMode={this.props.creativeMode}/> : (
        <div>
            <div style={{opacity: this.state.transitionState === 1 ? 1:0, transition:'opacity 1s', width:'25em'}}>
                <img style={{width:'-webkit-fill-available'}} src={require('../assets/Cryptomnesic2.png')}/>
                <h3 style={{margin:'1em', textAlign:'center'}}>PRESENTS</h3>
            </div>
        </div>
        )
    }
}