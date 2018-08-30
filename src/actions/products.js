import getProducts from './query';

export const getAllProducts = () => dispatch => {
    getProducts()
        .then(
            response => dispatch({type: 'RECEIVE_PRODUCTS', payload: response}),
            error => console.log(`Rejected: ${error}`)
        );
};

