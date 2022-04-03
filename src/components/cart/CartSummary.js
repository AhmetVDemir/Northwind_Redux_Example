import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap'
import { bindActionCreators } from 'redux';
import * as cartActions from "../../redux/actions/cartActions"
import { Link } from "react-router-dom"
import alertify from "alertifyjs"

class CartSummary extends Component {


    renderEmty() {
        return (
            <NavItem>
                <NavLink>Sepetiniz Boştur</NavLink>
            </NavItem>

        );
    }

    removeFromCart(product) {
        this.props.actions.removeFromCart(product)
        alertify.error(product.productName + " çıkarıldı")

    }

    renderSummary() {
        return (

            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Sepetiniz
                </DropdownToggle>

                <DropdownMenu right>
                    {
                        this.props.cart.map(cartItem => (

                            <DropdownItem key={cartItem.product.id}>
                                <Badge color="danger" onClick={() => this.removeFromCart(cartItem.product)} > <b>X</b>  </Badge>
                                {cartItem.product.productName}
                                <Badge color="success" pill> <b> {cartItem.quantity} </b> </Badge>
                            </DropdownItem>

                        ))
                    }


                    <DropdownItem divider />
                    <DropdownItem>
                        <Link to="/cart">
                            Sepete Git -&gt;
                        </Link>
                    </DropdownItem>

                </DropdownMenu >

            </UncontrolledDropdown>

        );
    }
    render() {
        return (
            <div>
                {
                    this.props.cart.length > 0 ? this.renderSummary() : this.renderEmty()
                }
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
        }
    }
}

function mapStateToProp(state) {
    return {
        cart: state.cartReducer
    }

}

export default connect(mapStateToProp, mapDispatchToProps)(CartSummary);