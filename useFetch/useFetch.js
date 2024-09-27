import { useState, useEffect } from "react";

const localCache = {};

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  });

  useEffect(() => {
    getFetch();
  }, [url]);

  const setLoadingState = () => {
    setState({
      data: null,
      isLoading: true,
      hasError: false,
      error: null,
    });
  };

  const getFetch = async () => {
    /* const res = await fetch("https://pokeapi.co/api/v2/pokemon/1"); */

    if (localCache[url]) {
      console.log("using cache");
      setState({
        data: localCache[url],
        isLoading: false,
        hasError: false,
        error: null,
      });

      return;
    }
    setLoadingState();
    const res = await fetch(url);

    //sleep
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (!res.ok) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          code: res.status,
          message: res.statusText,
        },
      });
      return;
    }
    const data = await res.json();
    setState({
      data: data,
      isLoading: false,
      hasError: false,
      error: null,
    });
    console.log({ data });

    //cache
    localCache[url] = data;
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};
