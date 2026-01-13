import { useEffect, useState } from "react"
import { sampleProduct } from "../../assets/sampleData"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { FaEdit, FaTrash } from "react-icons/fa"
import toast from "react-hot-toast"


export default function AdminProductsPage(){
    const [products,setProducts]=useState(sampleProduct);
    const [isLoading,setIsloading]=useState(true)
    const navigate=useNavigate();
    useEffect(()=>{
            if(isLoading==true){
          axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then((res)=>{
        console.log(res.data)
        setProducts(res.data)
        setIsloading(false)
            })
        }   
    },[isLoading])

    function deleteProduct(productId){
        const token=localStorage.getItem("token");
        if(token==null){
            toast.error("Please login first")
            return
        }
        axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/product/"+productId,{
            headers:{
                "Authorization" : "Bearer "+token
            }
        }).then(()=>{
            toast.success("product deleted successfully")
            setIsloading(true)
        }).catch((e)=>{
            toast.error(e.response.data.message)
        })
    }

  
    return(
    <div className="w-full h-full max-h-full overflow-y-scroll relative">
        <Link to ="/admin/add-product"className="absolute w-[50px] h-[50px] text-xl bottom-5 right-5 bg-green-500 text-white font-bold cursor-pointer flex justify-center items-center rounded">+</Link>
       {isLoading ?<div className="w-full h-full flex justify-center items-center">
            <div className="w-[50px] h-[50px] border-[5px] border-gray-300 border-t-blue-900  rounded-full animate-spin"></div>
       </div>:
       <table className="w-full text-center">
        <thead>
            <tr>
                <th>Product </th>
                <th>Product Name</th>
                <th>Product Image</th>
                <th>Labelled Price</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
           {
            products.map(
                (item,index)=>{
                   return(
                    <tr key={index}>
                        <td>{item.productId}</td>
                        <td>{item.name}</td>
                        <td><img src={item.images[0]} className="w-[50px] h-[50px]" /></td>
                        <td>{item.lablePrice}</td>
                        <td>{item.price}</td>
                        <td>{item.stock}</td>
                        <td>
                            <div className="flex justify-center items-center w-full">
                            <FaTrash  onClick={()=>{
                                deleteProduct(item.productId)
                            }}className="text-[20px] text-red-500 mx-[5px] cursor-pointer"/>
                            <FaEdit onClick={()=>{
                                navigate("/admin/edit-product",{
                                    state:item
                                })
                            }}className="text-[20px] text-blue-500 mx-[5px] cursor-pointer"/>
                           
                            </div>
                      </td>
                    </tr>

                   )
                }
            )
           }
        </tbody>
       </table>
       
    }
       
    </div>
    )
}
