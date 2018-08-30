import _products from './products.json';

export default function getProducts() {

    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve(_products);
        }, 2000);
    });

}
