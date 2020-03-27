import { dispatch, store } from '../../../client/App'
import { UIReducerActions, Modal, Difficulty } from '../../enum'
import { getNewPlayer } from '../Util';
const { ipcRenderer, remote } = require('electron');

export const onQuit = () => {
    ipcRenderer.send('close')
    dispatch({
        type: UIReducerActions.QUIT
    })
}

export const onReset = () => {
    remote.getCurrentWindow().reload()
}

export const onShowModal = (modal:Modal) => {
    dispatch({
        type: UIReducerActions.SHOW_MODAL,
        modal
    })
}

export const onUpdateNPCs = (npcs:Array<PlayerState>) => {
    dispatch({
        type: UIReducerActions.UPDATE_NPCS,
        npcs
    })
}

export const onPlacedTile = () => {
    dispatch({
        type: UIReducerActions.PLACED_TILE
    })
}

export const onUpdateResources = (resources: any) => {
    dispatch({
        type: UIReducerActions.UPDATE_RESOURCE,
        resources
    })
}

export const onUpdateFoodGain = (food:number) => {
    dispatch({
        type: UIReducerActions.UPDATE_FOOD_GAIN,
        food
    })
}

export const onTick = () => {
    dispatch({
        type: UIReducerActions.TICK
    })
}

export const onUpdateHammerGain = (hammers:number) => {
    dispatch({
        type: UIReducerActions.UPDATE_HAMMER_GAIN,
        hammers
    })
}

export const onLose = () => {
    dispatch({
        type: UIReducerActions.LOSE
    })
}

export const onWin = () => {
    dispatch({
        type: UIReducerActions.WIN
    })
}

export const onHideModal = () => {
    dispatch({
        type: UIReducerActions.HIDE_MODAL,
    })
}

export const onToggleCreativeMode = () => {
    dispatch({
        type: UIReducerActions.TOGGLE_CREATE,
    })
}

export const onInitSession = (difficulty:Difficulty) => {
    dispatch({ type: UIReducerActions.NEW_SESSION, human: getNewPlayer(false), cpu: getNewPlayer(true) })
}