import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { actgetproductbyitems } from '@store/cart/cartSlice';
import { cleanCartProductFullInfo } from '@store/cart/cartSlice';
import { cartItemChangeQuantity } from '@store/cart/cartSlice';
import { cartItemRemove } from '@store/cart/cartSlice';
import { resetOrderStatus } from '@store/orderSlice/OrderSlice';
const useCart=()=> {
    const dispatch = useAppDispatch();

    const { items, productFullInfo, loading, error } = useAppSelector(
      (state) => state.cartReducer
    );
    const userAccessToken = useAppSelector((state) => state.AuthReducer.accessToken);

    const placeOrderStatus = useAppSelector((state)=>state.OrderReducer.loading)
  
    const products = productFullInfo.map((el) => ({
      ...el,
      quantity: items[el.id],
    }));
  
    const changeQuantityHandler = useCallback(
      (id: number, quantity: number) => {
        dispatch(cartItemChangeQuantity({ id, quantity }));
      },
      [dispatch]
    );
  
    const removeItemHandler = useCallback(
      (id: number) => {
        dispatch(cartItemRemove(id));
      },
      [dispatch]
    );
    useEffect(() => {
      const promise = dispatch(actgetproductbyitems());
      return()=>{
        promise.abort();
        dispatch(cleanCartProductFullInfo());
        dispatch (resetOrderStatus());
      }
    }, [dispatch]);

  return {loading, error, productFullInfo, products, changeQuantityHandler, removeItemHandler, userAccessToken, placeOrderStatus};
}

export default useCart
