import React, { useState } from 'react';
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from '../API/mindfulHarvestApi';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
      categoryId: Number(categoryId),
    };

    if (productId) {
      const updateResponse = await updateProduct({
        productId: productId,
        product: updatedProduct,
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
    <Paper elevation={3} style={{ padding: 20, maxWidth: 400, margin: 'auto' }}>
      <form method="POST" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Image Link"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Available</InputLabel>
          <Select
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
          >
            <MenuItem value="">
              <em>--Select--</em>
            </MenuItem>
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Return Policy</InputLabel>
          <Select
            value={returnPolicy}
            onChange={(e) => setReturnPolicy(e.target.value)}
          >
            <MenuItem value="">
              <em>--Select--</em>
            </MenuItem>
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <MenuItem value="">
              <em>--Select--</em>
            </MenuItem>
            <MenuItem value={1}>Clothing & Jewelry</MenuItem>
            <MenuItem value={2}>Toys</MenuItem>
            <MenuItem value={3}>Collectibles & Art</MenuItem>
            <MenuItem value={4}>Home & Living</MenuItem>
          </Select>
        </FormControl>

        <Button
                variant="contained"
                type="submit"
                style={{ backgroundColor: '#FF9494', color: 'white' }}
                >
                Submit
        </Button>
      </form>
      <br />
            <Button
        onClick={() => navigate('/admin/allproducts')}
        style={{ backgroundColor: '#FF9494', color:'white' }}
        >
        Back
        </Button>
    </Paper>
  );
}
