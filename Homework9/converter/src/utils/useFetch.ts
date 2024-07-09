import {useEffect, useState} from "react";

export const useFetch = (url: string) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            setData(data);
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, [url]);

    return {data, error};
}