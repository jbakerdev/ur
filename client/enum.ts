export enum UIReducerActions { 
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

export const StaticLayers = [
    'base', 'tiles'
]

export enum Difficulty {
    EASY='easy',
    MEDIUM='medium',
    HARD='hard'
}

export enum Modal {
    HELP='halp'
}