import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';

import './header.styles.scss';

const Header = ({currentUser}) => (
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
            
        </div>
    </div>
);

// allows to access the state - root reducer
// mapStateToProps can be any name
// we get 'state' object which is the root reducer
const mapStateToProps = state => ({
    // name of property the same as passed on Header
    // state.user FROM root-reducer.js, currentUser from user.reducer.js
    currentUser: state.user.currentUser
});
export default connect(mapStateToProps)(Header);