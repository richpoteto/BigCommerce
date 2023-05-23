import React, { useState } from 'react';
import { useRemoveItem, useUpdateItem } from '../../hooks'
import formatMoney from '../../utils/formatMoney';

const LineItem = ({ item }) => {
    
    const [removing, setRemoving] = useState(false)
    const [quantity, setQuantity] = useState(item.quantity)
    const { updateItem, error: updateError } = useUpdateItem({ item })
    const { removeItem, error: removeError } = useRemoveItem({ item })

    const error = (updateError || removeError)?.message

    const normalizeUrl = `/` + item.url.split('/')[3]

    const increaseQuantity = (n = 1) => {
        const val = Number(quantity) + n
        updateItem({
            quantity: val
        })
    }


    const handleRemove = () => {
        setRemoving(true)
        setTimeout(() => {
            removeItem(item)
            
        }, 500);
        setRemoving(false)
        if (removeError){
            setRemoving(false)
        }
    }

    return (
        <div className={
            `line-item${removing ? " removing" : ""}`
        }>
            <div className="flex-row">
            
            <div className="item-img">
                <a href={normalizeUrl}>
                    <img src={item.imageUrl} />
                </a>
                
            </div>

            <div className="item-body">
                <span>
                    <a href={normalizeUrl}>
                    {item.name}
                    </a>
                </span>
                <span className="item-single-price">
                    {
                        formatMoney(
                            (item.salePrice) * 100
                        )
                    }
                </span>
                
                
                
            </div>
                
            </div>

                {
                    item?.options?.length > 0 && (
                        <div className="item-options">
                            <span>Configuration</span>
                            <ul>
                            {
                                item?.options?.map(option => (
                                    <li key={JSON.stringify(option)} className="item-option">
                                        <span>{option.name}:</span>
                                        <span>{option.value}</span>
                                    </li>
                                ))
                            }
                            </ul>
                        </div>
                    )
                }
                
                {error && (
                    <div className="cart-error">
                        <span>
                            {error}
                        </span>
                    </div>
                )}
                <div className="item-actions">
                    <div className="qty-selection">
                        <div>
                            <button
                                onClick={() => increaseQuantity(-1)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
</svg>
                            </button>
                        </div>
                        <div className="item-qty">
                            Qty: {item.quantity}
                        </div>

                        <div>
                            <button
                                onClick={() => increaseQuantity(1)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
</svg>
                            </button>
                        </div>
                    </div>
                    
                    
                    <div className="flex">
                        <div className="item-price">
                            {
                                formatMoney(
                                    (item.salePrice * item.quantity) * 100
                                )
                            }
                        </div>
                        <div className="item-remove">
                        <button onClick={handleRemove}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
   
                    </div>
                    </div>
                </div>

            
        </div>
    )
}

export default LineItem;
