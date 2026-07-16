import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

const VIRTUAL_ID='virtual:works-manifest',RESOLVED='\0'+VIRTUAL_ID
const projectCopyFile=path.resolve(process.cwd(),'src/assets/project-copy.json')
const hiddenPlaceholdersFile=path.resolve(process.cwd(),'src/assets/hidden-placeholders.json')
function projectCopyEditor(){
  return {name:'project-copy-editor',handleHotUpdate(context){
    const file=path.resolve(context.file)
    if(file===projectCopyFile||file===hiddenPlaceholdersFile)return []
  },configureServer(server){
    server.middlewares.use('/__game-cover',(req,res)=>{
      if(req.method!=='POST'){res.statusCode=405;res.end('Method Not Allowed');return}
      let body='';req.on('data',chunk=>{body+=chunk;if(body.length>16*1024*1024)req.destroy()});req.on('end',()=>{
        try{
          const {key,dataUrl}=JSON.parse(body),match=/^data:image\/(png|jpeg|webp);base64,(.+)$/i.exec(dataUrl||'')
          if(typeof key!=='string'||!match)throw new Error('Invalid cover image')
          const safe=key.replace(/[^a-zA-Z0-9_-]/g,'-').slice(0,80),ext=match[1].toLowerCase()==='jpeg'?'jpg':match[1].toLowerCase()
          const coverDir=path.resolve(process.cwd(),'public/game-covers');fs.mkdirSync(coverDir,{recursive:true})
          fs.readdirSync(coverDir).filter(name=>name.startsWith(`${safe}.`)).forEach(name=>fs.unlinkSync(path.join(coverDir,name)))
          const name=`${safe}.${ext}`;fs.writeFileSync(path.join(coverDir,name),Buffer.from(match[2],'base64'))
          res.setHeader('Content-Type','application/json; charset=utf-8');res.end(JSON.stringify({ok:true,url:`/game-covers/${name}`}))
        }catch(error){res.statusCode=400;res.end(JSON.stringify({ok:false,error:error.message}))}
      })
    })
    server.middlewares.use('/__project-copy',async(req,res)=>{
      if(req.method!=='POST'){res.statusCode=405;res.end('Method Not Allowed');return}
      let body='';req.on('data',chunk=>body+=chunk);req.on('end',()=>{
        try{
          const {key,value}=JSON.parse(body);if(!key||!value)throw new Error('Invalid project copy')
          const current=fs.existsSync(projectCopyFile)?JSON.parse(fs.readFileSync(projectCopyFile,'utf8')):{}
          current[key]=value
          fs.writeFileSync(projectCopyFile,JSON.stringify(current,null,2)+'\n','utf8')
          res.setHeader('Content-Type','application/json');res.end('{"ok":true}')
        }catch(error){res.statusCode=400;res.end(JSON.stringify({ok:false,error:error.message}))}
      })
    })
  }}
}
function worksManifest(){
  const dir=path.resolve(process.cwd(),'src/assets/works'),posterDir=path.join(dir,'.posters'),optimizedDir=path.join(dir,'.optimized'),supported=/\.(png|jpe?g|webp|gif|avif|mp4|glb|gltf|fbx|obj)$/i,model=/\.(glb|gltf|fbx|obj)$/i,video=/\.mp4$/i,animated=/\.gif$/i,staticImage=/\.(png|jpe?g)$/i
  const getType=name=>model.test(name)?'model':video.test(name)?'video':animated.test(name)?'gif':'image'
  return {name:'works-manifest',resolveId(id){if(id===VIRTUAL_ID)return RESOLVED},load(id){if(id!==RESOLVED)return;const files=fs.existsSync(dir)?fs.readdirSync(dir).filter(f=>supported.test(f)).map(name=>{const base=path.parse(name).name,poster=animated.test(name)&&fs.existsSync(path.join(posterDir,`${base}.webp`))?`.posters/${base}.webp`:null,optimized=staticImage.test(name)&&fs.existsSync(path.join(optimizedDir,`${base}.webp`))?`.optimized/${base}.webp`:null;return{name,mtime:fs.statSync(path.join(dir,name)).mtimeMs,type:getType(name),poster,optimized}}).sort((a,b)=>b.mtime-a.mtime):[];const imports=files.map((f,i)=>{const lines=[`import asset${i} from ${JSON.stringify(`/src/assets/works/${f.name}?url`)}`];if(f.poster)lines.push(`import poster${i} from ${JSON.stringify(`/src/assets/works/${f.poster}?url`)}`);if(f.optimized)lines.push(`import optimized${i} from ${JSON.stringify(`/src/assets/works/${f.optimized}?url`)}`);return lines.join('\n')}).join('\n');return `${imports}\nexport default [${files.map((f,i)=>`{id:${JSON.stringify(f.name)},name:${JSON.stringify(path.parse(f.name).name)},image:${f.optimized?`optimized${i}`:`asset${i}`},source:asset${i},poster:${f.poster?`poster${i}`:'null'},type:${JSON.stringify(f.type)},mtime:${f.mtime}}`).join(',')}]`},configureServer(server){
    server.middlewares.use('/__works-delete',(req,res)=>{
      if(req.method!=='POST'){res.statusCode=405;res.end('Method Not Allowed');return}
      let body=''
      req.on('data',chunk=>{body+=chunk;if(body.length>4096)req.destroy()})
      req.on('end',async()=>{
        try{
          const {id}=JSON.parse(body)
          if(/^placeholder-\d{2}$/.test(id)){
            const hidden=fs.existsSync(hiddenPlaceholdersFile)?JSON.parse(fs.readFileSync(hiddenPlaceholdersFile,'utf8')):[]
            if(!hidden.includes(id))hidden.push(id)
            fs.writeFileSync(hiddenPlaceholdersFile,JSON.stringify(hidden,null,2)+'\n','utf8')
            if(fs.existsSync(projectCopyFile)){
              const copy=JSON.parse(fs.readFileSync(projectCopyFile,'utf8'))
              if(Object.prototype.hasOwnProperty.call(copy,id)){delete copy[id];fs.writeFileSync(projectCopyFile,JSON.stringify(copy,null,2)+'\n','utf8')}
            }
            res.setHeader('Content-Type','application/json; charset=utf-8')
            res.end(JSON.stringify({ok:true,id,hidden:true}))
            return
          }
          if(typeof id!=='string'||id!==path.basename(id)||!supported.test(id))throw new Error('Invalid work id')
          const source=path.join(dir,id)
          if(!fs.existsSync(source)||!fs.statSync(source).isFile())throw new Error('Work file not found')
          const base=path.parse(id).name
          const related=[source,path.join(posterDir,`${base}.webp`),path.join(optimizedDir,`${base}.webp`)]
          await server.watcher.unwatch(related)
          related.forEach(file=>{if(fs.existsSync(file)&&fs.statSync(file).isFile())fs.unlinkSync(file)})
          if(fs.existsSync(projectCopyFile)){
            const copy=JSON.parse(fs.readFileSync(projectCopyFile,'utf8'))
            if(Object.prototype.hasOwnProperty.call(copy,id)){
              delete copy[id]
              fs.writeFileSync(projectCopyFile,JSON.stringify(copy,null,2)+'\n','utf8')
            }
          }
          res.setHeader('Content-Type','application/json; charset=utf-8')
          res.end(JSON.stringify({ok:true,id,deleted:related.filter(file=>!fs.existsSync(file)).length}))
          setTimeout(()=>server.watcher.add([dir,posterDir,optimizedDir]),300)
        }catch(error){res.statusCode=400;res.setHeader('Content-Type','application/json; charset=utf-8');res.end(JSON.stringify({ok:false,error:error.message}))}
      })
    })
    server.watcher.add([dir,posterDir,optimizedDir]);const reload=file=>{if(file.startsWith(dir)&&supported.test(file)){const mod=server.moduleGraph.getModuleById(RESOLVED);if(mod)server.moduleGraph.invalidateModule(mod);server.ws.send({type:'full-reload'})}};server.watcher.on('add',reload).on('change',reload)}}
}
export default defineConfig({plugins:[react(),worksManifest(),projectCopyEditor()]})
