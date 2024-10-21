import React from 'react';
import { TLoading } from '@types';
import CategorySkeleton from '../skeletons/CategoriesSkeletons/CategoriesSkeletons';
import CartSkeleton from '../skeletons/cartSkeleton/CartSkeleton';
import LottieHandler from '../lottieHandler/LottieHandler';

const skeletonsTypes = {
  Categories: CategorySkeleton,
  product: CartSkeleton,
  cart: CartSkeleton,
  table: CartSkeleton,
};

type LoadingProps  = {
   loading: TLoading;
   error : null | string;
   children: React.ReactNode;
   type?: keyof typeof skeletonsTypes;
    // "cart"| "product" | "Categories"
}


const Loading =({loading, error, children, type = "Categories"}: LoadingProps) => {

  const Component = skeletonsTypes[type];
  if(loading === "pinding"){
    // <p>Loading Please Wait...</p>
      return <Component/> 
  }
  if(loading === "failed"){
      return <div><LottieHandler type="error" message={error as string}/></div>
  }
  return (
    <>
      {children}
    </>
  )
}

export default Loading;
