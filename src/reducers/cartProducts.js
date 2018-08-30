const initialState = JSON.parse(localStorage.getItem('cartProducts')) || {products: [], totalCount: 0, totalAmount: 0};

const cartProducts = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
        case 'DELETE_FROM_CART':
            return action.payload;
        case 'CLEAR_CART':
            return {products: [], totalCount: 0, totalAmount: 0};
        default:
            return state;
    }
};

export default cartProducts;
