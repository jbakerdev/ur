import * as v4 from 'uuid'
import { Difficulty } from '../enum';
import { Sprites } from '../assets/Assets';

export const getNewPlayer = (isAI:boolean) => {
    return {
        id:v4(),
        pieces: new Array(7).fill({
            id:v4(),
            step:0,
            color:isAI ? 'black':'white'
        }),
        isAI,
        isActive: false,
        path: isAI ? AIPATH : HUMANPATH
    } as PlayerState
}

const AIPATH = [
    { tileX: 3, tileY: 0},
    { tileX: 2, tileY: 0},
    { tileX: 1, tileY: 0},
    { tileX: 0, tileY: 0},
    { tileX: 0, tileY: 1},
    { tileX: 1, tileY: 1},
    { tileX: 2, tileY: 1},
    { tileX: 3, tileY: 1},
    { tileX: 4, tileY: 1},
    { tileX: 5, tileY: 1},
    { tileX: 6, tileY: 1},
    { tileX: 7, tileY: 1},
    { tileX: 7, tileY: 0},
    { tileX: 6, tileY: 0}
]

const HUMANPATH = [
    { tileX: 3, tileY: 2},
    { tileX: 2, tileY: 2},
    { tileX: 1, tileY: 2},
    { tileX: 0, tileY: 2},
    { tileX: 0, tileY: 1},
    { tileX: 0, tileY: 1},
    { tileX: 1, tileY: 1},
    { tileX: 2, tileY: 1},
    { tileX: 3, tileY: 1},
    { tileX: 4, tileY: 1},
    { tileX: 5, tileY: 1},
    { tileX: 6, tileY: 1},
    { tileX: 7, tileY: 1},
    { tileX: 7, tileY: 2},
    { tileX: 6, tileY: 2},
]