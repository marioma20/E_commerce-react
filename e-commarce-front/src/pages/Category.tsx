import React from 'react';
import useCategories from '@hooks/useCategories';
import { Container } from 'react-bootstrap';
import Heading from '../components/common/Header/heading';
import { Grid_List } from '@components/common/Header';
import { Loading } from '@components/feedback/layout';
import Categories from '@components/ecommerce/headerbasket/categories/Categories';
function Category() {
  const {loading, error ,records} = useCategories();
  return (
     <Container>
      <Heading title={`Categories`}></Heading>
      <Loading loading={loading} error={error} type='Categories'>
        <Grid_List records={records} renderitem ={(record)=> <Categories {...record} />} emptyMessage='There Are No Categories'/>;
      </Loading>
  </Container>
  )
}

export default Category;
