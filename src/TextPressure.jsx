import { useEffect, useRef, useState, useCallback } from 'react'
import './TextPressure.css'

const TextPressure=({text='',className='',minFontSize=34,textColor='#d8d4c8'})=>{
  const box=useRef(null),letters=useRef([]),cursor=useRef({x:-1000,y:-1000}),smooth=useRef({x:-1000,y:-1000})
  const [size,setSize]=useState(minFontSize)
  const measure=useCallback(()=>{if(box.current)setSize(Math.max(minFontSize,Math.min(96,box.current.clientWidth/(Math.max(text.length,2)*.94))))},[text,minFontSize])
  useEffect(()=>{measure();const ro=new ResizeObserver(measure);ro.observe(box.current);return()=>ro.disconnect()},[measure])
  useEffect(()=>{
    const node=box.current,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches
    if(!node||reduced)return
    let raf=0,active=false
    const move=e=>{cursor.current={x:e.clientX,y:e.clientY}}
    const tick=()=>{
      if(!active){raf=0;return}
      smooth.current.x+=(cursor.current.x-smooth.current.x)*.12
      smooth.current.y+=(cursor.current.y-smooth.current.y)*.12
      const r=node.getBoundingClientRect(),max=Math.min(360,(r.width||600)*.34)
      letters.current.forEach(el=>{
        if(!el)return
        const q=el.getBoundingClientRect(),d=Math.hypot(smooth.current.x-q.x-q.width/2,smooth.current.y-q.y-q.height/2),p=Math.max(0,1-d/max)
        el.style.transform=`scaleX(${1+p*.1}) scaleY(${1+p*.035}) translateY(${-p*1.5}px)`
        el.style.fontWeight=String(400+Math.round(p*220));el.style.letterSpacing=`${-.035-p*.012}em`;el.style.color=p>.04?'#ded9cc':''
      })
      raf=requestAnimationFrame(tick)
    }
    const observer=new IntersectionObserver(([entry])=>{active=entry.isIntersecting&&!document.hidden;if(active&&!raf)raf=requestAnimationFrame(tick);if(!active&&raf){cancelAnimationFrame(raf);raf=0}},{rootMargin:'100px'})
    const visibility=()=>{active=!document.hidden&&node.getBoundingClientRect().top<innerHeight+100&&node.getBoundingClientRect().bottom>-100;if(active&&!raf)raf=requestAnimationFrame(tick)}
    observer.observe(node);addEventListener('pointermove',move,{passive:true});document.addEventListener('visibilitychange',visibility)
    return()=>{observer.disconnect();removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',visibility);cancelAnimationFrame(raf)}
  },[])
  return <div ref={box} className={`text-pressure ${className}`}><div style={{fontSize:size,color:textColor}}>{[...text].map((c,i)=><span key={i} ref={el=>letters.current[i]=el}>{c===' '? '\u00a0':c}</span>)}</div></div>
}
export default TextPressure
