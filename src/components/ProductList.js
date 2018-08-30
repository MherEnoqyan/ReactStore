import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class ProductList extends Component {

    getList() {
        let products = this.props.products;
        let list = products.map((product, index) =>
            (<tr key={index}>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td className="text-center">
                    <button onClick={this.buyProducts.bind(this)} value={index} className="btn btn-primary">Buy Now!
                    </button>
                </td>
            </tr>)
        );

        return list;
    }

    findProducts(e) {
        e.preventDefault();
        this.props.findProducts(this.searchInput.value);
    }

    buyProducts(e) {
        let idProduct = e.target.value;
        let cartProducts = Object.assign({}, this.props.cartProducts);
        let product = Object.assign({}, this.props.products[idProduct]);

        if (cartProducts['products'][idProduct]) {
            cartProducts['products'][idProduct]['count']++;
        } else {
            product['count'] = 1;
            cartProducts['products'][idProduct] = product;
        }

        cartProducts['totalCount']++;
        cartProducts['totalAmount'] += product['price'];

        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        this.props.addProductToCart(cartProducts);
    }

    render() {
        return (
            <div className="container">
                <header className="bg-light p-3 clearfix">
                    <form onSubmit={this.findProducts.bind(this)} className="form-inline float-left">
                        <input ref={(input) => {
                            this.searchInput = input
                        }} type="search" placeholder="Search" className="form-control"/>
                    </form>
                    <Link className="my-2 float-right" to="/basket">{this.props.cartProducts.totalCount} item(s) -
                        ${this.props.cartProducts.totalAmount}</Link>
                </header>
                <table className="table table-bordered">
                    <tbody>
                    {this.getList()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(
    state => ({
        products: state.products.filter(product => product.title.includes(state.filterProducts)),
        cartProducts: state.cartProducts
    }),
    dispatch => ({
        findProducts: (value) => {
            dispatch({type: 'FIND_PRODUCTS', payload: value});
        },
        addProductToCart: (product) => {
            dispatch({type: 'ADD_TO_CART', payload: product});
        }
    })
)(ProductList);
