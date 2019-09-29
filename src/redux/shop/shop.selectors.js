import { createSelector } from 'reselect';

// initial input selector
const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

// export object into array

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    // gets all keys of object passed in and gives as an array
    collections => Object.keys(collections).map(key => collections[key])
)

export const selectCollection = collectionUrlParam => 
    createSelector(
        [selectCollections],
        collections => collections[collectionUrlParam]
    )