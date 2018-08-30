import {combineReducers} from 'redux';
import products from './products';
import filterProducts from './filterProducts';
import cartProducts from './cartProducts';

export default combineReducers({
    products,
    filterProducts,
    cartProducts
});

