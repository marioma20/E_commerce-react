import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import actGetProduct from '@store/act/ActProduct';
import { cleanup } from '@store/product/productSlice';
import { useEffect } from 'react';

const useProduct =() => {
    const params = useParams();

    const productPrefix = params.prefix;

    const disputch = useAppDispatch();
  
    const {loading, error, records} = useAppSelector((state)=>state.productReducer);
  
    const cartItems = useAppSelector((state) => state.cartReducer.items);
  
    const wishlistItemId = useAppSelector((state)=>state.WishListReducer.itemsId);

    const userAccessToken = useAppSelector((state) => state.AuthReducer.accessToken);

  
    useEffect(()=>{

      const promise = disputch(actGetProduct(params.prefix as string));
  
      // disputch(actGetProduct(params.prefix as string));
          return ()=>{
            disputch(cleanup());
            promise.abort();
          }

      }, [disputch, params]);
  
    const productsFullInfo = records.map((el) => ({...el,quantity: cartItems[el.id] || 0,
      isLiked:wishlistItemId.includes(el.id) ,
      isAuthenticated: userAccessToken ? true : false,
    }));
  return { loading, error, productsFullInfo, productPrefix};
}

export default useProduct;
