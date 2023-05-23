import React from "react";
import LineItem from "../lineItem";

import { useUI, VIEWS } from "../../UI/UIContext"
import CartPromotion from "../../CartPromotion";
import CartTotals from "../../CartTotals";

const CartView = ({
    totalQuantity,
    data,
    setIsOpen,
    isLoading,
    error,
    addToCartError
}) => {

    const { closeSidebar, setSidebarView } = useUI();

    return (
        <div className="cart-preview" >
            <div className="cart-preview_header">
                
                <div className="cart-preview_title">
                    Your Cart
                </div>

                <div className="cart-preview_close">
                    <button className="close-btn" onClick={closeSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
</svg>
                    </button>
                </div>
            </div>

            <div className="cart-preview_body">
            <button className="continue" onClick={closeSidebar}>
                    Continue shopping
                </button>
                <CartPromotion subtotal={data?.baseAmount ?? 0}/>
                
                <div className="addToCartError">
                    {addToCartError}
                </div>
                <div className="cartPreview-content">
                    {
                        isLoading 
                        ? 
                            (
                                <p>Loading</p>
                            )
                        :
                            error ? "error" : ['physicalItems', 'digitalItems', 'giftCertificates'].map((keyType) => (
                                (data?.lineItems[keyType] || []).map(product => (
                                    <LineItem key={JSON.stringify(product)} item={product} />
                                )
                            )))
                    }
                </div>
                {totalQuantity > 0 && (
                    <div className="cart-preview_footer">

                    <CartTotals data={data}/>

                    <div className="cart-btn">
                        <a 
                            className="primary-btn"
                            href="/cart.php">
                            Cart
                        </a>
                        <a 
                            // onClick={(e) => {
                            //     e.preventDefault();
                            //     setSidebarView("SHIPPING_VIEW")

                            // }}
                            className="primary-btn checkout"
                            href="/checkout">
                            Checkout
                        </a>
                    </div>

                </div>
                )}

            </div>

                    
        </div>
    )
}

export default CartView;
