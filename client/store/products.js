import axios from 'axios';

// action type
const SET_PRODUCTS = 'SET_PRODUCTS';

// action creator

const _setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

// thunks creator 
export const setproducts = () => {
  return async (dispatch) => {
    try {
      const {data: products } = await axios.get('api/products');
      dispatch(_setProducts(products));
    } catch (error) {
      console.log(error)
    }
  };
};
// reducers
let intialState = [];
export default function productsReducer(state = intialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state;
  }
}