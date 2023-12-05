import React from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ProductForm from "./ProductForm";

export default function CreateProduct() {
  const adminBoolean = useSelector((state) => state.adminBoolean);
  console.log("admin boolean", adminBoolean);

  if (adminBoolean === false) {
    return <p> Need Special Permissions to Access Page. </p>;
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h6" style={{ margin: "20px 0" }}>
          Add a New Product for Sale
        </Typography>
      </div>

      <Container component="main" maxWidth="xs">
        <div style={{ padding: "20px", marginTop: "20px" }}>
          <ProductForm />
        </div>
      </Container>
    </>
  );
}
