import React from 'react';
import useProduct from '@hooks/useProduct';
import { Grid_List } from '@components/common/Header';
import { Loading } from '@components/feedback/layout';
import Heading from '../components/common/Header/heading';
import Product from '@components/ecommerce/headerbasket/product/Product';
import { Container } from "react-bootstrap";


function Products() {
  const {loading, error, productsFullInfo, productPrefix} = useProduct();
  return (
    <Container>
      <Heading title={`${productPrefix}_Products`}></Heading>
      <Loading loading={loading} error={error} type='product'>
        <Grid_List records={productsFullInfo} renderitem ={(record)=>  <Product {...record}/> } emptyMessage='There Are No Product'/>
      </Loading>
  </Container>
  )
}

export default Products;
