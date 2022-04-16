import React, { useEffect, useState } from 'react';
import { fetchSingleProduct } from '../../store/SingleProduct';
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

  const handleClick = () => {
    dispatch(addToCart(user.id, product, state));
  };

  const handleChange = (evt) => {
    setState(evt.target.value);
  };

  return (
    <div id="container">
      <div class="product-details">
        <h1>{product.name}</h1>

        <p class="information">{product.description}</p>

        <div class="control">
          <h3>Quantity:</h3>
          <input
            name="quantity"
            type="number"
            value={state}
            onChange={handleChange}
            min="1"
            max="10"
          />
          <br></br>
          <br></br>
          <button class="btn" onClick={() => handleClick()}>
            <span class="shopping-cart">
              <i></i>
            </span>
            <span class="buy">Add To Cart</span>
          </button>
        </div>
      </div>

      <div class="product-image">
        <img src={product.imageURL} width="300" height="300" />
        <div class="price">$ {product.price}</div>
      </div>
    </div>
  );
};

export default SingleProduct;
