import React from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {Card, CardContent} from "@mui/material";
import ProductForm from "./ProductForm";

export default function CreateProduct() {
  const adminBoolean = useSelector((state) => state.adminBoolean);

  if (adminBoolean === false) {
    return (
      <Card className="permissionMessageCard">
        <CardContent>
          <Typography variant="body1">
            Need Special Permissions to Access Page.
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h6" style={{ margin: "20px 0" }}>
          Add a New Product for Sale
        </Typography>
      </div>

      <Container component="main" maxWidth="xs">
        <ProductForm />
      </Container>
    </>
  );
}
