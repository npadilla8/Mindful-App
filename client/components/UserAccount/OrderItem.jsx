import { useGetSingleProductQuery } from "../API/mindfulHarvestApi";

export default function OrderItem(props) {
    const orderItem = props.item;
    const { data, error, isLoading } = useGetSingleProductQuery(orderItem.productId);

    if (isLoading) {
        return <div>Product is loading...</div>
    };
    if (error || !data) {
        return <div>Single product information is not being fetched.</div>
    }
    return (
        <div key={orderItem.id}>
            <img style={{ width: "10%", height: "10%" }} src={data.image} alt={data.title} />
            <p><b>{data.title}</b></p>
            <p><b>Price:</b> ${data.price}</p>
            <p><b>Qty:</b> {orderItem.quantity}</p>
        </div>
    )
}