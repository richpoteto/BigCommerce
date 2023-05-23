import React, { useCallback, useMemo, useReducer, useState } from "react";

export const CART_VIEW = "CART_VIEW"
export const CUSTOMER_VIEW = "CUSTOMER_VIEW"
export const SHIPPING_VIEW = "SHIPPING_VIEW"
export const BILLING_VIEW = "BILLING_VIEW"

export const VIEWS = {
    CART_VIEW,
    CUSTOMER_VIEW,
    SHIPPING_VIEW,
    BILLING_VIEW
}

const initialState = {
    sideBarView: VIEWS.CART_VIEW,
    displaySidebar: false,
    displayModal: false,
    token: ""
}

export const UIContext = React.createContext(initialState);

function uiReducer(state, action){
    switch (action.type) {
        case 'OPEN_SIDEBAR': {
            return {
              ...state,
              displaySidebar: true,
            }
          }
          case 'CLOSE_SIDEBAR': {
            return {
              ...state,
              displaySidebar: false,
            }
          }
          case 'SET_SIDEBAR_VIEW': {
            return {
              ...state,
              sideBarView: action.view,
            }
          }
          case 'OPEN_MODAL': {
            return {
              ...state,
              displayModal: true,
              displaySidebar: false,
            }
          }
          case 'CLOSE_MODAL': {
            return {
              ...state,
              displayModal: false,
            }
          }
          case 'SET_MODAL_VIEW': {
            return {
              ...state,
              modalView: action.view,
            }
          }
          default:
              return state
    }
}

export const UIProvider = ({ token, ...rest}) => {
    const [state, dispatch] = useReducer(uiReducer, initialState);

    const setSidebarView = useCallback(
        (view) => dispatch({ type: 'SET_SIDEBAR_VIEW', view }),
        [dispatch]
      )

    const openSidebar = useCallback(
        () => dispatch({ type: 'OPEN_SIDEBAR' }),
        [dispatch]
    )
    const closeSidebar = useCallback(
        () => dispatch({ type: 'CLOSE_SIDEBAR' }),
        [dispatch]
    )
    const toggleSidebar = useCallback(
        () =>
            state.displaySidebar
            ? dispatch({ type: 'CLOSE_SIDEBAR' })
            : dispatch({ type: 'OPEN_SIDEBAR' }),
        [dispatch, state.displaySidebar]
    )
    const openModal = useCallback(
      () => dispatch({ type: 'OPEN_MODAL' }),
      [dispatch]
    )
    const closeModal = useCallback(
      () => dispatch({ type: 'CLOSE_MODAL' }),
      [dispatch]
    )


    const value = useMemo(
        () => ({
            ...state,
            setSidebarView,
            openSidebar,
            closeSidebar,
            toggleSidebar,
            openModal,
            closeModal,
            token
        }),
        [state]
    )

    return <UIContext.Provider value={value} {...rest} />
}

export const useUI = () => {
    const context = React.useContext(UIContext)
    if (context === undefined) {
        throw new Error(`useUI must be used within a UIProvider`)
      }
      return context
}

