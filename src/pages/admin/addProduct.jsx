import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import mediaUpload from "../../utils/mediaUpload"
import axios from "axios"

export default function AddProductPage(){
   const [productId,setProductId]=useState('')
   const[name,setName]=useState('')
   const[altNames,setAltnames]=useState('')
   const[description,setDescription]=useState('')
   const[images,setImages]=useState([])
   const[labelledPrice,setLabelledPrice]=useState(0)
   const[price,setPrice]=useState(0)
   const[stock,setStock]=useState(0)
   const navigate=useNavigate()

   async function AddProduct(params) {

    const token=localStorage.getItem("token")
    if(token == null){
        toast.error("please login first")
        return
    }
    
   
   if(images.length<=0){
    toast.error("please select at least one image")
    return
   }
   const promisesArray=[]
    for(let i=0;i<images.length;i++){
        promisesArray[i]=mediaUpload(images[i])
         
    }
    try{

        const imageUrls = await Promise.all(promisesArray)
        console.log(imageUrls)

        const altNamesArray=altNames.split(",")

        const product ={
            productId:productId,
            name:name,
            altName:altNamesArray,
            description:description,
            images:imageUrls,
            lablePrice:labelledPrice,
            price:price,
            stock:stock
        }

        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/product",product,{
            headers :{
                "Authorization":"Bearer "+token
            }
        }).then(()=>{
            toast.success("product added successFully")
            navigate('/admin/products')
        }).catch((e)=>{
            toast.error(e.response.data.message)
        })

    }catch(e){
        console.log(e)
    }
    
   }
    return (
        <div className="w-full  h-full flex flex-col justify-center items-center">
            <input type='text' placeholder="Product Id" className="input input-bordered w-full max-w-xs" value={productId} onChange={(e)=>{setProductId(e.target.value)}}/>
            <input type='text' placeholder="Name" className="input input-bordered w-full max-w-xs" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <input type='text' placeholder="Alt Name" className="input input-bordered w-full max-w-xs" value={altNames} onChange={(e)=>{setAltnames(e.target.value)}}/>
            <input type='text' placeholder="Description" className="input input-bordered w-full max-w-xs" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
            <input type='file' multiple placeholder="Images" className="input input-bordered w-full max-w-xs"  onChange={(e)=>{setImages(e.target.files)}}/>
            <input type='text' placeholder="Labelled Price" className="input input-bordered w-full max-w-xs" value={labelledPrice} onChange={(e)=>{setLabelledPrice(e.target.value)}}/>
            <input type='text' placeholder="Price" className="input input-bordered w-full max-w-xs" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
            <input type='text' placeholder="Stock" className="input input-bordered w-full max-w-xs" value={stock} onChange={(e)=>{setStock(e.target.value)}}/>
            <div className="w-full flex justify-center flex-row items-center mt-4">
                <Link to="/admin/products" className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-4">Cancle</Link>
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded " onClick={AddProduct}>Add Product</button>
            </div>
        </div>
    )
}