import React from 'react';
import './collection-item.styles.scss';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';
//const CollectionItem = ({ id, name, price, imageUrl, addItem }) => (
// add explicit return on the function where return multiple js on object
const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;
    return (
    <div className="collection-item">
        <div className="image"
        style={{
            backgroundImage: `url(${imageUrl})`
        }}
        />
        <div className="collection-footer">
            <span className="name">{ name }</span>
            <span className="price">{ price }</span>
        </div>
        <CustomButton onClick={ () => addItem(item) } inverted>
            Add to cart
        </CustomButton>
    </div>
)}

const mapDispatchToProps = dispatch => ({
    // recived item and pass in item into addItem which gives back object
    addItem: item => dispatch(addItem(item))
})
// null because not taking any map state props
export default connect(null, mapDispatchToProps) (CollectionItem);