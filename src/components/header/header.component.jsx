import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
// name export
import CartIcon  from '../cart-icon/cart-icon.component.jsx';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';
import { HeaderContainer, OptionsContainer, OptionLink, LogoContainer }from './header.styles';
const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className="Logo"/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop">
                SHOP
            </OptionLink>
            <OptionLink to="/signin">
                CONTACT
            </OptionLink>
            {
            currentUser ? (
                // also can pass in a component inside as="Logo"
                <OptionLink as="div" onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
            ) : (
                <OptionLink className="option" to="/signin">SIGN IN</OptionLink>
            )}
            <CartIcon/>
        </OptionsContainer>
        
        { hidden ? null : <CartDropDown/> }
    </HeaderContainer>
);

// allows to access the state - root reducer
// mapStateToProps can be any name
// we get 'state' object which is the root reducer
// instead of (state) you can add nested values. Get this user which is destructed from user {user: { currentUser }, cart: { hidden }}
const mapStateToProps = createStructuredSelector ({
    // name of property the same as passed on Header
    // 'state.user' FROM root-reducer.js, 'currentUser' from user.reducer.js
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});
export default connect(mapStateToProps)(Header);