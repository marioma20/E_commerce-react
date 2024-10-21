import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { actGetOrder, resetOrderStatus } from '@store/orderSlice/OrderSlice';
import { TProduct } from '@types';

const useOrder =() =>{
    const disputch = useAppDispatch();

    const {loading, error, orderList} = useAppSelector((state)=>state.OrderReducer);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);
  
    const viewDetailsHandler = (id: number) => {
      const productDetails = orderList.find((order) => order.id === id);
      const newItems = productDetails?.items ?? [];
  
      setShowModal(true);
      setSelectedProduct((prev) => [...prev, ...newItems]);
    };
  
    const closeModalHandler = () => {
      setShowModal(false);
      setSelectedProduct([]);
    };
  
    useEffect(()=>{
  
     const promise = disputch(actGetOrder());
  
     return ()=>{
      promise.abort();
      disputch(resetOrderStatus());
     }
  
    }, [disputch]);

    return {
        loading, 
        error,
        orderList,
        showModal,
        selectedProduct,
        viewDetailsHandler,
        closeModalHandler
    }

}

export default useOrder;
