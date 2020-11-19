export const initialState={
    cart:[],
    user:null
}

export const actionType={
    ADD_TO_CART: "ADD_TO_CART",
    SET_USER: "SET_USER",
    EMPTY_BASKET: "EMPTY_BASKET",
    REMOVE_FROM_CART: "REMOVE_FROM_CART"
}


const reducer=(state, action)=>{
    switch (action.type) {
        case actionType.ADD_TO_CART:
            return{
                ...state,
                cart: [...state.cart,action.item]
            }
        case actionType.SET_USER:
            return {
                ...state,
                user: state.user
            }
        case actionType.EMPTY_BASKET:
            return {
                ...state,
                cart: []
            }
        case actionType.REMOVE_FROM_CART:
            const index=state.cart.findIndex((cartItem)=>cartItem.id===action.id)
            let newCart=[...state.cart];

            //remove 1 item from the index that match above index condition
            if (index>=0){
                newCart.splice(index,1)
            }
            else{
                console.warn(`You can't remove the product (id: ${action.id} as its not in basket`)
            }
            return {
                ...state,
                cart: newCart
            }
    }
}
export default reducer
