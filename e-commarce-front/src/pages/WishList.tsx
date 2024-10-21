import React from 'react';
import useWishList from '@hooks/useWishList';
import { Loading } from '@components/feedback/layout';
import Grid_List from '@components/common/Header/Grid/Grid_List';
import Product from '@components/ecommerce/headerbasket/product/Product';
import { TProduct } from '@types';
import { Heading } from '@components/common/Header';


function WishList() {
  const {loading, error, records} = useWishList();
  return (
    <>
      <Heading title={`Your WishList`}></Heading>
      <Loading loading={loading} error={error} type="product">
        <Grid_List<TProduct>
          records={records}
          renderitem={(record) => <Product {...record} />}
          emptyMessage='Your WishList Is Empty'
        />
      </Loading>
    </>
  )
}

export default WishList;
