import { useEffect, useRef, useState } from "react"

const useForm = () => {
    
    const [formState, setFormState] = useState({
        submitting: false,
        errors: []
    })
    
    const [subscriptions, setSubScriptions] = useState({})

    const fieldRef = useRef({})
    const fields = fieldRef.current

    const valuesRef = useRef({})
    const values = valuesRef.current
    
    const register = (name, options) => {
        return {
            ref: (ref) => {
                fields[name] = {
                    ref,
                    ...(options && options)
                }
                values[name] = ref?.defaultValue ?? ""
            },
            onChange: (e) => {
                values[name] = e.target.value
                
                if (subscriptions.hasOwnProperty(name)){
                    setSubScriptions(prev => ({
                        ...prev,
                        [name]: e.target.value
                    }))
                }
            }
        }
    }

    const handleSubmit = (func) => (e) => {
        if (e){
            e.preventDefault && e.preventDefault();
            e.persist && e.persist();
        }

        let errors = []

        Object.entries(fields).forEach(
            field => {
                if (field[1].required && !values[field[0]]){
                    errors.push({
                        [field[0]]: "This field is required"
                    })
                }
            }
        )

        if (errors.length > 0){
            setFormState(prev => ({
                ...prev, 
                submitting: false,
                errors: errors
            }))
            return
        }

        setFormState(prev => ({
            ...prev, 
            submitting: true
        }))
        


        try {
            func(values)
        } catch(e) {
            errors.push(e)
        }

        setFormState(prev => ({
            ...prev, 
            submitting: false,
            errors: errors
        }))
    }

    const subscribe = (name, func) => {
        if (!subscriptions.hasOwnProperty(name)) setSubScriptions(prev => ({...prev, [name]: "" }))

        func((subscriptions[name]) ?? "")
    }

    const unsubscribe = (name) => {
        if (subscriptions.hasOwnProperty(name)) {
            const draft = { ... subscriptions }
            delete draft[name]
            setSubScriptions(draft)
        }
    }



    return {
        subscribe,
        register,
        fields,
        handleSubmit,
        formState,
        unsubscribe
    }

}

export default useForm;
