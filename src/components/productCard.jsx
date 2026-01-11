
export default function ProductCard(props){
    console.log(props)
    return(

        <div className="card">
            <img src="https://picsum.photos/id/1/200/300"/>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <h2>{props.price}</h2>
            <button className="addtoCart">Add to Cart</button>
            <button className="buyNow">Buy Now</button>
        </div>
    )
}