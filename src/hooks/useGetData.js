import { useEffect } from "react";
import { getRequest } from "../api/apiCalls";

const useGetData = ({
  setError,
  setIsError,
  path,
  setLoading,
  setData,
  token,
  isSuccess,
}) => {
  useEffect(() => {
    getData();
  }, [isSuccess]);

  const getData = async () => {
    setLoading(true);
    const res = await getRequest({
      setError,
      setIsError,
      token,
      path,
    });
    if (res?.status) {
      setData(res.data);
    } else {
      setIsError(true);
      setError(res?.message);
    }
    setLoading(false);
  };
};

export default useGetData;
