import { useGetUserWithCartQuery } from '../API/mindfulHarvestApi';
import { useDeleteCartItemFromCartMutation } from '../API/mindfulHarvestApi';
import CartItem from './CartItem';
import GuestCartItem from './GuestCartItem';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { emptyCart } from '../API/cartSlice';

const Cart = () => {
    const token = useSelector((state) => state.token);
    const guestCart = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        console.log("logged in user with cart",cartWithItems)

        async function handleCartItemRemoval(cartItemId) {
            try {
                const response = await deleteCartItem(cartItemId);
                console.log("deleted cartitem: ", response);
            } catch (error) {
                console.error(error);
            }
        };

        async function handleEmptyCart() {
            for (let i = 0; i < cartWithItems.length; i++) {
                deleteCartItem(cartWithItems[i].id);
            };
            navigate('/confirmation');
        };

        return (
            <div>
                <h2>{data.username}'s Shopping Cart</h2>
                {cartWithItems.length > 0 ? (
                    <div>
                        {cartWithItems.map((item) => (
                            <CartItem key={item.id} item={item} onDelete={handleCartItemRemoval} />
                        ))}
                        <br />
                        <br />
                        <button onClick={handleEmptyCart} style={{ backgroundColor: 'lightgreen' }}>
                            Place Order
                        </button>
                    </div>
                ) : (
                    <p>Unable to view cart. Cart is empty.</p>
                )}
            </div>
        );
    } else {
        const handleEmptyCart = async (event) => {
            console.log("handle empty cart is called");
            event.preventDefault();

            dispatch(emptyCart());
            navigate('/confirmation');
        };

        return (
            <div>
                <h2>Guest Shopping Cart</h2>
                {console.log("guest cart: ", guestCart)}
                {console.log("guest cart length: ", guestCart.length)}

                {guestCart.length > 0 ? (
                    <div>
                        {guestCart.map((itemObj) => (
                            <GuestCartItem itemObj={itemObj} />
                        ))};
                        <br />
                        <br />
                        <button onClick={handleEmptyCart}
                            style={{ backgroundColor: 'lightgreen' }}>
                            Place Order
                        </button>
                    </div>
                ) : (
                    <p>Cart is empty. Please add items or sign in to your account.</p>
                )}
            </div>
        )
    }
}
export default Cart;


