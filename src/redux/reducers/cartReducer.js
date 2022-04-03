import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"

export default function cartReducer(state = initialState.cart, action) {

    switch (action.type) {
        case actionTypes.ADD_TO_CART:

            //daha önce sepette var mı ?
            var addedItem = state.find(c => c.product.id === action.payload.product.id);
            //eğer listede addedItem varsa
            if (addedItem) {
                //o zaman mevcut elemanın quantitisisin 1 artır; (ilgilii nesnenin(referans tip) referansını değiştirmelisin, aksi taktirde state değişmemiş kabul edilir.<ilk referansa dönme şansı verir bu ayrıca>)
                var newState = state.map(cartItem => {
                    if (cartItem.product.id === action.payload.product.id) {

                        //bulunan nesne eğer var ise quantity i bir artırmak gerekli, assign'ın ilk parantezi{} copy anlamına gelir,2.si nesne 3. sü quantity sayısı
                        return Object.assign({}, addedItem, { quantity: addedItem.quantity + 1 }) // gezilen her bir obje için olan return
                    }
                    return cartItem; //map in returnu, dolaşıp bulduğu ne kadar şey varsa hepsini diziye atar(newState)
                })

                return newState; //state için kullanılan return
            } else {
                // (...state) : state 'in bir kopyasını al (...action.payload): action ile gelen payload ı ekle bir kopyasını alarak ekleme yapar redux ta push pop operasyonları yapılmaz referanslar view render için şarttır
                return [...state, { ...action.payload }]
            }

        case actionTypes.REMOVE_FROM_CART:
            const newState2 = state.filter(cartItem => cartItem.product.id !== action.payload.id);
            return newState2;

        default:
            return state;
    }

}