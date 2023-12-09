import React from "react";
import { useGetProductsQuery } from "../API/mindfulHarvestApi";
import { useDeleteProductMutation } from "../API/mindfulHarvestApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Paper, Typography, Button, Grid } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

export default function AllProducts() {
  const adminBoolean = useSelector(state => state.adminBoolean)
  const { data, error, isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  if (adminBoolean === false) {
    return (
      <Paper className="permissionMessageCard">
        <Typography variant="body1">
          Need Special Permissions to Access Page.
        </Typography>
      </Paper>
    );
  };

  // Handling error and loading states for getProductsQuery
  if (isLoading) {
    return <CircularProgress sx={{color: 'black', marginTop: "40%", marginLeft: "40%"}} size={75}/>
  }
  if (error) {
    return <div>Unable to Get Products</div>;
  }

  // onClick function to delete product using function from delete mutation
  async function adminDeleteProduct(productId) {
    try {
      const response = await deleteProduct(productId);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Grid container spacing={10} justifyContent="center" style={{ marginTop: '5px' }}>
      {data ? (
        data.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <Paper className="ProductItem" elevation={3}>
              <Typography variant="body1" className="ProductTitle"> {product.title}</Typography>
              <Typography variant="body1" className="ProductDescription"> {product.description}</Typography>
              <img className="ProductImage" src={product.image} alt={product.title} />
              <div className="ProductButtons" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <Button
                className="EditButton"
                onClick={() => navigate(`/adminEdit/${product.id}`)}
                style={{ backgroundColor: '#FF9494', color: '#fff', fontSize: '0.7rem' }}
              >
                Edit
              </Button>
              <Button
                className="DeleteButton"
                onClick={() => adminDeleteProduct(product.id)}
                style={{ backgroundColor: '#FF9494', color: '#fff', fontSize: '0.7rem', marginLeft: '10px' }}
              >
                Delete
              </Button>
            </div>
            </Paper>
          </Grid>
        ))
      ) : (
        <Typography variant="body1">Unable to View Products.</Typography>
      )}
    </Grid>
  );
}
