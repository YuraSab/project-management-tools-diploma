import React from "react";
// handler for form states. Left for later
export const createFormChangeHandler = <T extends Record<string, any>>( 
    setState: React.Dispatch<React.SetStateAction<T>>
) => {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setState((prev) => ({ ...prev, [name]: value }));
    }
};