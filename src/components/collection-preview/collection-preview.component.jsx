import React from 'react';
import './collection-preview.styles.scss';
import CollectionItem from '../collection-item/collection-item.component.jsx';

// functional component 

const CollectionPreview = ({ title, items }) => (
    <div className="collection-preview">
        <h1 className="title">{ title.toUpperCase() }</h1>
        <div className="preview">
            { items
                // .map(({id, ...otherItemProps})
                .filter((item, idx) => idx < 4)
                .map((item) => (
                <CollectionItem key={item.id} item={item}/>
            ))}
            
        </div>
    </div>
)
export default CollectionPreview;