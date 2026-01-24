import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom"
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";
import { addToCart, getCart } from "../../utils/cart";


export default function ProductOverview(){
    const params=useParams();
    const productId=params.id;
    const [state,setStatus]=useState("loading")//loading,success,error
    const [product,setProduct]=useState(null)
    const navigate =useNavigate()

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
       <>
       {
        state=="success" && (
        <div className="w-full h-full flex
        ">
           <div className="w-[50%] h-full flex justify-center items-center">
            <ImageSlider images={product.images}/>
           </div>
           <div className="w-[50%] flex justify-center items-center h-full">
            <div className="w-[500px] h-[600px] flex flex-col items-center ">
            <h1 className="w-full text-cente text-4xl text-secondary font-semibold text-center">{product.name}
                {
                   product.altName.map((altName,index)=>{
                        return(
                           <span key={index} className="text-4xl text-gray-600">{"|"+ altName}</span>
                        )
                   })
                }
            </h1>
            <h1 className="w-full text-center my-2 text-md text-gray-600 font-semibold">{product.productId}</h1>
            <p className="w-full text-center my-2 text-md text-gray-600 font-semibold">{product.description}</p>
            {
                product.lablePrice>product.price ?
                    <div>
                        <span className="text-4xl mx-4 text-gray-500 line-through">{product.lablePrice.toFixed(2)}</span>
                         <span className="text-4xl mx-4 font-bold text-accent">{product.price.toFixed(2)}</span>
                    </div>
                    :<span className="text-4xl mx-4 font-bold text-accent">{product.price.toFixed(2)}</span>
                    
            }
             <div className="w-full flex justify-center items-center mt-4 ">
                <button className="w-[200px] h-[50px] mx-4 cursor-pointer bg-accent text-white rounded-2xl hover:bg-accent/80 transition-all duration-300" 
                onClick={()=>{
                    console.log("old cart")
                    console.log(getCart())
                    addToCart(product,1)
                    console.log("new cart")
                    console.log(getCart())
                }}
                >Add to cart</button>
                <button className="w-[200px] h-[50px] mx-4 cursor-pointer bg-accent text-white rounded-2xl hover:bg-accent/80 transition-all duration-300"
                 onClick={()=>{
                    navigate("/checkout",{
                        state:{
                            cart:[
                                {
                                    productId:product.productId,
                                    name:product.name,
                                    image:product.images[0],
                                    price:product.price,
                                    labelledPrice:product.lablePrice,
                                    qty:1
                                }
                            ]
                        }
                    })
                 }}
                >buy now</button>
             </div>
            
            </div>
           </div>
        </div>
        )}
        {
            state=="loading" && <Loading/>

        }
        </>
    )
}

//FBFBFB background color
//393E46 letters 
//C5BAFF accent