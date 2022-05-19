import React from "react";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import Typography from "@mui/material/Typography";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <Typography sx={{ mb: 1.5 }} color="white">
        <AiOutlineCopyrightCircle style={{ marginTop: "10px" }} /> made by{" "}
        <a href="https://github.com/whynot-vb">why-not</a>
      </Typography>
      <br />
      <a href="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg">
        {" "}
        The Movie DB LOGO
      </a>
    </div>
  );
}
