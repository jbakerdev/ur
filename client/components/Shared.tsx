import * as React from 'react'
import AppStyles, { colors } from '../AppStyles'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap_white.css'
import { Icons } from '../assets/Assets';

interface ButtonConfig {
    text:string
    handler: Function
    active:boolean
    icon?: string
    tooltip?: string
}

export const TopBar = (text:string|JSX.Element) => 
    <div style={AppStyles.topBar}>
        {text}
    </div>

export const Button = (enabled:boolean, handler:any, text:JSX.Element | string, toolTip?:string) => 
    <Tooltip placement="right" trigger={toolTip ? ['hover'] : []} overlay={<h6>{toolTip}</h6>}>
        <div onClick={handler} style={{...AppStyles.buttonInner, opacity: enabled ? 1 : 0.5, pointerEvents: enabled ? 'all' : 'none'}}>{text}</div>
    </Tooltip>

export const ButtonStrip = (configs:Array<ButtonConfig>) => 
    <div style={{display:'flex', border:'1px solid'}}>
        {configs.map(config=>
            <Tooltip placement="bottom" trigger={config.tooltip ? ['hover'] : []} overlay={<h6>{config.tooltip}</h6>}>
                <div style={{borderRight:'1px solid', cursor:'pointer', background: !config.active ? 'black' : '#6e8189', padding:'1px', paddingLeft:'5px', display:"flex", alignItems:'center'}} 
                    onClick={()=>config.handler()}>
                    {/* {config.icon ? <div style={{marginRight:'10px', height:'20px'}}>{Icon(config.icon, '')}</div> : ''} */}
                    {config.text}
                </div>
            </Tooltip>
        )}
    </div>

export const RangeSpinner = (value:number, onValueChange:Function, leftLabel:string, rightLabel:string, disabled:boolean, max:number, min:number, inc:number) =>
    <div style={{display:'flex', justifyContent:'space-between', opacity: disabled ? '0.5' : '1'}}>
        <h5 style={{width:rightLabel ? '25%' : '33%', textAlign:'left', marginRight:'5px'}}>{leftLabel}</h5>
        <div style={{width:rightLabel?'50%' : '66%', display:'flex'}}>
            <div onClick={()=>onValueChange(value-inc)} style={{pointerEvents:value >= min ? 'all' : 'none'}}>{'<'}</div>
            <div style={{border:'3px ridge', position:'relative', width:'100%'}}>
                <div style={{position:'absolute', top:0,left:0, width: ((value/max)*100)+'%', background:'white'}}/>
            </div>
            <div onClick={()=>onValueChange(value+inc)} style={{pointerEvents:value <= max ? 'all' : 'none'}}>{'>'}</div>
        </div>
        <h5 style={{width:rightLabel ? '25%' : 0, textAlign:'right', marginLeft:'5px'}}>{rightLabel}</h5>
    </div>

export const LightButton = (enabled:boolean, handler:any, text:string, tab?:boolean) => 
    <div onClick={handler} style={{...AppStyles.buttonInner, opacity: enabled ? 1 : 0.5, pointerEvents: enabled ? 'all' : 'none', 
        textAlign:'center', borderBottom: tab && !enabled ? '1px dashed':'1px solid', borderBottomLeftRadius: tab?0:'3px', borderBottomRightRadius:tab?0:'3px', marginBottom: tab ? '-1px' : 0}}>{text}</div>

// export const Warning = (handler:any, icon:string, color:string) => 
//     <div onClick={handler} style={{...AppStyles.buttonInner, ...AppStyles.bounce, backgroundColor:color, color:'red', position:'absolute', top:-35, right:10, border:'none' }}>{Icon(icon, '')}!</div>
    
export const RangeInput = (value:number, onValueChange:Function, leftLabel:JSX.Element | string, rightLabel?:JSX.Element | string, disabled?:boolean, max?:number, min?:number, inc?:number) => 
    <div style={{display:'flex', justifyContent:'space-between', opacity: disabled ? '0.5' : '1'}}>
        {leftLabel && <h5 style={{textAlign:'left', marginRight:'5px', width:'20%'}}>{leftLabel}</h5>}
        <input disabled={disabled} onChange={(e)=>onValueChange(e.currentTarget.value)} style={{width: typeof rightLabel !== 'undefined' ? '60%' : '80%'}} max={max || 100} min={min || 0} step={inc || 5} type='range' value={value}/>
        {typeof rightLabel !== 'undefined' && <h5 style={{textAlign:'right', marginLeft:'5px', width:'20%'}}>{rightLabel}</h5>}
    </div>

export const NumericInput = (value:number, onValueChange:Function, max?:number, min?:number) => 
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        {LightButton(min || min===0 ? value > min:true, ()=>onValueChange(value-1),'<')}
        <div style={{width:'2em', textAlign:"center"}}>{value}</div>
        {LightButton(max ? value < max:true, ()=>onValueChange(value+1),'>')}
    </div>

export const Select = (value:any, onValueChange:Function, values: Array<any>) => 
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        {LightButton(values.findIndex(v=>v===value) > 0, ()=>onValueChange(values[values.findIndex(v=>v===value)-1]),'<')}
        <div style={{textAlign:"center", backgroundColor:value}}>{value}</div>
        {LightButton(values.findIndex(v=>v===value) < values.length-1, ()=>onValueChange(values[values.findIndex(v=>v===value)+1]),'>')}
    </div>

export const ColorSelect = (value:string, onValueChange:Function, values: Array<string>) => 
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        {LightButton(values.findIndex(v=>v===value) > 0, ()=>onValueChange(values[values.findIndex(v=>v===value)-1]),'<')}
        <div style={{backgroundColor:value, width:'2em', height:'2em'}}/>
        {LightButton(values.findIndex(v=>v===value) < values.length-1, ()=>onValueChange(values[values.findIndex(v=>v===value)+1]),'>')}
    </div>

export const IconSelect = (value:string, onValueChange:Function, values: Array<string>) => 
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        {LightButton(values.findIndex(v=>v===value) > 0, ()=>onValueChange(values[values.findIndex(v=>v===value)-1]),'<')}
        {/* {Icon(value ? value : values[0], '')} */}
        {LightButton(values.findIndex(v=>v===value) < values.length-1, ()=>onValueChange(values[values.findIndex(v=>v===value)+1]),'>')}
    </div>

export const ProgressBar = (value:number, max:number, tooltip?:string) => 
    <Tooltip placement="bottom" trigger={tooltip ? ['hover'] : []} overlay={<h6>{tooltip}</h6>}>
        <div style={{width:'100%', height:'100%', background:'transparent'}}>
            <div style={{background:colors.lGreen, width:Math.round((value/max)*100)+'%', height:'100%'}}/>
        </div>
    </Tooltip>

// export const Scale = (percent:number, leftColor:string, rightColor:string, tooltipLeft:JSX.Element, tooltipRight:JSX.Element) => 
//     <div style={{width:'100%', height:'100%', display:'flex'}}>
//         <Tooltip placement="bottom" trigger={tooltipLeft ? ['hover'] : []} overlay={tooltipLeft}>
//             <div style={{background:leftColor, width:percent+'%', transition:'width 500ms', height:'100%', borderRight:'3px solid gray'}}>
//                 <div style={{backgroundImage:'url('+require('../assets/voter.png')+')', width:'25px', height:'25px', backgroundSize:'contain'}}/>
//             </div>
//         </Tooltip>
//         <Tooltip placement="bottom" trigger={tooltipRight ? ['hover'] : []} overlay={tooltipRight}>
//             <div style={{height:'100%', width:100-percent+'%', transition:'width 500ms', background:rightColor, position:"relative"}}>
//                 <div style={{backgroundImage:'url('+require('../assets/donor.png')+')', width:'25px', height:'25px', backgroundSize:'contain', position:"absolute", right:10}}/>
//             </div>
//         </Tooltip>
//     </div>
    
export const Icon = (iconName:string, tooltip:string, large?:boolean) => 
    <Tooltip placement="bottom" trigger={tooltip ? ['hover'] : []} overlay={<h6>{tooltip}</h6>}>
        <div style={{cursor:'pointer', width:large ? '32px' : '20px', height: large ? '32px' : '20px', backgroundImage:'url('+Icons[iconName]+')', backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:"center", display:'inline-block'}}/>
    </Tooltip>

    