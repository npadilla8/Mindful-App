import { useGetUserWithCartQuery } from '../API/mindfulHarvestApi';
import { useDeleteCartItemFromCartMutation } from '../API/mindfulHarvestApi';
import CartItem from './CartItem';
import GuestCartItem from './GuestCartItem';
import { useSelector } from 'react-redux';

const Cart = () => {
    const token = useSelector((state) => state.token);
    const guestCart = useSelector((state) => state.cart);

    if (token) {
        const [deleteCartItem] = useDeleteCartItemFromCartMutation();
        const { data, error: userError, isLoading: userIsLoading } = useGetUserWithCartQuery();

        // Loading and error for getting user with cart
        if (userIsLoading) {
            return <div>Loading...</div>;
        }
        if (userError || !data) {
            return <div>Unable to Get User with Cart</div>;
        }

        if (data.cart === null) {
            return <p>No cart present to display.</p>
        }

        const cartWithItems = data.cart.items;

        async function handleCartItemRemoval(cartItemId) {
            try {
                const response = await deleteCartItem(cartItemId);
                console.log("deleted cartitem: ", response);
            } catch (error) {
                console.error(error);
            }
        }

        return (
            <div>
                <h2>{data.username}'s Shopping Cart</h2>
                {cartWithItems.length > 0 ? (
                    cartWithItems.map((item) => (
                        <CartItem key={item.id} item={item} onDelete={handleCartItemRemoval} />
                    ))
                ) : (
                    <p>Unable to view cart. Cart is empty.</p>
                )}
            </div>
        );
    } else {
        return (
            <div>
                <h2>Guest Shopping Cart</h2>
                {console.log("guest cart: ", guestCart)}
                {console.log("guest cart length: ", guestCart.length)}

                {guestCart.length > 0 ? (
                    guestCart.map((itemObj) => (
                        <GuestCartItem itemObj={itemObj} />
                    ))
                ) : (
                    <p>Cart is empty. Please add items or sign in to your account.</p>
                )}
            </div>
        )
    }
}
export default Cart;


