export const initialState={
    cart:[],
    user:null,
    addresss: [],
}

export const actionTypes={
    ADD_TO_CART: "ADD_TO_CART",
    SET_USER: "SET_USER",
    EMPTY_BASKET: "EMPTY_BASKET",
    REMOVE_FROM_CART: "REMOVE_FROM_CART",
    ADD_ADDRESS: "ADD_ADDRESS"
}

const reducers=(accum,current)=>{
    return accum + current.price
}
export const totalCartAmount=(cart)=>(
     cart?.reduce(reducers,0)
)

const subtract=(accum,current)=>{
    return accum - current.price
}

export const minusCartAmount=(cart)=>(
    cart?.reduce(subtract,0)
)

const reducer=(state, action)=>{
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            return{
                ...state,
                cart: [...state.cart,action.item]
            }
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            }
        case actionTypes.ADD_ADDRESS:
            return {
                ...state,
                addresss:[...state.addresss,action.item]
            }
        case actionTypes.EMPTY_BASKET:
            return {
                ...state,
                cart: []
            }
        case actionTypes.REMOVE_FROM_CART:
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
        default:
            return state
    }
}
export default reducer
