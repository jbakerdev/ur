import * as React from 'react';
import AppStyles, { colors } from '../../AppStyles'
import ViewscreenFrame from '../canvas/ViewscreenFrame';
import Splash from '../Splash';

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
    turn: number
    creativeMode: boolean
}

export default class UIManager extends React.Component<Props> {

    render(){
        return (
            <div style={styles.frame}>
                {!this.props.tiles && <Splash modal={this.props.modal} creativeMode={this.props.creativeMode}/>}
                {this.props.tiles && <ViewscreenFrame {...this.props}/>}
            </div>
        )
    }
}

const styles = {
    frame: {
        height: '100vh',
        background: colors.background,
        overflow:'hidden',
        display:'flex',
        alignItems:'center',
        justifyContent: 'center'
    },
    dot: {
        height:'0.5em',
        width:'0.5em',
        borderRadius: '0.5em'
    },
    statusDot: {
        position:'absolute' as 'absolute', bottom:'0.5em', right:'0.5em',
        display:'flex',
        color: colors.black,
        alignItems:'center'
    }
}