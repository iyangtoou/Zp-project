import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

const VIRTUAL_ID='virtual:works-manifest',RESOLVED='\0'+VIRTUAL_ID
const projectCopyFile=path.resolve(process.cwd(),'src/assets/project-copy.json')
function projectCopyEditor(){
  return {name:'project-copy-editor',handleHotUpdate(context){
    if(path.resolve(context.file)===projectCopyFile)return []
  },configureServer(server){
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
  const dir=path.resolve(process.cwd(),'src/assets/works'),supported=/\.(png|jpe?g|webp|gif|avif|mp4|glb|gltf|fbx|obj)$/i,model=/\.(glb|gltf|fbx|obj)$/i,video=/\.mp4$/i,animated=/\.gif$/i
  const getType=name=>model.test(name)?'model':video.test(name)?'video':animated.test(name)?'gif':'image'
  return {name:'works-manifest',resolveId(id){if(id===VIRTUAL_ID)return RESOLVED},load(id){if(id!==RESOLVED)return;const files=fs.existsSync(dir)?fs.readdirSync(dir).filter(f=>supported.test(f)).map(name=>({name,mtime:fs.statSync(path.join(dir,name)).mtimeMs,type:getType(name)})).sort((a,b)=>b.mtime-a.mtime):[];const imports=files.map((f,i)=>`import asset${i} from ${JSON.stringify(`/src/assets/works/${f.name}?url`)}`).join('\n');return `${imports}\nexport default [${files.map((f,i)=>`{id:${JSON.stringify(f.name)},name:${JSON.stringify(path.parse(f.name).name)},image:asset${i},type:${JSON.stringify(f.type)},mtime:${f.mtime}}`).join(',')}]`},configureServer(server){server.watcher.add(dir);const reload=file=>{if(path.dirname(file)===dir&&supported.test(file)){const mod=server.moduleGraph.getModuleById(RESOLVED);if(mod)server.moduleGraph.invalidateModule(mod);server.ws.send({type:'full-reload'})}};server.watcher.on('add',reload).on('unlink',reload).on('change',reload)}}
}
export default defineConfig({plugins:[react(),worksManifest(),projectCopyEditor()]})
