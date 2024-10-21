import React from 'react';
import Lottie from "lottie-react";
import notFound from "@assets/svg/lottieFile/Animation - 1727270269860.json";
import empty from "@assets/svg/lottieFile/empty.json";
import error from "@assets/svg/lottieFile/error.json";
import loading from "@assets/svg/lottieFile/loading.json"
import success from "@assets/svg/lottieFile/success.json";


const lottieFilesMap = {
    notFound,
    empty,
    loading,
    error,
    success,
  };

type LottieHandlerProps = {
    type: keyof typeof lottieFilesMap;
    message?: string;
    className?: string;
  };

const LottieHandler=({type, message, error, className}: LottieHandlerProps) =>{
    const lottie = lottieFilesMap[type];
    const messageStayle = type === "error" ? {fontSize:"19px", color:"red"} :{fontSize:"19px", marginTop: "30px"};
  return (
    <div className= {`d-flex flex-column align-items-center ${className}`}>
        <Lottie animationData={lottie} style={{width: "400px", marginBottom: "30px"}}/>
        {message && <h3 style={messageStayle}>{message}</h3>}
    </div>
  )
}

export default LottieHandler;
