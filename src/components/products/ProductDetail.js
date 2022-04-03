import { Button } from "bootstrap"
import React from "react"
import TextInput from "../toolbax/TextInput"


const ProductDetails = (categories, product, onSave, onChange) => {

    return (
        <form onSubmit={onSave}>
            <h2>{product.id ? "Güncelle" : "Ekle"}</h2>

            <TextInput name="productName" label="Product Name" value={product.productName} onChange={onChange} error="Hata " />

            <Button type="submit" className="btn btn-success" > Kaydet </Button>

        </form>
    )

}

export default ProductDetails;