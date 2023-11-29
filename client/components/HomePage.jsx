import React, { useState } from 'react';
import { useGetProductsQuery } from './API/mindfulHarvestApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Card, CardContent, CardMedia, CardActions, Grid } from '@mui/material';

const HomePage = () => {
  const categoryId = useSelector((state) => state.categoryId)
  const { data, isLoading, error } = useGetProductsQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  if (error || !data) {
    return <Typography>Unable to view products.</Typography>;
  };

  // if categoryId exist in redux, items with that cat Id will be shown
  // otherwise, all products will be shown

  if (categoryId && data) {
    const filteredProductsArray = data.filter((product) => product.categoryId === categoryId);
    console.log(filteredProductsArray);
    return (
      <Box p={3}> {/* Added padding */}
        <Grid container spacing={1} justifyContent="center">
          {filteredProductsArray.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  alt={product.title}
                  height="70%"
                  image={product.image}
                  style={{ objectFit: 'cover' }}
                />
                <CardContent style={{ textAlign: 'center' }}>
                  <Typography variant="h6" style={{ margin: '10px 0' }}>
                    {product.title}
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'center' }}>
                  <Button
                    onClick={() => navigate(`/products/${product.id}`)}
                    style={{ backgroundColor: '#FF9494', color: '#fff', fontSize: '0.7rem' }}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  else {
    return (
      <Box p={3}> {/* Added padding */}
        <Grid container spacing={1} justifyContent="center">
          {data && (
            data.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={product.title}
                    height="70%"
                    image={product.image}
                    style={{ objectFit: 'cover' }}
                  />
                  <CardContent style={{ textAlign: 'center' }}>
                    <Typography variant="h6" style={{ margin: '10px 0' }}>
                      {product.title}
                    </Typography>
                  </CardContent>
                  <CardActions style={{ justifyContent: 'center' }}>
                    <Button
                      onClick={() => navigate(`/products/${product.id}`)}
                      style={{ backgroundColor: '#FF9494', color: '#fff', fontSize: '0.7rem' }}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    );
  }
};

export default HomePage;
