import { useEffect, useRef } from "react"

const useOuterElement = (el, event = "click", onEvent) => {

    useEffect(() => {
        if (el) {
            if (NodeList.prototype.isPrototypeOf(el)) {
                if (Array.isArray(event) && Array.isArray(onEvent)){
                
                    event.forEach((e, index) => {
                        el.forEach(element => {
                            element.addEventListener(e, (ev) => onEvent[index](ev))
                        })
                    })
        
                    return () => {
                        event.forEach((e, index) => {
                            el.forEach(element => {
                                element.removeEventListener(e, (ev) => onEvent[index](ev))
                            })
                        })
                    }
                } else {
                    el.forEach(element => {
                        element.addEventListener(event, onEvent)
                    })
        
                    return () => {
                        el.forEach(element => {
                            element.removeEventListener(event, onEvent)
                        })
                    }
                }
            } else {
                if (Array.isArray(event) && Array.isArray(onEvent)){
                
                    event.forEach((e, index) => {
                        el.addEventListener(e, (ev) => onEvent[index](ev))
                    })
        
                    return () => {
                        event.forEach((e, index) => {
                            el.removeEventListener(e, (ev) => onEvent[index](ev))
                        })
                    }
                } else {
                    el.addEventListener(event, onEvent)
        
                    return () => {
                        el.removeEventListener(event, onEvent)
                    }
                }
            }
            
        }

    }, [])

    return el;
}

export default useOuterElement;
