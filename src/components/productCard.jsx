
export default function ProductCard({ product }) {
    return (
        <div className="w-[300px] bg-white shadow-lg rounded-xl m-3 overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col">
            
            {/* Image */}
            <div className="h-[200px] w-full bg-gray-100 flex items-center justify-center">
                <img
                    src={product.images?.[0] || "https://via.placeholder.com/300"}
                    alt={product.name}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                
                {/* Product Name */}
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                </h2>

                {/* Alternative Names */}
                {product.altName?.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1 truncate">
                        {product.altName.join(", ")}
                    </p>
                )}

                {/* Description */}
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {product.description}
                </p>

                {/* Prices */}
                <div className="mt-3 flex items-center gap-2">
                    <span className="text-lg font-bold text-green-600">
                        ₹{product.price}
                    </span>
                    <span className="text-sm line-through text-gray-400">
                        ₹{product.lablePrice}
                    </span>
                </div>

                {/* Stock Status */}
                <p
                    className={`mt-2 text-sm font-medium ${
                        product.stock > 0
                            ? "text-green-600"
                            : "text-red-500"
                    }`}
                >
                    {product.stock > 0
                        ? `In Stock (${product.stock})`
                        : "Out of Stock"}
                </p>

                {/* Buttons */}
                <div className="mt-auto flex gap-2 pt-4">
                    <button
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                        disabled={!product.isAvailable}
                    >
                        Add to Cart
                    </button>

                    <button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg text-sm hover:bg-blue-50 transition">
                        View
                    </button>
                </div>
            </div>
        </div>
    );
}
