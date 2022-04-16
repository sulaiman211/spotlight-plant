import axios from 'axios';

// action type
const ADD_TO_CART = 'ADD_TO_CART';
const FETCH_CART = 'FETCH_CART';

// action creator
const _addToCart = (cart) => {
  return {
    type: ADD_TO_CART,
    cart,
  };
};
const _fetchCart = (cart) => {
  return {
    type: FETCH_CART,
    cart,
  };
};
// thunk creator
// create new cart
export const addCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/users/${userId}/cart`);
      dispatch(_addToCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};
