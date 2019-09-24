import { createSelector } from 'reselect';

// input selector that doesnt use create selector
// output selector that use create and input selector
// this is memoization
const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    // pass argument
    [selectCart],
    cart => cart.cartItems
)

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden 
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
        cartItems =>
        cartItems.reduce(
            (accumalatedQuantity, cartItem) =>
                accumalatedQuantity + cartItem.quantity,
             0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accumalatedQuantity, cartItem) =>
                accumalatedQuantity + cartItem.quantity * cartItem.price,
             0)
)