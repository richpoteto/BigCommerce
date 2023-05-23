import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
// import LineItem from './lineItem';
// import Totals from './totals';
// import TierStepper from './tierStepper'
import StyledCart from './StyledCart';
import { useUI, VIEWS } from '../UI/UIContext'
import CartView from './views/CartView';
import { useCart, useOuterElement  } from '../../hooks';
import { normalizeFormData } from '../../utils/normalizeForm';
import utils from '@bigcommerce/stencil-utils';
import CategoryView from './views/CategoryView';
import toast from 'react-hot-toast';



Modal.setAppElement('#app');

const customStyles = {
    content: {
      height: '100%',
      maxWidth: '400px',
      inset: '0 0 0 auto',
      border: '0px',
      width: "100%",
      boxShadow: "rgb(60, 51, 51) 0px 0px 15px 0px",
      padding: 0
    },
  };




const countItem = (count, item) => count + item.quantity

const Cart = () => {
    const { closeSidebar, displaySidebar, openSidebar, sideBarView, setSidebarView } = useUI();
    const { data, isLoading, error, isEmpty, refetch } = useCart();
    const [addToCartError, setAddToCartError] = useState(null)

    const cartBtn = useOuterElement(
        document.querySelector("#cart-btn"),
        "click",
        (e) => {
            e.preventDefault()
            setSidebarView(VIEWS.CART_VIEW)
            openSidebar()
        }
    )

    const addToCartBtn = useOuterElement(
        document.querySelector("#form-action-addToCart"),
        "click",
        (e) => {
            e.preventDefault()
            if (addToCartError) setAddToCartError("")
            const form = document.querySelector("form[data-cart-item-add]");
            const formData = normalizeFormData(new FormData(form))
            addToCartBtn.disabled = true;
            const initialVal = addToCartBtn.value
            addToCartBtn.value = "Loading"
            utils.api.cart.itemAdd(formData, (err, response) => {
                const errorMessage = err || response.data.error;
                if (errorMessage) {
                    setAddToCartError(errorMessage)
                }
                addToCartBtn.disabled = false;
                refetch()
                setSidebarView(VIEWS.CART_VIEW)
                openSidebar()
                addToCartBtn.value = initialVal
                
            })
        }
    )

    const allItems = data ? ["customItems", "digitalItems", "giftCertificates", "physicalItems"].flatMap(
        key => data?.lineItems[key]
    ) : []

    const totalQuantity = allItems.length > 0 ? allItems.reduce(countItem, 0) : 0

    useEffect(() => {
        const cartQty = document.querySelector("#cart-qty");
        if (cartQty){
            cartQty.innerHTML = totalQuantity
        }
    }, [totalQuantity])


    const sidenavBtn = useOuterElement(
        document.querySelector("#sidenav-toggle"), 
        "click",
        (e) => {
            e.preventDefault();
            document.querySelector("body").classList.toggle("sidenav-no-scroll")
            
            setSidebarView(VIEWS.CATEGORY_VIEW)
            openSidebar()
            
        }
    )

    useEffect(() => {
        const addFunc = (e) => {
            e.preventDefault()
            const { searchParams } = new URL(e.target.href)
            const productId = searchParams.get("product_id")
            const formData = new FormData()
            formData.append("product_id", productId)
            formData.append("qty[]", 1)
            formData.append("action", "add")
            utils.api.cart.itemAdd(formData, (err, response) => {
                if (!err) {
                    refetch()
                    if (window.matchMedia("(min-width: 992px").matches) {
                        setSidebarView(VIEWS.CART_VIEW)
                        openSidebar()
                    } else {
                        toast.success("Item added to cart")
                    }
                }
            })
            
        }
        document.querySelectorAll(".addCart").forEach(
            btn => btn.addEventListener("click", addFunc)
        )

        return () => {
            document.querySelectorAll(".addCart").forEach(
                btn => btn.removeEventListener("click", addFunc)
            )
        }
    }, [])


    return (	
        <Modal
            isOpen={displaySidebar}
            onRequestClose={() => {
                document.querySelector("body").classList.remove("has-activeNavPages")
                document.querySelector("body").classList.remove("sidenav-no-scroll")
                document.querySelector("#sidenav-toggle").classList.remove("is-open")
                closeSidebar()
            }}
            style={customStyles}
            id="cart-preview_wrap"
        >
            <StyledCart>
                {sideBarView === VIEWS.CART_VIEW && (
                    <CartView 
                        totalQuantity={totalQuantity} 
                        data={data} 
                        isLoading={isLoading} 
                        error={error}
                        addToCartError={addToCartError} 
                    />
                )}
                {sideBarView === VIEWS.CATEGORY_VIEW && (
                    <CategoryView />
                )}
                
            </StyledCart>           
        </Modal>
    )
}





export default Cart;
