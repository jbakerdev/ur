export const colors = {
    white: '#f3f3f3',
    grey1: 'silver',
    grey2: '#ababab',
    grey3:'#333333',
    black:'#252525',
    lGreen: '#87e483',
    dGreen: '#006500',
    dBrown: '#967252',
    lBrown: '#c7936d',
    lBlue: '#94caff',
    dBlue: '#0000ca',
    purple: '#360097',
    pink: '#ff0097',
    red: '#dc0000',
    orange: '#ff6500',
    ddBrown: '#392414',
    background: 'black',
}

export default {
    window: {
        background:colors.background,
        border: '1px solid'
    },
    windowBorder: {
        padding:'16px', background:colors.grey1, margin:'16px'
    },
    contentAreaAlternate: {
        padding:'0.5em', background: colors.grey2, border:'5px outset', borderColor:colors.grey1, borderBottomLeftRadius:'20px', borderTopRightRadius:'20px', marginBottom:'0.5em', marginTop:'0.5em'
    },
    buttonOuter: {
        cursor:'pointer',
        textAlign:'center' as 'center',
        border: '3px solid',
        background: 'white',
        padding:'2px',
        color:colors.grey3
    },
    buttonInner: {
        border:'1px solid', padding:'5px',
        background:'black',
        cursor:'pointer'
    },
    topBar: {
        background: colors.grey2,
        border: '3px solid rgb(206, 173, 115)',
        textAlign:'center' as 'center',
        margin:'5px', padding:'5px'
    },
    notification: {padding:'1em', border:'1px solid', borderRadius:'5px', background:'#f3f3f3', zIndex:4},
    notificationIcon: {
        backgroundImage: 'url('+require('./assets/bubble.png')+')', width:'34px', height:'34px',
        backgroundSize:'cover',
        transition: 'opacity 500ms',
        cursor:'pointer',
        margin:'1em'
    },
    zoomIcon: {
        backgroundImage: 'url('+require('./assets/icon/zoom.png')+')', width:'30px', height:'30px',
        backgroundSize:'cover',
        cursor:'pointer',
        margin:'1em',
        position:'absolute' as 'absolute',
        left:0, bottom:'80px',
    },
    hr: {
        margin:0,
        marginBottom:'1px'
    },
    modal: {
        background:colors.background,
        position:'absolute' as 'absolute',
        maxWidth: '80%',
        maxHeight: '80%',
        margin: 'auto',
        display:'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'flex-start',
        zIndex:2,
        border:'5px solid',
        padding:'10px',
        top:0,left:0,bottom:0,right:0
    },
    bottomBarContent: {
        background:' rgb(90, 90, 90)',
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'flex-start',
        height: '100%',
        width:'75%'
    },
    bottomBarContentInner: {overflow:'hidden', padding:'0.5em', margin:'0.5em', background:'rgba(33, 3, 3, 0.3)', height:'100%', display:'flex', alignItems:'center', justifyContent:'space-around'},
    notifications: {
        position:'absolute' as 'absolute',
        left:0, bottom:0,
        maxWidth: '80vw',
        height: '5em',
        display:'flex',
        zIndex:2
    },
    close: {
        position:'absolute' as 'absolute', right:20, top:10, cursor:'pointer', fontSize:'18px'
    },
    bounce: {
        width:'2em',
        height:'1em',
        animation: 'shake 5s',
        animationIterationCount: 'infinite'
    }
}