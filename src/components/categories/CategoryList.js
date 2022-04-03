import React, { Component } from 'react'
import { connect } from "react-redux"
import { ListGroup, ListGroupItem } from 'reactstrap'
import { bindActionCreators } from "redux"
import * as categoryActions from "../../redux/actions/categoryActions"
import * as productActions from "../../redux/actions/productActions"


class CategoryList extends Component {

    componentDidMount() {
        this.props.actions.getCategories()
    }


    selectCategory = (category)=>{
        this.props.actions.changeCategory(category)
        this.props.actions.getProduct(category.id)

    }

    render() {
        return (
            <div>
                <h4>
                    <ListGroup>
                        {
                            this.props.categories.map(category => (

                                <ListGroupItem active={category.id === this.props.currentCategory.id} onClick={() => this.selectCategory(category) } key={category.id}>

                                    {category.categoryName}

                                </ListGroupItem>

                            ))
                        }

                    </ListGroup>
                </h4>
                <br />
            </div>
        )
    }
}

//state i bağla
function mapStateToProps(state) {
    return {
        currentCategory: state.changeCategoryReducer,
        categories: state.categoryListReducer
    }

}

//aksiyonu bağla
function mapDispatchToProps(dispatch) {

    return {
        actions: {
            getCategories: bindActionCreators(categoryActions.getCategories, dispatch),
            changeCategory: bindActionCreators(categoryActions.changeCategory, dispatch),
            getProduct:bindActionCreators(productActions.getProducts,dispatch)
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)