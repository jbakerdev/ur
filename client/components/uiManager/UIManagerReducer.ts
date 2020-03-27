import { UIReducerActions } from '../../enum'

const appReducer = (state = getInitialState(), action:any):RState => {
    switch (action.type) {
        case UIReducerActions.NEW_SESSION:
            return { ...state, engineEvent: null, human: action.human, cpu: action.cpu, currentRoll: Phaser.Math.Between(0,4) }
        case UIReducerActions.SHOW_MODAL: 
            return { ...state, modal: action.modal, engineEvent:null }
        case UIReducerActions.HIDE_MODAL: 
            return { ...state, modal: null, engineEvent:null }
        case UIReducerActions.RESET:
            return getInitialState()
        default:
            return state
    }
};

export default appReducer;

const getInitialState = ():RState => {
    return {
       modal: null,
       human: null,
       cpu: null,
       activePlayerId: '',
       currentRoll: 0,
       engineEvent: null,
       selectedPiece: null
    }
}