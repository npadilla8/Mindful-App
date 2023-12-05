import React, { useState } from 'react';
import { useAddProductMutation, useUpdateProductMutation } from '../API/mindfulHarvestApi';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material';

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
      const updateResponse = await updateProduct({
        productId: productId,
        product: updatedProduct
      });
      console.log('PUT product: ', updateResponse);
    } else {
      const addResponse = await addProduct({
        title: title,
        image: image,
        description: description,
        price: Number(price),
        available: JSON.parse(available),
        returnPolicy: JSON.parse(returnPolicy),
        quantity: Number(quantity),
        categoryId: Number(categoryId),
      });
      console.log('POST Product: ', addResponse);
      navigate('/admin/allproducts');
    }
  }

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto', alignContent: 'left' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={props.title}
          onChange={(e) => props.setTitle(e.target.value)}
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          label="Image Link"
          value={props.image}
          onChange={(e) => props.setImage(e.target.value)}
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          label="Description"
          value={props.description}
          onChange={(e) => props.setDescription(e.target.value)}
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          label="Price"
          value={props.price}
          onChange={(e) => props.setPrice(e.target.value)}
          fullWidth
          margin="normal"
          size="small"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Available</InputLabel>
          <Select value={props.available} onChange={(e) => props.setAvailable(e.target.value)}>
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Return Policy</InputLabel>
          <Select value={props.returnPolicy} onChange={(e) => props.setReturnPolicy(e.target.value)}>
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Quantity"
          value={props.quantity}
          onChange={(e) => props.setQuantity(e.target.value)}
          fullWidth
          margin="normal"
          size="small"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select value={props.categoryId} onChange={(e) => props.setCategoryId(e.target.value)}>
            <MenuItem value={1}>Clothing & Jewelry</MenuItem>
            <MenuItem value={2}>Toys</MenuItem>
            <MenuItem value={3}>Collectibles & Art</MenuItem>
            <MenuItem value={4}>Home & Living</MenuItem>
          </Select>
        </FormControl>
  
        <Button type="submit" variant="contained" style={{ backgroundColor: '#FF9494', color: '#fff', marginTop: '10px' }}>
          Submit
        </Button>
      </form>
  
      <Button onClick={() => navigate('/admin/allproducts')} style={{ backgroundColor: '#FF9494', color: '#fff', marginTop: '10px' }}>
        Back
      </Button>
    </Paper>
  );
  
}
