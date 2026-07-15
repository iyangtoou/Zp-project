import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react'
import './LogoLoop.css'

const CONFIG={SMOOTH_TAU:.25,MIN_COPIES:2,COPY_HEADROOM:2}
const cssLength=v=>typeof v==='number'?`${v}px`:(v??undefined)

const useResizeObserver=(callback,elements,deps)=>useEffect(()=>{if(!window.ResizeObserver){addEventListener('resize',callback);callback();return()=>removeEventListener('resize',callback)}const observers=elements.map(ref=>{if(!ref.current)return null;const observer=new ResizeObserver(callback);observer.observe(ref.current);return observer});callback();return()=>observers.forEach(o=>o?.disconnect())},[callback,elements,deps])

const useAnimationLoop=(trackRef,targetVelocity,seqWidth,isHovered,hoverSpeed,enabled)=>{const raf=useRef(null),last=useRef(null),offset=useRef(0),velocity=useRef(0);useEffect(()=>{const track=trackRef.current;if(!track||!enabled)return;if(seqWidth>0){offset.current=((offset.current%seqWidth)+seqWidth)%seqWidth;track.style.transform=`translate3d(${-offset.current}px,0,0)`}const animate=timestamp=>{if(last.current===null)last.current=timestamp;const dt=Math.min(.05,Math.max(0,timestamp-last.current)/1000);last.current=timestamp;const target=isHovered&&hoverSpeed!==undefined?hoverSpeed:targetVelocity;velocity.current+=(target-velocity.current)*(1-Math.exp(-dt/CONFIG.SMOOTH_TAU));if(seqWidth>0){offset.current=((offset.current+velocity.current*dt)%seqWidth+seqWidth)%seqWidth;track.style.transform=`translate3d(${-offset.current}px,0,0)`}raf.current=requestAnimationFrame(animate)};raf.current=requestAnimationFrame(animate);return()=>{if(raf.current!==null)cancelAnimationFrame(raf.current);last.current=null}},[targetVelocity,seqWidth,isHovered,hoverSpeed,trackRef,enabled])}

const LogoLoop=memo(({logos,speed=120,direction='left',width='100%',logoHeight=28,gap=32,hoverSpeed=0,fadeOut=false,fadeOutColor,scaleOnHover=false,renderItem,ariaLabel='能力标签',className='',style})=>{
  const containerRef=useRef(null),trackRef=useRef(null),seqRef=useRef(null);const[seqWidth,setSeqWidth]=useState(0),[copies,setCopies]=useState(CONFIG.MIN_COPIES),[hovered,setHovered]=useState(false),[visible,setVisible]=useState(false)
  const velocity=useMemo(()=>Math.abs(speed)*(direction==='left'?1:-1)*(speed<0?-1:1),[speed,direction])
  const update=useCallback(()=>{const cw=containerRef.current?.clientWidth??0,sw=seqRef.current?.getBoundingClientRect?.().width??0;if(sw>0){setSeqWidth(Math.ceil(sw));setCopies(Math.max(CONFIG.MIN_COPIES,Math.ceil(cw/sw)+CONFIG.COPY_HEADROOM))}},[])
  useResizeObserver(update,[containerRef,seqRef],[logos,gap,logoHeight]);useEffect(()=>{const imgs=seqRef.current?.querySelectorAll('img')??[];imgs.forEach(img=>{img.addEventListener('load',update,{once:true});img.addEventListener('error',update,{once:true})});return()=>imgs.forEach(img=>{img.removeEventListener('load',update);img.removeEventListener('error',update)})},[logos,update])
  useEffect(()=>{const node=containerRef.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting&&!document.hidden),{rootMargin:'120px'});observer.observe(node);const visibility=()=>setVisible(!document.hidden&&node.getBoundingClientRect().top<innerHeight+120&&node.getBoundingClientRect().bottom>-120);document.addEventListener('visibilitychange',visibility);return()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility)}},[])
  useAnimationLoop(trackRef,velocity,seqWidth,hovered,hoverSpeed,visible)
  const vars={'--logoloop-gap':`${gap}px`,'--logoloop-logoHeight':`${logoHeight}px`,...(fadeOutColor&&{'--logoloop-fadeColor':fadeOutColor})}
  const render=useCallback((item,key)=><li className="logoloop__item" key={key}>{renderItem?renderItem(item,key):item.node?<span className="logoloop__node">{item.node}</span>:<img src={item.src} alt={item.alt??''} loading="lazy" decoding="async" draggable={false}/>}</li>,[renderItem])
  return <div ref={containerRef} className={`logoloop ${fadeOut?'logoloop--fade':''} ${scaleOnHover?'logoloop--scale-hover':''} ${className}`} style={{width:cssLength(width)??'100%',...vars,...style}} role="region" aria-label={ariaLabel}><div className="logoloop__track" ref={trackRef} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>{Array.from({length:copies},(_,copy)=><ul className="logoloop__list" key={copy} aria-hidden={copy>0} ref={copy===0?seqRef:undefined}>{logos.map((item,i)=>render(item,`${copy}-${i}`))}</ul>)}</div></div>
})
LogoLoop.displayName='LogoLoop'
export default LogoLoop
