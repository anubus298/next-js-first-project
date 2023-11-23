"use client";
import { Backdrop, CircularProgress } from "@mui/material";
import { ColorRing } from "react-loader-spinner";

function loading() {
  return (
    <>
      <Backdrop
        sx={{ color: "#000000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </Backdrop>
      <div className="w-full h-screen "></div>
    </>
  );
}

export default loading;
