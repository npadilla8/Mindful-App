import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { useGetUserWithCartQuery } from '../API/mindfulHarvestApi';
import { useDeleteCartItemFromCartMutation } from '../API/mindfulHarvestApi';
import CartItem from './CartItem';
import GuestCartItem from './GuestCartItem';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Styled Card for consistent styling
const StyledCard = styled(Card)({
  maxWidth: 600,
  margin: 'auto',
  marginTop: 20,
  padding: 20,
});

const Cart = () => {
  const token = useSelector((state) => state.token);
  const guestCart = useSelector((state) => state.cart);
  const navigate = useNavigate();

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
      return <p>No cart present to display.</p>;
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
          <div>
            {cartWithItems.map((item) => (
              // Individual Card for each item
              <StyledCard key={item.id}>
                <CardContent>
                  <CartItem item={item} onDelete={handleCartItemRemoval} />
                </CardContent>
              </StyledCard>
            ))}
            <br />
            <br />
            {/* Button for placing the order without the surrounding card */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button
                onClick={() => navigate("/confirmation")}
                variant="contained"
                style={{ backgroundColor: '#FF9494', color: 'white' }}
              >
                Place Order
              </Button>
            </div>
          </div>
        ) : (
          <p>Unable to view cart. Cart is empty.</p>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <h2>Guest Shopping Cart</h2>
        {guestCart.length > 0 ? (
          <div>
            {guestCart.map((itemObj) => (
              // Individual Card for each item in the guest cart
              <StyledCard key={itemObj.id}>
                <CardContent>
                  <GuestCartItem itemObj={itemObj} />
                </CardContent>
              </StyledCard>
            ))}
            <br />
            <br />
            {/* Button for placing the order without the surrounding card */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button
                onClick={() => navigate("/confirmation")}
                variant="contained"
                style={{ backgroundColor: '#FF9494', color: 'white' }}
              >
                Place Order
              </Button>
            </div>
          </div>
        ) : (
          <p>Cart is empty. Please add items or sign in to your account.</p>
        )}
      </div>
    );
  }
};

export default Cart;
