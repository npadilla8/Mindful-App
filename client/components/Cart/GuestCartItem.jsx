import { useGetSingleProductQuery } from '../API/mindfulHarvestApi';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCart } from '../API/cartSlice';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const GuestCartItem = (props) => {
  const itemObj = props.itemObj;
  const [quantity, setQuantity] = useState(itemObj.quantity);
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetSingleProductQuery(itemObj.productId);
  if (isLoading) {
    return <CircularProgress sx={{ color: 'black', marginTop: "40%", marginLeft: "40%" }} size={75} />
  };
  if (error || !data) {
    return <div>Error in showing cart items.</div>;
  };

  const handleEditItemQuantity = async () => {
    if (quantity >= 1) {
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

  function handleEnterKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleEditItemQuantity();
    }
};


  return (
    <Box key={itemObj.id} sx={{ flexGrow: 1 }} style={{ padding: '2%' }}>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <img style={{ width: '80%', marginRight: "1%" }} src={data.image} alt={data.title} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1"><b>{data.title}</b></Typography>
          <Typography variant="body1">{data.description}</Typography>
          <br />

          <Typography variant="body1">Quantity: {itemObj.quantity}</Typography>
          <br />
          <Typography variant="body1">
            <input value={quantity} onChange={(event) => setQuantity(event.target.value)} 
            style={{padding: '1%', fontSize: '90%'}} onKeyDown={handleEnterKeyPress} />
          </Typography>
          <br />

          {/* Edit Icon */}
          <IconButton onClick={handleEditItemQuantity}>
            <EditIcon style={{ color: 'black' }} />
          </IconButton>

          {/* Remove Icon */}
          <IconButton onClick={handleRemoveItem}>
            <DeleteIcon style={{ color: 'black' }} />
          </IconButton>
        </Grid>
        <Grid item xs={2} style={{ marginLeft: '8%' }}>
          <Typography variant="body1">Price: $ {' $ '} {data.price * itemObj.quantity}</Typography>
          <Typography variant="body1">{'($ '} {data.price} {'per item)'}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GuestCartItem;
