import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"


export default function ProductOverview(){
    const params=useParams();
    const productId=params.id;
    const [state,setStatus]=useState("loading")//loading,sucess,error
    const [product,setProduct]=useState(null)

    useEffect(
        ()=>{
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/"+productId).then(
            (response)=>{
                console.log(response.data)
                setProduct(response.data)
                setStatus("success")
            }
        ).catch(
            (error)=>{
                console.log(error)
                setStatus("error")
                toast.error("error feching product details")
            }
        )
    }
    ,[])
    return(
        <div className="bg-primary">
            this is Product Overview{JSON.stringify(product)}
        </div>
    )
}

//FBFBFB background color
//393E46 letters 
//C5BAFF accent