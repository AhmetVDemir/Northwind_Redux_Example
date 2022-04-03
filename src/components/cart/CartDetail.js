import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as cartActions from "../../redux/actions/cartActions"
import { Table,Button} from 'reactstrap'
import {Link} from "react-router-dom"
import alertify from "alertifyjs"


class CartDetail extends Component {

    removeFromCart(product ){
        this.props.actions.removeFromCart(product)
        alertify.error(product.productName + " çıkarıldı")

    }

    render() {
        return (
            <div>
                <h1>Sepetiniz</h1>
                <h3>
                    <Link to="/">
                        Ana sayfa
                    </Link>
                </h3>


                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ürün Adı</th>
                            <th>Birim Fiyat</th>
                            <th>Adedi</th>
                            <th/>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cart.map(cartItem  => (

                            <tr key={cartItem.id}>
                                <th scope="row"> {cartItem.id} </th>
                                <td> {cartItem.product.productName} </td>
                                <td> {cartItem.product.unitPrice} </td>
                                <td> {cartItem.product.quantity} </td>
                                <td>
                                    <Button onClick={()=>this.removeFromCart(cartItem.product)} color="danger">
                                        Sil
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


function mapDispatchToProps(dispatch){
    return{
        actions:{
             removeFromCart:bindActionCreators(cartActions.removeFromCart,dispatch)
        }
    }
}

function mapStateToProp(state) {
    return {
        cart: state.cartReducer
    }

}

export default connect(mapStateToProp,mapDispatchToProps)(CartDetail);
