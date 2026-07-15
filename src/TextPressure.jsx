import { useEffect, useRef, useState, useCallback } from 'react'
import './TextPressure.css'

const TextPressure=({text='',className='',minFontSize=34,textColor='#d8d4c8'})=>{
  const box=useRef(null),letters=useRef([]),cursor=useRef({x:-1000,y:-1000}),smooth=useRef({x:-1000,y:-1000})
  const [size,setSize]=useState(minFontSize)
  const measure=useCallback(()=>{
    if(!box.current)return
    setSize(Math.max(minFontSize,Math.min(96,box.current.clientWidth/(Math.max(text.length,2)*.94))))
  },[text,minFontSize])
  useEffect(()=>{measure();const ro=new ResizeObserver(measure);ro.observe(box.current);return()=>ro.disconnect()},[measure])
  useEffect(()=>{
    const move=e=>{cursor.current={x:e.clientX,y:e.clientY}}
    addEventListener('pointermove',move)
    let raf
    const tick=()=>{
      smooth.current.x+=(cursor.current.x-smooth.current.x)*.12
      smooth.current.y+=(cursor.current.y-smooth.current.y)*.12
      const r=box.current?.getBoundingClientRect(),max=Math.min(360,(r?.width||600)*.34)
      letters.current.forEach(el=>{
        if(!el)return
        const q=el.getBoundingClientRect(),d=Math.hypot(smooth.current.x-q.x-q.width/2,smooth.current.y-q.y-q.height/2),p=Math.max(0,1-d/max)
        el.style.transform=`scaleX(${1+p*.1}) scaleY(${1+p*.035}) translateY(${-p*1.5}px)`
        el.style.fontWeight=String(400+Math.round(p*220))
        el.style.letterSpacing=`${-.035-p*.012}em`
        el.style.color=p>.04?'#ded9cc':''
      })
      raf=requestAnimationFrame(tick)
    }
    raf=requestAnimationFrame(tick)
    return()=>{removeEventListener('pointermove',move);cancelAnimationFrame(raf)}
  },[])
  return <div ref={box} className={`text-pressure ${className}`}><div style={{fontSize:size,color:textColor}}>{[...text].map((c,i)=><span key={i} ref={el=>letters.current[i]=el}>{c===' '? '\u00a0':c}</span>)}</div></div>
}
export default TextPressure
