import { Link, Route, Routes } from "react-router-dom";

export  default function AdminPage(){
    return(
        <div className="w-full h-screen bg-red-900 flex" >
            <div className="h-full w-[300px] bg-blue-900">
                <Link to="/admin/products" >Products</Link>
                <Link to="/admin/users" >Users</Link>
                <Link to="/admin/orders" >Orders</Link>
                <Link to="/admin/reviews" >Reviews</Link>
                
            </div>
            <div className="h-full w-[calc(100%-300px)] bg-amber-400">
                <Routes path="/*">
                    <Route path="/" element={<h1>admin</h1>}/>
                    <Route path="/products" element={<h1>products</h1>}/>
                    <Route path="/users" element={<h1>users</h1>}/>
                    <Route path="/orders" element={<h1>orders</h1>}/>
                    <Route path="/reviews" element={<h1>Reviews</h1>}/>   
                    
                </Routes>
            </div>
        </div>
    )
}