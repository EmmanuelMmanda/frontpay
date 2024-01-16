// src/components/CheckoutPage.jsx
import { useLocation } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";
import { Typography, Paper, Grid } from "@mui/material";
import Header from "../UI/Header";

const CheckoutPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");;
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const price = searchParams.get("price");

  const cardStyle = {
    padding: "16px",
    marginBottom: "16px",
  };

  const sectionTitleStyle = {
    marginBottom: "8px",
  };
  return (
    <>
      <Header />
      <Paper style={cardStyle}>
        <Typography variant="h5" style={sectionTitleStyle}>
          Task Details
        </Typography>
        <Grid>
          <Typography variant="body1">ID: {id}</Typography>
          <Typography variant="body1">Title: {title}</Typography>
          <Typography variant="body1">Description: {description}</Typography>
          <Typography variant="body1">Price: {price} $</Typography>
        </Grid>

        <Typography variant="h6">Payment Options:</Typography>

        <CheckoutButton
          order={{ id, title, description, price }}
          onSuccess={(response) => console.log("check response", response)}
        />
      </Paper>
    </>
  );
};

export default CheckoutPage;
