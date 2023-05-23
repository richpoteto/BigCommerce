import React, { useEffect } from "react";
import { UIProvider } from "./UI/UIContext";

import { QueryClient, QueryClientProvider } from "react-query";
import SideCart from "./Cart";
import CartPromotionWrapper from "./CartPromotion/CartPromotionWrapper";
import { Toaster } from 'react-hot-toast';


export const queryClient = new QueryClient();
const cartPagePromotion = document.querySelector("#cart-promo")

const App = ({token}) => {
    return (
        
        <QueryClientProvider client={queryClient}>
            <UIProvider token={token}>
                <SideCart />
                {cartPagePromotion && (
                    <CartPromotionWrapper
                        element={cartPagePromotion}
                    />
                )}
            </UIProvider>
            <Toaster />
        </QueryClientProvider>
    )
}

export default App;
