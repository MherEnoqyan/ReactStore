const initialState = '';

const filterProducts = (state = initialState, action) => {
    switch (action.type) {
        case 'FIND_PRODUCTS':
            return action.payload;
        default:
            return state;
    }
};

export default filterProducts;
