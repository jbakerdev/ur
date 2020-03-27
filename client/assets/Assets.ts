
export const defaults = [
    { key: 'TILESET', resource: require('./tiles.png'), type: 'image' },
    { key: 'overlay', resource: require('./ui/cheetex_rock.png'), type: 'image' },
    { key: 'step', resource: require('./audio/step.mp3'), type: 'audio' },
    { key: 'intro', resource: require('./audio/intro.mp3'), type: 'audio' },
    { key: 'rock', resource: require('./audio/rock.mp3'), type: 'audio' },
    { key: 'error', resource: require('./audio/error.mp3'), type: 'audio' },
    { key: 'end', resource: require('./audio/end.mp3'), type: 'audio' },
    { key: 'destroyed', resource: require('./audio/destroyed.mp3'), type: 'audio' },
    { key: 'selected', resource: require('./selected.png'), type: 'image'},
    { key: 'map', resource: require('./board.json'), type: 'tilemapTiledJSON', data: {}},
    { key: 'sprites', resource: require('./tiles.png'), type: 'spritesheet', data: { frameWidth: 16, frameHeight: 16 }}
]

export const Sprites = {
    black: 10,
    white: 11
}