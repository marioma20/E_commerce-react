import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import actGetCategories from '@store/act/Actcategories';
import { cleanupCtegories } from '@store/categories/CategoriesSlice';

const useCategories =() =>{
    const disputch = useAppDispatch();
  
    const {loading, error, records} = useAppSelector((state)=>state.categoriesReducer);
  
    useEffect(()=>{
      const promise = disputch(actGetCategories());
  
      return ()=>{
        promise.abort();
        disputch(cleanupCtegories())
      }
    }, [disputch]);
   return {loading, error, records};
}

export default useCategories;
