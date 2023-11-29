import React from "react";
import { useGetProductsQuery } from "../API/mindfulHarvestApi";
import { useDeleteProductMutation } from "../API/mindfulHarvestApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import '../CSS/adminpage.css';

export default function AllProducts() {
  const adminBoolean = useSelector(state => state.adminBoolean)
  const { data, error, isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

   if (adminBoolean === false) {
    return (
      <p className="permissionMessage"> Need Special Permissions to Access Page. </p>
    );
  };

  // Handling error and loading states for getProductsQuery
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (error) {
    return <div>Unable to Get Products</div>;
  }

  // onClick function to delete product using function from delete mutation
  async function adminDeleteProduct(productId) {
    try {
      const response = await deleteProduct(productId);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h3 className="ProductsHeading">Products for Sale</h3>
      {data ? (
        data.map((product) => {
          return (
            <div key={product.id} className="ProductItem">
              <p className="ProductTitle"> {product.title}</p>
              <p className="ProductDescription"> {product.description}</p>
              <img className="ProductImage" src={product.image} alt={product.title} />
              <div className="ProductButtons">
                <button className="EditButton" onClick={() => navigate(`/adminEdit/${product.id}`)}>
                  Edit
                </button>
                <button className="DeleteButton" onClick={() => adminDeleteProduct(product.id)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>Unable to View Products.</p>
      )}
    </>
  );
}
