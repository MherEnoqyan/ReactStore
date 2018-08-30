import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Basket extends Component {

    getList() {
        let products = this.props.cartProducts.products;
        let list = products.reduce((result, product, index) => {
            if (product) {
                result.push(
                    (<tr key={index}>
                        <td>{product.title}</td>
                        <td>${product.price}</td>
                        <td>{product.count}</td>
                        <td className="text-center">
                            <button onClick={this.deleteCartProduct.bind(this)} value={index}
                                    className="btn btn-danger">X
                            </button>
                        </td>
                    </tr>)
                );
            }
            return result;
        }, []);

        return list;
    }

    deleteCartProduct(e) {
        let idProduct = e.target.value;
        let cartProducts = Object.assign({}, this.props.cartProducts);
        cartProducts['totalCount'] -= cartProducts['products'][idProduct]['count'];
        cartProducts['totalAmount'] -= cartProducts['products'][idProduct]['count'] * cartProducts['products'][idProduct]['price'];
        delete cartProducts['products'][idProduct];
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        this.props.deleteCartProduct(cartProducts);
    }

    clearCartProducts() {
        localStorage.removeItem('cartProducts');
        this.props.clearCartProducts();
    }

    render() {
        let clearBtn;
        if (this.props.cartProducts.totalAmount == 0) {
            clearBtn = '';
        } else {
            clearBtn =
                <button onClick={this.clearCartProducts.bind(this)} className="btn btn-danger float-right">Clear
                    all</button>;
        }

        return (
            <div className="container">
                <header className="bg-light p-3 clearfix">
                    <Link className="my-2 float-left" to="/">Continue shopping</Link>
                    {clearBtn}
                </header>
                <table className="table table-bordered">
                    <tbody>
                    {this.getList()}
                    </tbody>
                </table>
                <p>Total: ${this.props.cartProducts.totalAmount}</p>
            </div>
        );
    }
}

export default connect(
    state => ({
        cartProducts: state.cartProducts
    }),
    dispatch => ({
        clearCartProducts: () => {
            dispatch({type: 'CLEAR_CART'});
        },
        deleteCartProduct: (product) => {
            dispatch({type: 'DELETE_FROM_CART', payload: product});
        }
    })
)(Basket);
