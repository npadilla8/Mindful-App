
import React, { useState } from 'react';
import { useAddProductMutation, useUpdateProductMutation } from '../API/mindfulHarvestApi';
import { useNavigate } from 'react-router-dom';
import {Button, MenuItem, Paper, TextField} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function ProductForm(props) {
  const [productId, setProductId] = useState(props.productId ?? '');
  const [title, setTitle] = useState(props.title ?? '');
  const [image, setImage] = useState(props.image ?? '');
  const [description, setDescription] = useState(props.description ?? '');
  const [price, setPrice] = useState(props.price ?? '');
  const [available, setAvailable] = useState(props.available ?? '');
  const [returnPolicy, setReturnPolicy] = useState(props.returnPolicy ?? '');
  const [quantity, setQuantity] = useState(props.quantity ?? '');
  const [categoryId, setCategoryId] = useState(props.categoryId ?? '');

  const [updateProduct] = useUpdateProductMutation();
  const [addProduct] = useAddProductMutation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const updatedProduct = {
      title: title,
      image: image,
      description: description,
      price: Number(price),
      available: JSON.parse(available),
      returnPolicy: JSON.parse(returnPolicy),
      quantity: Number(quantity),
      categoryId: Number(categoryId)
    };

    if (productId) {
      await updateProduct({
        productId: productId,
        product: updatedProduct
      });
    } else {
      await addProduct({
        title: title,
        image: image,
        description: description,
        price: Number(price),
        available: JSON.parse(available),
        returnPolicy: JSON.parse(returnPolicy),
        quantity: Number(quantity),
        categoryId: Number(categoryId),
      });
      navigate('/admin/allproducts');
    }
  }

  const handleOpenAlert = async (event) => {
    if (productId) {
      setOpen(true)
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: 'auto', alignContent: 'left' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          label="Image Link"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          fullWidth
          select
          label="Available"
          margin="normal"
          size="small"
          value={available} onChange={(e) => setAvailable(e.target.value)}>
          <MenuItem value={true}>True</MenuItem>
          <MenuItem value={false}>False</MenuItem>
        </TextField>

        <TextField
          fullWidth
          select
          label="Return Policy"
          margin="normal"
          size="small"
          value={returnPolicy} onChange={(e) => setReturnPolicy(e.target.value)}>
          <MenuItem value={true}>True</MenuItem>
          <MenuItem value={false}>False</MenuItem>
        </TextField>

        <TextField
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          margin="normal"
          size="small"
        />

        <TextField
          fullWidth
          select
          label="Category"
          margin="normal"
          size="small"
          value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <MenuItem value={1}>Clothing & Jewelry</MenuItem>
          <MenuItem value={2}>Toys</MenuItem>
          <MenuItem value={3}>Collectibles & Art</MenuItem>
          <MenuItem value={4}>Home & Living</MenuItem>
        </TextField>

        <Button type="submit" variant="contained" style={{ backgroundColor: '#F94892', color: '#fff', marginTop: '10px' }} onClick={(e) => {handleOpenAlert({ vertical: 'top', horizontal: 'center' })}}>
          Submit
        </Button>
        <Snackbar
            open={open}
            onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="success"
            sx={{ width: '100%' }}
            style={{ backgroundColor: '#F94892' }}
          >
            Product edited!
          </Alert>
        </Snackbar>
      </form>

      <Button onClick={() => navigate('/admin/allproducts')} style={{ backgroundColor: '#F94892', color: '#fff', marginTop: '10px' }}>
        Back
      </Button>
    </Paper>
  );

}
