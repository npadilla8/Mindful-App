import { useGetSingleProductQuery } from "./API/mindfulHarvestApi";

const CartItem = (props) => {
    const item = props.item;
    const handleCartItemRemoval = props.onDelete
    
    const { data: singleProductData, error: productError, isLoading: productIsLoading } = useGetSingleProductQuery(item.productId);
  
    if (productIsLoading) {
      return <div>Loading product...</div>;
    }
  
    if (productError || !singleProductData) {
      return <div>Error in showing cart item.</div>;
    }
  
    return (
      <div key={item.id}>
        <p><b>{singleProductData.title}</b></p>
        <img style={{ width: "40%" }} src={singleProductData.image} alt={singleProductData.title} />
        <p>Price: ${singleProductData.price}</p>
        <p>Quantity: {item.quantity}</p>
        <button onClick={() => handleCartItemRemoval(item.id)}>Remove</button>
      </div>
    );
  };

  export default CartItem