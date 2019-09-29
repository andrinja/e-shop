import React from 'react';
import './collection.styles.scss';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

const CollectionPage = ({ collection }) => {
    const { title, items } = collection;
    //console.log(match.params.collectionId)
    return (
        <div className="collection-page">
            <h2 className="title">{ title }</h2>
            <div className="items">
                {
                    items.map(item => (
                        <CollectionItem key={ item.id } item={ item }/>
                    ))
                }
            </div>
        </div>
    )
}

// 'ownProps' is the props which is from component wrapped in connect
const mapStateToProps = (state, ownProps) => ({
    //'state' is neccesary because this selector needs a part of the state depending on URL param
    // still get match prop because ownProps has access to the ShopPage route
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})
export default connect(mapStateToProps)(CollectionPage);