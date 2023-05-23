import React, { useState } from "react";
import formatMoney from "../../utils/formatMoney";
import StyledPromotion from "./StyledPromotion";

//Amount needed for free shipping
const FREE_SHIPPING = 100

const calculateProgress = (subtotal) => {
    const percent = Math.round((subtotal / FREE_SHIPPING) * 100);
    if (percent > 100) {
        return 100
    } else {
        return percent
    }
}
const CartPromotion = ({
    subtotal
}) => {
    
    const percent = calculateProgress(subtotal);
    const [toolTipActive, setToolTipActive] = useState(false);

    const val = FREE_SHIPPING - subtotal;

    return (
        <StyledPromotion>
            <div className="shipping-bar">
                <div
                    style={{ width: `${percent}%`}} 
                    className="shipping-progress">

                </div>

                <div
                    data-tooltip={`
                        All orders $${FREE_SHIPPING} and up get free shipping!
                    `}
                    onMouseEnter={() => setToolTipActive(true)}
                    onMouseLeave={() => setToolTipActive(false)}
                    className={`shipping-tooltip ${toolTipActive ? 'active' : 'disabled'}`}
                >
                    <div
                        style={{ 
                            color: `${percent === 100 ? 'var(--primary-color)' : ''}`,
                            ...(percent === 100 && {
                                left: "-50px"
                            })
                        }}
                        className="tooltip-label">
                        {percent === 100 ? (
                            <>
                            You unlocked free shipping!
                            </>
                        ): (
                            <>
                            You are {formatMoney(val * 100)} away from FREE shipping!
                            </>
                        )}
                    </div>
                    <div className="tooltip-circle">
                    </div>
                </div>
           </div>
           {
               percent === 100 && (
                   <div className="shipping-message">
                       Congratulations! You've unlocked free shipping on your order.
                   </div>
               )
           }


        </StyledPromotion>
    )
}

export default CartPromotion;
