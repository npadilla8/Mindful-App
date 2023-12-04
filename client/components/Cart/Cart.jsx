import React from 'react';
import { useGetUserWithCartQuery } from '../API/mindfulHarvestApi';
import { useDeleteCartItemFromCartMutation } from '../API/mindfulHarvestApi';
import { useCreateNewOrderMutation } from '../API/mindfulHarvestApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
        const [createOrder] = useCreateNewOrderMutation();
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

        // inividual cart item removal from cart
        async function handleCartItemRemoval(cartItemId) {
            try {
                const response = await deleteCartItem(cartItemId);
                console.log("deleted cartitem: ", response);
            } catch (error) {
                console.error(error);
            }
        };

        // placing an order with cart items present
        async function handleCreateOrder() {
            try{
                const response = await createOrder();
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };

        // removal of all cart items from the cart once order placed
        async function handleEmptyCart() {
            for (let i = 0; i < cartWithItems.length; i++) {
                deleteCartItem(cartWithItems[i].id);
            };
            navigate('/confirmation');
        };

        return (
            <Card>
                <CardContent>
                    <h2>{data.username}'s Shopping Cart</h2>
                    {cartWithItems.length > 0 ? (
                        <div>
                            {cartWithItems.map((item) => (
                                <CartItem key={item.id} item={item} onDelete={handleCartItemRemoval} />
                            ))}
                            <button
                                onClick={()=> {handleCreateOrder(); handleEmptyCart()}}
                                style={{
                                    backgroundColor: '#FF9494',
                                    padding: '5px 8px', 
                                    fontSize: '0.9em', 
                                    border: 'none', 
                                    outline: 'none', 
                                    borderRadius: '5px', 
                                    color: 'white',
                                }}
                            >
                                Place Order
                            </button>
                        </div>
                    ) : (
                        <p>Cart is empty. Please add items.</p>
                    )}
                </CardContent>
            </Card>
        );
    } else {
        const handleEmptyCart = async (event) => {
            console.log("handle empty cart is called");
            event.preventDefault();

            dispatch(emptyCart());
            navigate('/confirmation');
        };

        return (
            <Card>
                <CardContent>
                    <h2>Guest Shopping Cart</h2>
                    {console.log("guest cart: ", guestCart)}
                    {console.log("guest cart length: ", guestCart.length)}

                    {guestCart.length > 0 ? (
                        <div>
                            {guestCart.map((itemObj) => (
                                <GuestCartItem key={itemObj.id} itemObj={itemObj} />
                            ))}
                            <br />
                            <br />
                            <button
                                onClick={handleEmptyCart}
                                style={{
                                    backgroundColor: '#FF9494',
                                    padding: '5px 8px', 
                                    fontSize: '0.9em', 
                                    border: 'none', 
                                    outline: 'none', 
                                    borderRadius: '5px', 
                                    color: 'white',
                                }}
                            >
                                Place Order
                            </button>
                        </div>
                    ) : (
                        <p>Cart is empty. Please add items or sign in to your account.</p>
                    )}
                </CardContent>
            </Card>
        );
    }
}

export default Cart;
