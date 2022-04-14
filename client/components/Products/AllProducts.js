import React, { useEffect, useState } from 'react';
import { setProducts } from '../../store/products';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AllProducts = () => {
  const dispatch = useDispatch();

  const products =
    useSelector((state) => {
      return state.products;
    }) || [];

  useEffect(() => {
    dispatch(setProducts());
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      {products === undefined || products === []
        ? 'No Product'
        : products.map((product) => {
            return (
              <div >
                <div>
                  <img src={product.imageURL} class="mask" />
                  <div>{product.name}</div>
                  <p>{product.description}</p>
                  <div>{product.price}</div>
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
};

export default AllProducts;

