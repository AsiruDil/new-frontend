import { createClient } from "@supabase/supabase-js"
import { useState } from "react"
import mediaUpload from "../utils/mediaUpload"

export default function TestPage(){
const [image,setImage]=useState(null)

    function fileUpload(){
        mediaUpload(image).then(
            (res)=>{
                console.log(res)
            }
    ).catch(
        (res)=>{
            console.log(res)
        }
    )

        
    }

    return(
        <div className="w-full h-screen flex flex-col justify-center items-center" >
           <input onChange={
            (e)=>{
                setImage(e.target.files[0])
            }
           } type="file" className="file-input file-input-bordered w-full max-w-xs"/>
           <button onClick={fileUpload} className="bg-green-500 text-white font-bold py-2 px-4 rounded">Upload</button>
        </div>
    )
}