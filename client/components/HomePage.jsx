import React from 'react';
import { useGetProductsQuery } from './API/mindfulHarvestApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Card, CardContent, CardMedia, CardActions, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const HomePage = () => {
  const categoryId = useSelector((state) => state.categoryId);
  const searchField = useSelector((state) => state.searchField);
  const { data, isLoading, error } = useGetProductsQuery();
  const navigate = useNavigate();

  // Define cardContentStyle
  const cardContentStyle = {
    padding: '16px',
    textAlign: 'center',
  };

  if (isLoading) {
    return <CircularProgress sx={{ color: 'black', marginTop: '40%', marginLeft: '40%' }} size={75} />;
  }

  if (error || !data) {
    return <Typography>Unable to view products.</Typography>;
  }

  const cardMediaHeight = '400px';

  if (searchField && data) {
    const searchBoxProducts = data.filter((product) =>
      product.title.toLowerCase().includes(searchField.toLowerCase())
    );

    if (searchBoxProducts.length === 0) {
      return (
        <h3>
          <Typography variant="h6">No products found. Please search for other items.</Typography>{' '}
        </h3>
      );
    }

    return (
      <Box p={3}>
        <Grid container spacing={1} justifyContent="center">
          {searchBoxProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  alt={product.title}
                  height={cardMediaHeight}
                  image={product.image}
                  style={{ objectFit: 'cover' }}
                />
                <CardContent style={{ ...cardContentStyle, textAlign: 'center' }}>
                  <Typography variant="h6" style={{ margin: '10px 0' }}>
                    {product.title}
                  </Typography>
                </CardContent>

                <CardActions style={{ justifyContent: 'center' }}>
                  <Button
                    onClick={() => navigate(`/products/${product.id}`)}
                    style={{ backgroundColor: '#F94892', color: '#fff', fontSize: '0.7rem' }}
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

  if (categoryId && data) {
    const filteredProductsArray = data.filter((product) => product.categoryId === categoryId);
    return (
      <Box p={3}>
        <Grid container spacing={1} justifyContent="center">
          {filteredProductsArray.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  alt={product.title}
                  height={cardMediaHeight}
                  image={product.image}
                  style={{ objectFit: 'cover' }}
                />
                <CardContent style={{ ...cardContentStyle, textAlign: 'center' }}>
                  <Typography variant="h6" style={{ margin: '10px 0' }}>
                    {product.title}
                  </Typography>
                </CardContent>

                <CardActions style={{ justifyContent: 'center' }}>
                  <Button
                    onClick={() => navigate(`/products/${product.id}`)}
                    style={{ backgroundColor: '#F94892', color: '#fff', fontSize: '0.7rem' }}
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

  if (data) {
    return (
      <Box p={3}>
        <Grid container spacing={1} justifyContent="center">
          {data &&
            data.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={product.title}
                    height={cardMediaHeight}
                    image={product.image}
                    style={{ objectFit: 'cover' }}
                  />
                  <CardContent style={{ ...cardContentStyle, textAlign: 'center' }}>
                    <Typography variant="h6" style={{ margin: '10px 0' }}>
                      {product.title}
                    </Typography>
                  </CardContent>
                  <CardActions style={{ justifyContent: 'center' }}>
                    <Button
                      onClick={() => navigate(`/products/${product.id}`)}
                      style={{ backgroundColor: '#F94892', color: '#fff', fontSize: '0.9rem' }}
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
};

export default HomePage;
