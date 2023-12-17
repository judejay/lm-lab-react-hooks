import { useState, useEffect } from "react";
import { isError } from "../../../helpers/is_error";

function useFetch<T>(endpoint: string) {
  const [data, setData] = useState<T>();
  const [isFetching, setIsFetching] = useState(true);

  const baseUrl = "https://jsonplaceholder.typicode.com";
  const url = `${baseUrl}${endpoint}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        setIsFetching(false);
        if (response.status === 200) {
          const json = await response.json();
          setData(json);
        }
      } catch (e: unknown) {
        setIsFetching(false);

        console.log(isError(e) ? e.message : "Unknown error!");
      }
    };
    fetchData();
  }, [url]);

  return { isFetching: isFetching, data: data };
}

export default useFetch;
