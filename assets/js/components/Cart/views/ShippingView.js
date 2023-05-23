import StencilUtils from "@bigcommerce/stencil-utils";
import React, { useEffect } from "react";
import { useForm, useGetCountry } from "../../../hooks";
import { useCreateConsignment } from "../../../hooks/checkout";
import Input from "../../UI/Input/Input";
import { useUI } from "../../UI/UIContext"


const ShippingView = ({
o
}) => {

    const { closeSidebar } = useUI();
    const { register, handleSubmit, formState: { errors, submitting } } = useForm();
    const { createConsignment } = useCreateConsignment();
    const { data } = useGetCountry("Canada");

    console.log(data)

    const onSubmit = (data) => createConsignment(data)

    return (
        <div className="cart-preview" >
            <div className="cart-preview_header">
                
                <div className="cart-preview_title">
                    SHIPPING
                </div>

                <div className="cart-preview_close">
                    <button className="close-btn" onClick={closeSidebar}>
                        <i className="fa fa-times" />   
                    </button>
                </div>
            </div>

            <div className="cart-preview_body">
                <div className="cartPreview-content">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input placeholder="Name" {...register("firstName", {
                            required: true
                        })} />
                        <input placeholder="Last Name" {...register("lastName")} />
                        <input placeholder="Email" {...register("email")} />
                        <input placeholder="Company" {...register("company")} />
                        <input placeholder="Address" {...register("address1")} />
                        <input placeholder="City" {...register("city")} />
                        <input placeholder="State" {...register("stateOrProvinceCode")} />
                        <input placeholder="Country Code" {...register("countryCode")} />
                        <input placeholder="Postal Code" {...register("postalCode")} />

                        <button type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>

                    
        </div>
    )
}

export default ShippingView;
