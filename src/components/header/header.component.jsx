import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
// name export
import CartIcon  from '../cart-icon/cart-icon.component.jsx';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';
import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="Logo"/>
        </Link>
        <div className="options">
            <Link className="option" to="/shop">
                SHOP
            </Link>
            <Link className="option" to="/signin">
                CONTACT
            </Link>
            {
            currentUser ? (
                <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
            ) : (
                <Link className="option" to="/signin">SIGN IN</Link>
            )}
            <CartIcon/>
        </div>
        
        { hidden ? null : <CartDropDown/> }
    </div>
);

// allows to access the state - root reducer
// mapStateToProps can be any name
// we get 'state' object which is the root reducer
// instead of (state) you can add nested values. Get this user which is destructed from usrr
const mapStateToProps = ({user: { currentUser }, cart: { hidden }}) => ({
    // name of property the same as passed on Header
    // 'state.user' FROM root-reducer.js, 'currentUser' from user.reducer.js
    currentUser,
    hidden
});
export default connect(mapStateToProps)(Header);