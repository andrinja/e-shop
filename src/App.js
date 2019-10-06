import React from 'react';

import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import CheckoutPage from './pages/checkout/checkout.component.jsx';

import Header from './components/header/header.component.jsx';
import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
// fire 1 time  and remove the code addCollectionAndDocuments because we want to add it programtically
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';
// Switch renders only one route 
class App extends React.Component {

  unsubscribeFromAuth = null;
  
  componentDidMount() {

    const { setCurrentUser, collectionsArray } = this.props;

      this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        //createUserProfileDocument(user);
        //this.setState({ currentUser: user });

        // check if db has been updated
        if(userAuth) {
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(onSnapshot => {
            setCurrentUser({
              id: onSnapshot.id,
              ...onSnapshot.data()  
            })
          });
        }
        setCurrentUser(userAuth);
        // .map will return only values we want to keep - title, items
        addCollectionAndDocuments('collections', 
                                  collectionsArray.map(({title, items}) =>  ({ title, items})))
      });
    }
    // to unsubscribe
  unsubscribeFromAuth() {
      this.unsubscribeFromAuth();
      console.log('hello')
    }

  render() {
    return (
      <div>
      <Header/>

      <Switch>
        <Route exact path='/' component={ HomePage }></Route>
        <Route path='/shop' component={ ShopPage }></Route>
        <Route exact path='/checkout' component={ CheckoutPage }></Route>
        <Route 
          exact 
          path='/signin' 
          render={() =>
            this.props.currentUser ? (
              <Redirect to='/' />
            ) : (
              <SignInAndSignUpPage/>
            )}
          ></Route>
      </Switch>
        
      </div>
    );
  }
}

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// });
const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  // goes to function get user object, sends to dispatch that returns action objects
  // use 'user' that will be used as the payload
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
// NULL - no need to have a state from reducer
export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(App);
