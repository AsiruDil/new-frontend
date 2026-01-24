import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { FaEdit, FaTrash } from "react-icons/fa"
import toast from "react-hot-toast"


export default function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
      .then((res) => {
        setProducts(res.data)
        setIsLoading(false)
      })
      .catch(() => {
        toast.error("Failed to load products")
        setIsLoading(false)
      })
  }, [])

  function deleteProduct(productId) {
    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("Please login first")
      return
    }

    if (!window.confirm("Are you sure you want to delete this product?")) return

    axios
      .delete(
        import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(() => {
        toast.success("Product deleted")
        setProducts((prev) =>
          prev.filter((item) => item.productId !== productId)
        )
      })
      .catch((e) => {
        toast.error(e?.response?.data?.message || "Delete failed")
      })
  }

  return (
    <div className="w-full h-full relative p-6 overflow-y-auto">

      {/* Add product button */}
      <Link
        to="/admin/add-product"
        className="fixed bottom-6 right-6 w-[55px] h-[55px] rounded-full
        bg-accent text-white text-2xl flex justify-center items-center
        shadow-lg hover:scale-105 transition"
      >
        +
      </Link>

      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[50px] h-[50px] border-4 border-gray-300 border-t-accent rounded-full animate-spin"></div>
        </div>
      ) : (



        <div className="bg-white rounded-xl shadow-md border border-accent overflow-hidden">
      

          <table className="w-full text-sm">
            <thead className="bg-accent text-white sticky top-0">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-center">Image</th>
                <th className="p-4 text-right">Label Price</th>
                <th className="p-4 text-right">Price</th>
                <th className="p-4 text-center">Stock</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item, index) => (
                <tr
                   
                  key={item.productId}
                  className={`border-b hover:bg-accent/10 transition ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-4 font-medium">{item.productId}</td>
                  <td className="p-4">{item.name}</td>

                  <td className="p-4 flex justify-center">
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="w-[45px] h-[45px] object-cover rounded border"
                    />
                  </td>

                  <td className="p-4 text-right text-gray-500">
                    Rs. {item.lablePrice}
                  </td>
                  <td className="p-4 text-right font-semibold">
                    Rs. {item.price}
                  </td>
                  <td className="p-4 text-center">{item.stock}</td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => deleteProduct(item.productId)}
                        className="p-2 rounded-full bg-red-100 text-red-600
                        hover:bg-red-600 hover:text-white transition"
                      >
                        <FaTrash />
                      </button>

                      <button
                        onClick={() =>
                          navigate("/admin/edit-product", { state: item })
                        }
                        className="p-2 rounded-full bg-blue-100 text-blue-600
                        hover:bg-blue-600 hover:text-white transition"
                      >
                        <FaEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  )
}
