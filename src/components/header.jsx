
import { Link, useNavigate } from "react-router-dom"
import UserData from "./userData"
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

export default function Header(){
    const [sideDroweropened,setSideDrowerOpened]=useState(false)
    const navigate=useNavigate();
    console.log("header component loading.....")

    return (
        <header  className="w-full h-[80px] shadow-2xl flex justify-center relative">
            <GiHamburgerMenu className="h-full mx-2 text-3xl md:hidden absolute left-2"
            onClick={()=>{
                setSideDrowerOpened(true)
            }}
            />
            <img onClick={()=>{
                navigate("/")
            }} src="/logo.jpg" alt="logo" className="w-[80px] h-[80px] object-cover  top-0 left-0 cursor-pointer"/>
            <div className="w-[calc(100%-160px)] h-full hidden md:flex justify-center items-center">
                <Link to="/" className="text-[20px] font-bold mx-2">Home</Link>
           <Link to="/products" className="text-[20px] font-bold mx-2">Products</Link>
          <Link to="/about" className="text-[20px] font-bold mx-2">About</Link>
          <Link to="/contact" className="text-[20px] font-bold mx-2">Contact</Link>
            </div>
            <div className="w-[80px] hidden md:flex flex justify-center items-center">
                <Link to="/cart" className="text-[20px] font-bold mx-2">
                <BsCart3/>
                </Link>

            </div>
            {
                sideDroweropened&&
                <div className="fixed w-full h-screen bg-[#00000060] flex  md:hidden">
                    <div className="w-[350px] bg-white h-full ">
                        <div className="w-full h-[80px] shadow-2xl flex justify-center items-center relative">
                            <GiHamburgerMenu className="h-full text-3xl absolute left-2 cursor-pointer "
                            onClick={()=>{
                                setSideDrowerOpened(false)
                            }}
                            />
                             <img onClick={()=>{
                              window.location.href="/"
                             }} src="/logo.jpg" alt="logo" className="w-[80px] h-[80px] object-cover  top-0 left-0 cursor-pointer"/>
           
                        </div>
                        <div className="w-full h-[calc(100%-80px)] flex flex-col items-center gap-2">
                            <a href="/" className="text-[20px] font-bold mx-2 my-4">Home</a>
                            <a href="/products" className="text-[20px] font-bold mx-2 my-4">Products</a>
                            <a href="/about" className="text-[20px] font-bold mx-2 my-4">About</a>
                            <a href="/contact" className="text-[20px] font-bold mx-2 my-4">Contact</a>
                             <a href="/cart" className="text-[20px] font-bold mx-2 my-4"><BsCart3/></a>
                        </div>
                    </div>
                </div>
            }
           
        </header>
    )
}