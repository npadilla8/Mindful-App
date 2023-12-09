import { useGetSingleProductQuery } from '../API/mindfulHarvestApi';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCart } from '../API/cartSlice';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';

const GuestCartItem = (props) => {
  const itemObj = props.itemObj;
  const [quantity, setQuantity] = useState(itemObj.quantity);
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetSingleProductQuery(itemObj.productId);
  if (isLoading) {
    return <CircularProgress sx={{color: 'black', marginTop: "40%", marginLeft: "40%"}} size={75}/>
  };
  if (error || !data) {
    return <div>Error in showing cart items.</div>;
  };

  const handleEditItemQuantity = async (event) => {
    event.preventDefault();

    if(quantity >= 1) {
      dispatch(
        updateCart({
          productId: data.id,
          quantity: Number(quantity),
        })
      );
    };
  };

  const handleRemoveItem = async (event) => {
    event.preventDefault();

    dispatch(
      updateCart({
        productId: data.id,
        quantity: 0,
      })
    );
  };

  return (
    <div key={itemObj.id}>
      <p>
        <b>{data.title}</b>
      </p>
      <img style={{ width: '40%' }} src={data.image} alt={data.title} />
      <p>Price: {' $'}{data.price}</p>
      <p>Quantity: {itemObj.quantity}</p>
      <label>
        Quantity: {' '}
        <input value={quantity} onChange={(event) => setQuantity(event.target.value)} />
      </label>

      {/* Edit Icon */}
      <IconButton onClick={handleEditItemQuantity}>
        <EditIcon style={{ color: 'black' }} />
      </IconButton>

      {/* Remove Icon */}
      <IconButton onClick={handleRemoveItem}>
        <DeleteIcon style={{ color: 'black' }} />
      </IconButton>
    </div>
  );
};

export default GuestCartItem;
