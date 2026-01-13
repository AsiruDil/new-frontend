import { createClient } from "@supabase/supabase-js"

const url="https://xhafhbkamswznkhywyph.supabase.co"
const key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoYWZoYmthbXN3em5raHl3eXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMzE2NjQsImV4cCI6MjA4MzgwNzY2NH0.OcnNM2Dzo_wVqMtErZ-W3FZ1W6LPaNLOVNpniQQkB0g"
const supabase=createClient(url,key)

export default function mediaUpload(file){
    const mediaUploadPromiss=new Promise(
        (resolve,reject)=>{
            if(file==null){
                reject("no file selected")
                return
            }
            const timestamp=new Date().getTime()
            const newName=timestamp+file.name

        supabase.storage.from("images").upload(newName,file,{
        upsert:false,
        cacheControl:"3600"
       }).then(()=>{
            const publicUrl=supabase.storage.from("images").getPublicUrl(newName).data.publicUrl
           resolve(publicUrl)
       }).catch((e)=>{
            reject("error occuerd in supabase site")
       })

        }
    )

    return mediaUploadPromiss

}
