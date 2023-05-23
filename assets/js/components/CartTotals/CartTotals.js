import React from 'react';
import StyledTotals from './StyledTotals';

const CartTotals = ( { data } ) => {

    return (
        <StyledTotals>

            <div className="cart-total-item">
                <span className="main-title">Subtotal</span>
                <b>${data?.cartAmount}</b>
            </div>
            <div className="cart-total-item">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
            </div>
            <div className="cart-total-item">
                <span>Estimated Shipping</span>
                <span>Calculated at checkout</span>
            </div>
            <div className="cart-total-item">
                <span>Total</span>
                <b>${data?.cartAmount}</b>
            </div>


        </StyledTotals>
    )
}

export default CartTotals;
