import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useGetUserWithCartQuery } from '../API/mindfulHarvestApi';
import { useDeleteCartItemFromCartMutation } from '../API/mindfulHarvestApi';
import { useCreateNewOrderMutation } from '../API/mindfulHarvestApi';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { emptyCart } from '../API/cartSlice';
import CartItem from './CartItem';
import GuestCartItem from './GuestCartItem';

const Cart = () => {
  const token = useSelector((state) => state.token);
  const guestCart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (token) {
    const [deleteCartItem] = useDeleteCartItemFromCartMutation();
    const [createOrder] = useCreateNewOrderMutation();
    const { data, error: userError, isLoading: userIsLoading } = useGetUserWithCartQuery();

    if (userIsLoading) {
      return <CircularProgress sx={{ color: 'black', marginTop: '40%', marginLeft: '40%' }} size={75} />;
    }
    if (userError || !data) {
      return <div style={{ color: 'red' }}>Unable to Get User with Cart</div>;
    }

    if (data.cart === null) {
      return <p style={{ color: '#777' }}>No cart present to display.</p>;
    }

    const cartWithItems = data.cart.items;

    async function handleCartItemRemoval(cartItemId) {
      try {
        const response = await deleteCartItem(cartItemId);
      } catch (error) {
        console.error(error);
      }
    }

    async function handleCreateOrder() {
      try {
        const response = await createOrder();
      } catch (error) {
        console.error(error);
      }
    }

    async function handleEmptyCart() {
      for (let i = 0; i < cartWithItems.length; i++) {
        deleteCartItem(cartWithItems[i].id);
      }
      navigate('/confirmation');
    }

    return (
      <div style={{ textAlign: 'left', marginLeft: '1em' }}>
        <h2 style={{ fontSize: '1.5em', color: '#333', marginBottom: '1em' }}>{data.username}'s Shopping Cart</h2>
        {cartWithItems.length > 0 ? (
          <div>
            {cartWithItems.map((item) => (
              <Card key={item.id} sx={{ width: '100%', marginBottom: 2, maxWidth: 400 }}>
                <CardContent>
                  <CartItem item={item} onDelete={handleCartItemRemoval} />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p style={{ color: '#777', marginTop: '1em' }}>Cart is empty. Please add items.</p>
        )}
    
        <Button
          onClick={() => {
            handleCreateOrder();
            handleEmptyCart();
          }}
          variant="contained"
          sx={{
            backgroundColor: '#F94892',
            marginTop: '1em',
            marginBottom: '2em',
            marginLeft: '1em',
            color: 'white',
            '&:hover': {
              backgroundColor: '#F94892',
            },
          }}
        >
          Place Order
        </Button>
      </div>
    );
  } else {
    const handleEmptyCart = async (event) => {
      event.preventDefault();

      dispatch(emptyCart());
      navigate('/confirmation');
    };

    return (
      <div style={{ textAlign: 'left', marginLeft: '1em' }}>
        <h2 style={{ fontSize: '1.5em', color: '#333', marginBottom: '1em' }}>Guest Shopping Cart</h2>

        {guestCart.length > 0 ? (
          <div>
            {guestCart.map((itemObj) => (
              <Card key={itemObj.id} sx={{ width: '100%', marginBottom: 2, maxWidth: 400 }}>
                <CardContent>
                  <GuestCartItem itemObj={itemObj} />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p style={{ color: '#777', marginTop: '1em' }}>
            Cart is empty. Please add items or sign in to your account.
          </p>
        )}
        
        <Button
          onClick={handleEmptyCart}
          variant="contained"
          sx={{
            backgroundColor: '#F94892',
            marginTop: '1em',
            marginBottom: '2em',
            marginLeft: '1em',
            color: 'white',
          }}
        >
          Place Order
        </Button>
      </div>
    );
  }
};

export default Cart;
