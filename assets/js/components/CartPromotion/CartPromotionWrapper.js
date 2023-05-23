import React from "react";
import { createPortal } from "react-dom";
import CartPromotion from ".";
import { useCart } from "../../hooks";

const CartPromotionWrapper = ({ element }) => {
    const { data } = useCart();

    return createPortal(
        <CartPromotion subtotal={data?.baseAmount ?? 0} />,
        element
    )
}

export default CartPromotionWrapper;
