export enum UIReducerActions { 
    HIDE_MODAL='hmdl',
    SHOW_MODAL='smdl',
    QUIT='qg',
    NEW_SESSION='ngms',
    TICK='t',
    UPDATE_NPCS='uplay',
    LOSE= 'loose',
    WIN='win',
    PLACED_TILE='ptil',
    UPDATE_RESOURCE='urss',
    UPDATE_HAMMER_GAIN='uhgs',
    UPDATE_FOOD_GAIN='ufgz',
    TOGGLE_CREATE='tglcr',
    RESET='reset'
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