import React, { useEffect, useState } from 'react';
import { setproducts } from '../../store/products';
import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-redux-dom';

const AllProducts = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => {
    console.log('hellllllooooo' state.products)
    return state.products;
  }) || [];
  
  useEffect(() => {
    dispatch(setproducts());
  }, []);
  return (
    <div>
      {products === undefined || products === []
        ? 'No Product'
        : products.map((product) => {
            return (
              <div>
                <div>
                  <img src={product.imageURL} class="mask" />
                  <div>{product.name}</div>
                  <p>{product.description}</p>

                  <div>
                    <Link to={`/products/${product.id}`} class="button">
                      View Product
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
}
export default AllProducts;