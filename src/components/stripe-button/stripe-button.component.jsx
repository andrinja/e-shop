import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ( { price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_qZbbg8DzcDWtkVHTgtqdMpIR00ILikZa9Y';

    const onToken = token => {
        console.log(token);
        alert('Payment successful');
    }
    // https://github.com/azmenak/react-stripe-checkout
    return (
        <StripeCheckout
            label="Pay now"
            name="CRWN Clothing"
            billingAddress
            shippingAddress
            image="https://sendeyo.com/up/d/f3eb2117da"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay now"
            token={onToken}
            stripeKey={publishableKey}
        />
    )
};

export default StripeCheckoutButton;