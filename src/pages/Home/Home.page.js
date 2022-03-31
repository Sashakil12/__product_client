import { useQuery } from 'react-query';
import React from 'react'
import usePagination from '../../hooks/usePagination';
import {  getPublicProducts } from '../../reactQueryFunctions/publicProducts';

function Home() {
  
  const {limit, skip}=usePagination(20,0)
  const products = useQuery(["list_public_products", limit, skip], getPublicProducts, { retry: 3 });
  console.log(products.isLoading)
  return (
    <>Home page</>
  )
}

export default Home