import * as React from 'react'
import AppStyles from '../../AppStyles';
import { onReset, onQuit } from '../uiManager/Thunks';
import { Button } from '../Shared';

interface Props{
}

export default class Win extends React.PureComponent<Props> {

    render(){
        return (
            <div style={{...AppStyles.modal, height:'450px', justifyContent:'space-between', backgroundImage: 'url('+require('../../assets/dead.png')+')', backgroundSize:'cover'}}>
                <h2 style={{color:'black'}}>MY PEOPLE CRUSHED THEM</h2>
                <div>{Button(true, onReset, 'PRAISE UNDUKU')}</div>
            </div>
        )
    }
}
