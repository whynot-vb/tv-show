import React from "react";
import Paper from "@mui/material/Paper";
import errorImage from "../../images/error-404.webp";

const Error = () => {
  return (
    <Paper sx={{ width: "90%" }}>
      <img src={errorImage} alt="error" />
    </Paper>
  );
};

export default Error;
