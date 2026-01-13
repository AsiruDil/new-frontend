import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";

export default function AddProductPage(){
    const [product,setProducts]=useState([])
    const [isLoading,setIsloading]=useState(true)
    
    useEffect(
        ()=>{
            if(isLoading){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                    (res)=>{
                        setProducts(res.data)
                        setIsloading(false)
                    }
                )
            }
        },[isLoading]
    )

    return (
        <div className="w-full h-full flex flex-wrap justify-center items-center">
            {
                product.map((product)=>(
                    <ProductCard key={product.productId} product={product}/>
                ))
            }
        </div>
    )
}