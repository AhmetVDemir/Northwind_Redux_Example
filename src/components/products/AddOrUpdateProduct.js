import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getCategories } from "../../redux/actions/categoryActions"
import { saveProduct } from "../../redux/actions/productActions"
import ProductDetails from "./ProductDetail";

function AddOrUpdateProduct({ products, categories, getProducts, getCategories, saveProduct, history, ...props }) {

    //bu syntax, statetteki product ı setProduct fonksiyonu ile set edebilirim demek 
    const [product, setProduct] = useState(...props.product);

    useEffect(() => {
        if (categories.length === 0) {
            getCategories()
        }

        setProduct({ ...props.product });
    }, [props.product]);

    function handleChang(event) {
        const { name, value } = event.target;
        setProduct(previousProduct => ({
            ...previousProduct,
            [name]: name === "categoryId" ? parseInt(value, 10) : value
        }))
    }

    function handleSave(event) {
        event.preventDefault();
        saveProduct(product).then(() => {
            history.push("/")
        })
    }


    return (
        <ProductDetails product={product} categories={categories} onChange={handleChang} onSave={handleSave} />
    )

}


export function getProductById(products, productId) {
    let product = products.find(product => product.id === productId) || null
    return product

}



function mapStateToProps(state, ownProps) {

    //git kendi parametrelerini bak productId varsa al
    const productId = ownProps.match.params.productId;
    const product = productId && state.productListReducer.length > 0 ? getProductById(state.productListReducer, productId) : {}

    return {
        product,
        products: state.productListReducer,
        categories: state.categoryReducer
    }
}

const mapDispatchToProps = {

    getCategories, saveProduct

}


export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct)