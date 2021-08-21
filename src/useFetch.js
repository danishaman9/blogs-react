import { useState, useEffect } from "react";

const useFetch = (url) => {
    const abortConstant = new AbortController();

    const [data, setData] = useState(null);

    const [isPending, setIsPending] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url, { signal: abortConstant.signal })
            .then(res => {
                console.log(res); 
                if(!res.ok) {
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if(err.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {
                    setIsPending(false);
                    setError(err.message);
                }
            })

            return () => abortConstant.abort();
    }, [url]);

    return { data, isPending, error }
}

export default useFetch;