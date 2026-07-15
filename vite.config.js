import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

const VIRTUAL_ID='virtual:works-manifest',RESOLVED='\0'+VIRTUAL_ID
function worksManifest(){
  const dir=path.resolve(process.cwd(),'src/assets/works'),image=/\.(png|jpe?g|webp|gif|avif)$/i
  return {name:'works-manifest',resolveId(id){if(id===VIRTUAL_ID)return RESOLVED},load(id){if(id!==RESOLVED)return;const files=fs.existsSync(dir)?fs.readdirSync(dir).filter(f=>image.test(f)).map(name=>({name,mtime:fs.statSync(path.join(dir,name)).mtimeMs})).sort((a,b)=>b.mtime-a.mtime):[];const imports=files.map((f,i)=>`import img${i} from ${JSON.stringify(`/src/assets/works/${f.name}?url`)}`).join('\n');return `${imports}\nexport default [${files.map((f,i)=>`{id:${JSON.stringify(f.name)},name:${JSON.stringify(path.parse(f.name).name)},image:img${i},mtime:${f.mtime}}`).join(',')}]`},configureServer(server){server.watcher.add(dir);const reload=file=>{if(path.dirname(file)===dir&&image.test(file)){const mod=server.moduleGraph.getModuleById(RESOLVED);if(mod)server.moduleGraph.invalidateModule(mod);server.ws.send({type:'full-reload'})}};server.watcher.on('add',reload).on('unlink',reload).on('change',reload)}}
}
export default defineConfig({plugins:[react(),worksManifest()]})
