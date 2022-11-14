import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState("");
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch(url, { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
        
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
        console.log(err);
      })
    }, [url]);

    return { data, isPending, error };
  }
   
  export default useFetch;