import React from "react";
import { useGetProductsQuery } from "../API/mindfulHarvestApi";
import { useDeleteProductMutation } from "../API/mindfulHarvestApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Paper, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

export default function AllProducts() {
  const adminBoolean = useSelector(state => state.adminBoolean);
  const categoryId = useSelector((state) => state.categoryId);
  const searchField = useSelector((state) => state.searchField);
  const { data, error, isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  if (adminBoolean === false) {
    return (
      <Card className="permissionMessageCard">
        <CardContent>
          <Typography variant="body1">
            Need Special Permissions to Access Page.
          </Typography>
        </CardContent>
      </Card>
    );
  };

  // Handling error and loading states for getProductsQuery
  if (isLoading) {
    return <CircularProgress sx={{ color: 'black', marginTop: "40%", marginLeft: "40%" }} size={75} />
  }
  if (error || !data) {
    return <div>Unable to Get Products</div>;
  }

  // onClick function to delete product using function from delete mutation
  async function adminDeleteProduct(productId) {
    try {
      await deleteProduct(productId);
    } catch (error) {
      console.error(error);
    }
  }

  //admin can use search box to look for items by title
  if (searchField && data) {
    const searchBoxProducts = data.filter((product) =>
      product.title.toLowerCase().includes(searchField.toLowerCase())
    );

    if (searchBoxProducts.length === 0) {
      return (
        <Paper elevation={3} style={{ maxWidth: '50%', margin: 'auto', alignContent: 'left', marginTop: '5%', padding: '1%' }}>
          <Typography variant="h6" style={{ textAlign: 'center' }}>No products found. Please search for other items.</Typography>
        </Paper>
      );
    }
    return (
      <>
        <Typography variant="body1" style={{ textAlign: 'left', marginTop: "2%", marginLeft: "1%", marginBottom: '2%' }}>
          <b>Instructions:</b> Search for products to edit or delete using the filtering features above.
        </Typography>
        <Grid container spacing={10} justifyContent="center" >
          {searchBoxProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={3}>
              <Paper className="ProductItem" elevation={3}>
                <Typography variant="body1" className="ProductTitle"> {product.title}</Typography>
                <Typography variant="body1" className="ProductDescription"> {product.description}</Typography>
                <img className="ProductImage" src={product.image} alt={product.title} />
                <div className="ProductButtons" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                  <Button
                    className="EditButton"
                    onClick={() => navigate(`/adminEdit/${product.id}`)}
                    style={{ backgroundColor: '#F94892', color: '#fff', fontSize: '0.7rem' }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="DeleteButton"
                    onClick={() => adminDeleteProduct(product.id)}
                    style={{ backgroundColor: '#F94892', color: '#fff', fontSize: '0.7rem', marginLeft: '10px' }}
                  >
                    Delete
                  </Button>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
  //admin can search for items by category
  if (categoryId && data) {
    const filteredProductsArray = data.filter((product) => product.categoryId === categoryId);
    return (
      <>
        <Typography variant="body1" style={{ textAlign: 'left', marginTop: "2%", marginLeft: "1%", marginBottom: '2%' }}>
          <b>Instructions:</b> Search for products to edit or delete using the filtering features above.
        </Typography>
        <Grid container spacing={10} justifyContent="center">
          {filteredProductsArray.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={3}>
              <Paper className="ProductItem" elevation={3}>
                <Typography variant="body1" className="ProductTitle"> {product.title}</Typography>
                <Typography variant="body1" className="ProductDescription"> {product.description}</Typography>
                <img className="ProductImage" src={product.image} alt={product.title} />
                <div className="ProductButtons" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                  <Button
                    className="EditButton"
                    onClick={() => navigate(`/adminEdit/${product.id}`)}
                    style={{ backgroundColor: '#F94892', color: '#fff', fontSize: '0.7rem' }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="DeleteButton"
                    onClick={() => adminDeleteProduct(product.id)}
                    style={{ backgroundColor: '#F94892', color: '#fff', fontSize: '0.7rem', marginLeft: '10px' }}
                  >
                    Delete
                  </Button>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </>
    )
  }
  //all products rendered
  if (data) {
    return (
      <>
        <Typography variant="body1" style={{ textAlign: 'left', marginTop: "2%", marginLeft: "1%", marginBottom: '2%' }}>
          <b>Instructions:</b> Search for products to edit or delete using the filtering features above.
        </Typography>
        <Grid container spacing={10} justifyContent="center" >
          {data.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={3}>
              <Paper className="ProductItem" elevation={3}>
                <Typography variant="body1" className="ProductTitle"> {product.title}</Typography>
                <Typography variant="body1" className="ProductDescription"> {product.description}</Typography>
                <img className="ProductImage" src={product.image} alt={product.title} />
                <div className="ProductButtons" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                  <Button
                    className="EditButton"
                    onClick={() => navigate(`/adminEdit/${product.id}`)}
                    style={{ backgroundColor: '#F94892', color: '#fff', fontSize: '0.7rem' }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="DeleteButton"
                    onClick={() => adminDeleteProduct(product.id)}
                    style={{ backgroundColor: '#F94892', color: '#fff', fontSize: '0.7rem', marginLeft: '10px' }}
                  >
                    Delete
                  </Button>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
}
