import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton } from '../Shared'
import { onQuit, onReset } from '../uiManager/Thunks';

interface Props{
}

export default class Lose extends React.PureComponent<Props> {

    render(){
        return (
            <div style={{...AppStyles.modal, height:'450px', justifyContent:'space-between', backgroundImage: 'url('+require('../../assets/dead.png')+')', backgroundSize:'cover'}}>
                <h2 style={{color:'black'}}>MY PEOPLE WERE WEAK</h2>
                <div>{Button(true, onReset, 'PRAISE UNDUKU')}</div>
            </div>
        )
    }
}
