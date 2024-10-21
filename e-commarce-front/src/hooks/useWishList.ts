import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { actGetWishlist } from '@store/wishlist/WishListSlice';
import { productsFullInfoCleanUp } from '@store/wishlist/WishListSlice';

const useWishList =()  =>{
    const disputch = useAppDispatch();
    const {loading, error, productsFullInfo} =useAppSelector((state)=>state.WishListReducer);
    const cartItems = useAppSelector((state)=>state.cartReducer.items);


    useEffect(()=>{
       const promise = disputch(actGetWishlist("productsFullInfo"));
        return () => {
          promise.abort();
            disputch(productsFullInfoCleanUp());
          };
    }, [disputch]);

    const records = productsFullInfo.map((el) => ({
        ...el,
        quantity: cartItems[el.id],
        isLiked: true,
        isAuthenticated: true,

      }));
  return {loading, error, records, productsFullInfo};
}

export default useWishList;
