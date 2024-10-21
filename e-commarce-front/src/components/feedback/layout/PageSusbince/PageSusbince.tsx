import React from 'react';
import LottieHandler from '../lottieHandler/LottieHandler';
import { Suspense } from "react";

const  PageSusbince =({ children }: { children: React.ReactNode }) =>{
  return (
    <>
    <Suspense
      fallback={
        <LottieHandler type="loading" message="loading please wait.." />
      }
    >
      {children}
    </Suspense>
    </>
  )
}

export default PageSusbince;
