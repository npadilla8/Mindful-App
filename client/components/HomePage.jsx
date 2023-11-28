import React, { useState } from 'react';
import { useGetProductsQuery } from './API/mindfulHarvestApi';
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import { Card, CardActions, CardContent, CardMedia, Box, Grid } from '@mui/material';


const HomePage = () => {
    const [query, setQuery] = useState("");
    const { data, isLoading, error } = useGetProductsQuery();
    const navigate = useNavigate();

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }
    if (error) {
        return <Typography>Error</Typography>;
    }
    console.log(isLoading? "Loading result" : "from useGetProductsQuery", data.products)

    return (
       <Box>

            <Typography variant="h3">Products</Typography>
            {data && data.length > 0 ? (
                data.map((product) => (
                    <Grid item key={product.id}>
                        <Card sx={{maxWidth: 350, margin: 2}} >
                            <CardMedia
                                component="img"
                                alt={product.title}
                                height="500"
                                img src={product.image}
                                />
                    <CardContent>
                        <Typography variant="h3">{product.title}</Typography>
                        <Typography><b>Description: </b>{product.description}</Typography>
                        </CardContent>
                        <CardActions>
                        <Button onClick={() => navigate("/products/" + product.id)} variant="outlined">
              View Details
            </Button>
            </CardActions>
            </Card>
            </Grid>
                    
                ))
            ) : (
                <p>Unable to view products.</p>
            )}
        </Box>
    );
};
export default HomePage;
