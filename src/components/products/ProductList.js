import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { bindActionCreators } from 'redux';
import * as productActions from "../../redux/actions/productActions"
import { Table } from 'reactstrap'
import * as cartActions from "../../redux/actions/cartActions"
import alertify from "alertifyjs"
import {Link} from "react-router-dom"

class ProductList extends Component {


    componentDidMount() {
        this.props.actions.getProducts();
    }

    addToCart = (product) => {
        this.props.actions.addToCart({ quantity: 1, product })
        alertify.success(product.productName + " eklendi")
    }


    render() {
        return (
            <div>

                <h5> Ürünler : </h5> <h6> <i>  {this.props.currentCategory.categoryName} </i> </h6>

                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ürün Adı</th>
                            <th>Birim Fiyat</th>
                            <th>Birim Başına Miktar</th>
                            <th>Stoktaki Birim</th>
                            <th>Sepet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.products.map(product => (

                            <tr key={product.id}>
                                <th scope="row"> {product.id} </th>
                                <td> <Link to={ "/saveproduct/"+product.id} > {product.productName} </Link> </td>
                                <td> {product.unitPrice} </td>
                                <td> {product.quantityPerUniy} </td>
                                <td>  {product.unitsInStock} </td>
                                <td>
                                    <Button color="success" onClick={() => this.addToCart(product)}>
                                        Sepete Ekle
                                    </Button>
                                </td>
                            </tr>

                        ))}


                    </tbody>
                </Table>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentCategory: state.changeCategoryReducer,
        products: state.productListReducer
    };
}


function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getProducts: bindActionCreators(productActions.getProducts, dispatch),
            addToCart: bindActionCreators(cartActions.addToCart, dispatch)
        }

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);