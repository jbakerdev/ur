import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, Icon, NumericInput, LightButton, ButtonStrip } from '../Shared'
import { onQuit, onHideModal } from '../uiManager/Thunks';

interface Props{
}

export default class Help extends React.PureComponent<Props> {

    render(){
        return (
            <div style={{...AppStyles.modal, height:'800px', width:'600px', justifyContent:'space-between', background:'black', textAlign:'center'}}>
                <h3>I AM DREAD UNDUKU</h3>
                <div>
                    <h4>I WILL PLACE MY CHOSEN PEOPLE</h4>
                    {Icon('Tribe', '', true)}
                    <h4>I WILL PLACE THEIR ENEMIES</h4>
                    {Icon('BanditCamp', '', true)}
                    <h4 style={{marginBottom:'5px'}}>I WILL PLACE GIFTS FOR MY PEOPLE: </h4>
                    <h4>PLAINS TO GROW FOOD, SO THEY MAY HAVE FARMS</h4>
                    {Icon('Plain', '', true)} 
                    <h4>HILLS TO MINE ORE, SO THEY MAY TRAIN WARRIORS</h4>
                    {Icon('Hill', '', true)} 
                    <h4>ANIMALS SO THEIR FARMS MAY GROW</h4>
                    {Icon('Animal', '', true)} 
                </div>
                <h4>IF I CHOOSE MALICE, THE PEOPLE WILL MOVE AFTER EACH GIFT IS PLACED.</h4>
                <h4>IF I CHOOSE APATHY, ALL GIFTS WILL BE PLACED BEFORE I ALLOW ANY MOVEMENT.</h4>
                <h3 style={{marginBottom:'10px', marginTop:'10px'}}>SEE THE BOUNTY I HAVE GIVEN MY PEOPLE.</h3>
                {Button(true, onHideModal, 'PRAISE UNDUKU')}
            </div>
        )
    }
}
