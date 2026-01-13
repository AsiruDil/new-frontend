import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useLocation, useNavigate } from "react-router-dom"
import mediaUpload from "../../utils/mediaUpload"
import axios from "axios"

export default function EditProductPage(){
    const location=useLocation()
   const [productId,setProductId]=useState(location.state.productId)
   const[name,setName]=useState(location.state.name)
   const[altNames,setAltnames]=useState(location.state.altName.join(","))
   const[description,setDescription]=useState(location.state.description)
   const[images,setImages]=useState([])
   const[labelledPrice,setLabelledPrice]=useState(location.state.lablePrice)
   const[price,setPrice]=useState(location.state.price)
   const[stock,setStock]=useState(location.state.stock)
   const navigate=useNavigate()



   async function UpdateProduct(params) {

    const token=localStorage.getItem("token")
    if(token == null){
        toast.error("please login first")
        return
    }
    
   let imageUrls =location.state.images;

   const promisesArray=[]
    for(let i=0;i<images.length;i++){
        promisesArray[i]=mediaUpload(images[i])
         
    }
    try{
        if(images.length > 0 ){
           imageUrls = await Promise.all(promisesArray);
        }
        
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

        axios.put(import.meta.env.VITE_BACKEND_URL+"/api/product/"+productId,product,{
            headers :{
                "Authorization":"Bearer "+token
            }
        }).then(()=>{
            toast.success("product update successFully")
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
            <h1>Edit Product</h1>
            <input type='text' disabled placeholder="Product Id" className="input input-bordered w-full max-w-xs" value={productId} onChange={(e)=>{setProductId(e.target.value)}}/>
            <input type='text' placeholder="Name" className="input input-bordered w-full max-w-xs" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <input type='text' placeholder="Alt Name" className="input input-bordered w-full max-w-xs" value={altNames} onChange={(e)=>{setAltnames(e.target.value)}}/>
            <input type='text' placeholder="Description" className="input input-bordered w-full max-w-xs" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
            <input type='file' multiple placeholder="Images" className="input input-bordered w-full max-w-xs"  onChange={(e)=>{setImages(e.target.files)}}/>
            <input type='text' placeholder="Labelled Price" className="input input-bordered w-full max-w-xs" value={labelledPrice} onChange={(e)=>{setLabelledPrice(e.target.value)}}/>
            <input type='text' placeholder="Price" className="input input-bordered w-full max-w-xs" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
            <input type='text' placeholder="Stock" className="input input-bordered w-full max-w-xs" value={stock} onChange={(e)=>{setStock(e.target.value)}}/>
            <div className="w-full flex justify-center flex-row items-center mt-4">
                <Link to="/admin/products" className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-4">Cancle</Link>
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded " onClick={UpdateProduct}>Update Product</button>
            </div>
        </div>
    )
}