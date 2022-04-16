import React, { useEffect, useState } from 'react';
import { fetchSingleProduct } from '../../store/singleProduct';
import { useDispatch, useSelector } from 'react-redux';

const SingleProduct = (props) => {
  const [state, setState] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const product =
    useSelector((state) => {
      return state.product;
    }) || [];

  useEffect(() => {
    dispatch(fetchSingleProduct(props.match.params.id));
  }, []);
  const handleChange = (evt) => {
    setState(evt.target.value);
  };

  return (
    <div id="container">
      <div>
        <img src={product.imageURL} class="mask" />
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <div>{product.price}</div>
      </div>
    </div>
  );
};
export default SingleProduct;
