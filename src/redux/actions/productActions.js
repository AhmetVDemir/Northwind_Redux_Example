import * as actionTypes from "./actionTypes"


export function getProductSuccess(products) {
    return { type: actionTypes.GET_PRODUCT_SUCCESS, payload: products }
}

export function createProductSuccess(product) {
    return { type: actionTypes.CREATE_PRODUCT_SUCCESS, peyload: product }

}

export function updateProductSuccess(product) {
    return { type: actionTypes.UPDATE_PRODUCT_SUCCESS, peyload: product }

}

export function saveProductApi(product) {

    //The Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses

    //post işlemi için fetch kullandık, gelen product un id si var ise onuda ekle(update için), yoksa bir şey ekleme (yenisini eklemek için)
    return fetch("http://localhost:3000/products/" + (product.id || ""), {
        method: product.id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(product)
    }).then(handleResponse).catch(handleError);


}

export function saveProduct(product) {
    return function (dispatch) {
        return saveProductApi(product).then(savedProduct => {
            product.id ? dispatch(updateProductSuccess(savedProduct)) : dispatch(createProductSuccess(savedProduct)).catch(error => { throw error })
        })
    }
}

export function getProducts(categoyId) {
    return function (dispatch) {
        let url = "http://localhost:3000/products"
        if (categoyId) {
            url = url + "?categoryId=" + categoyId
        }

        return fetch(url).then(response => response.json()).then(result => dispatch(getProductSuccess(result)))
    }
}

export function handleError(error){
    console.error("Bir API hatası oluştu")
    throw error; 
     
}


export async function handleResponse(response){
    if(response.ok){
        return response.json()
    }

    const error=await response.text()
    throw new Error(console.error())
}