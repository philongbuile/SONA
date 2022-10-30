import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState("");
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const abortCont = new AbortController();
  
      setTimeout(() => {
        fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          signal: abortCont.signal,
          restRequestTimeout: 60000
        })
        .then(res => {
          if (!res.ok) { // error coming back from server
            throw Error('could not fetch the data for that resource');
          } 
          return res.json();
        })
        .then(data => {
          setIsPending(false);
          setData(data);
          setError(null);
        })
        .catch(err => {
          if (err.name === 'AbortError') {
            console.log('fetch aborted')
          } else {
            // auto catches network / connection error
            setIsPending(false);
            setError(err.message);
          }
          console.log(err)
        })
      }, 1000);
  
      // abort the fetch
      return () => abortCont.abort();
    }, [url])
  
    return { data, isPending, error };
  }
   
  export default useFetch;