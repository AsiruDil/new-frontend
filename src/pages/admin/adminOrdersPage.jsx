import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "../../components/loading"
import toast from "react-hot-toast"
import Modal from "react-modal"

Modal.setAppElement("#root")

export default function AdminOrderPage() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeOrder, setActiveOrder] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("Please login first")
    
      return
    }

     axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setOrders(res.data)
        setIsLoading(false)
      })
      .catch((e) => {
        toast.error(e?.response?.data?.message || "Failed to fetch orders")
        setIsLoading(false)
      })
  }, [])

  // Optional: keep for table display
  // function getStatusStyle(status) {
  //   switch (status?.toUpperCase()) {
  //     case "PAID":
  //       return "bg-green-100 text-green-700"
  //     case "PENDING":
  //       return "bg-yellow-100 text-yellow-700"
  //     case "CANCELLED":
  //       return "bg-red-100 text-red-700"
  //     default:
  //       return "bg-gray-100 text-gray-600"
  //   }
  // }

  return (
    <div className="w-full h-full p-6 overflow-y-auto">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-white rounded-xl shadow-md border border-accent overflow-hidden">

          {/* ================= MODAL ================= */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-lg outline-none"
            overlayClassName="fixed inset-0 bg-black/40 flex justify-center items-start"
          >
            {activeOrder && (
              <div className="p-6 space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">
                    Order #{activeOrder.orderId}
                  </h2>

                  {/* ✅ INLINE STATUS IN MODAL */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        activeOrder.status?.toUpperCase() === "PAID"
                          ? "bg-green-100 text-green-700"
                          : activeOrder.status?.toUpperCase() === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : activeOrder.status?.toUpperCase() === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      }
                    `}
                  >
                    {activeOrder.status}
                  </span>
                  <select onChange={async (e)=>{
                   const updateedValue=e.target.value
                   try{
                      const token=localStorage.getItem("token");
                      await axios.put(import.meta.env.VITE_BACKEND_URL+ "/api/orders/"+activeOrder.orderId+"/"+updateedValue,{},{
                        headers:{
                          Authorization:"Bearer "+token
                        }
                      }

                      )
                    
                    setIsLoading(true)
                    const updatedOrder={...activeOrder}
                    updatedOrder.status=updateedValue;
                    setActiveOrder(updatedOrder)

                   }catch(e){
                      toast.error("Error uploading order status")
                      console.log(e)
                   }
                  }}>
                    <option selected disabled >Change Status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="returned">Returned</option>
                  </select>
                </div>

                {/* Customer Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">Customer</p>
                    <p>{activeOrder.name}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>{activeOrder.email}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p>{activeOrder.phone}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Date</p>
                    <p>{new Date(activeOrder.date).toLocaleString()}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-semibold">Address</p>
                    <p>{activeOrder.address}</p>
                  </div>
                </div>

                {/* Products TABLE */}
                <div>
                  <h3 className="font-semibold mb-3">Products</h3>

                  <div className="overflow-x-auto border rounded-lg">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-3 text-left">Image</th>
                          <th className="p-3 text-left">Product</th>
                          <th className="p-3 text-center">Price</th>
                          <th className="p-3 text-center">Quantity</th>
                          <th className="p-3 text-right">Subtotal</th>
                        </tr>
                      </thead>

                      <tbody>
                        {activeOrder.products.map((item, index) => {
                          const price = item.productInfo.price
                          const qty = item.quantity
                          const subtotal = price * qty

                          return (
                            <tr key={index} className="border-t hover:bg-gray-50">
                              <td className="p-3">
                                <img
                                  src={item.productInfo.images?.[0]}
                                  alt={item.productInfo.name}
                                  className="w-14 h-14 object-cover rounded"
                                />
                              </td>
                              <td className="p-3 font-medium">{item.productInfo.name}</td>
                              <td className="p-3 text-center">Rs. {price}</td>
                              <td className="p-3 text-center">{qty}</td>
                              <td className="p-3 text-right font-semibold">Rs. {subtotal}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Totals */}
                <div className="flex justify-end gap-6 text-sm">
                  <p>
                    <span className="font-semibold">Labelled:</span> Rs. {activeOrder.labelledTotle}
                  </p>
                  <p>
                    <span className="font-semibold">Total:</span> Rs. {activeOrder.total}
                  </p>
                </div>

                {/* Actions */}
                <div className="text-right space-x-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-accent text-white rounded-lg"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-accent text-white rounded-lg"
                  >
                    Print
                  </button>
                </div>
              </div>
            )}
          </Modal>

          {/* ================= ORDERS TABLE ================= */}
          <table className="w-full text-sm">
            <thead className="bg-accent text-white sticky top-0">
              <tr>
                <th className="p-4 text-left">Order ID</th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-right">Total</th>
                <th className="p-4 text-center">Date</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  onClick={() => {
                    setActiveOrder(order)
                    setIsModalOpen(true)
                  }}
                  className={`cursor-pointer border-b hover:bg-accent/10 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="p-4 font-medium">{order.orderId}</td>
                  <td className="p-4">{order.name}</td>
                  <td className="p-4">{order.email}</td>
                  <td className="p-4 text-right font-semibold">Rs. {order.total}</td>
                  <td className="p-4 text-center">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="p-4 text-center"> {order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders.length === 0 && (
            <div className="p-6 text-center text-gray-500">No orders found</div>
          )}
        </div>
      )}
    </div>
  )
}
