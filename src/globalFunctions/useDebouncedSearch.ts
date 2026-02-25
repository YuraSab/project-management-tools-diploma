import { useEffect } from "react";

export function useDebouncedSearch(
    value: string,
    delay: number,
    callback: () => void
) {
    useEffect(() => {
        const handler = setTimeout(() => {
            if (value.trim() !== "") 
                callback();
        }, delay);
        
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay, callback]);
}