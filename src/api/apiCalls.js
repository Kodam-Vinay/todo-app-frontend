import { API_URL, POST_REQUEST_TYPES } from "../utils/constants";

export const postRequest = async ({
  setIsError,
  setError,
  reqBody,
  path,
  token,
  reqType = POST_REQUEST_TYPES.auth,
}) => {
  try {
    const options1 = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    };
    const options2 = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reqBody),
    };
    const response = await fetch(
      API_URL + path,
      reqType === POST_REQUEST_TYPES.auth ? options1 : options2
    );
    const data = await response.json();
    if (response.ok) {
      setIsError(false);
    } else {
      setIsError(true);
      setError(data?.message);
    }
    return data;
  } catch (error) {
    setIsError(true);
    setError(error.message);
  }
};

export const getRequest = async ({ setError, setIsError, token, path }) => {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(API_URL + path, options);
    const data = await response.json();
    if (response.ok) {
      setIsError(false);
    } else {
      setIsError(true);
      setError(data?.message);
    }
    return data;
  } catch (error) {
    setIsError(true);
    setError(error.message);
  }
};

export const updateRequest = async ({
  setIsError,
  setError,
  reqBody,
  path,
  token,
}) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reqBody),
    };
    const response = await fetch(API_URL + path, options);
    const data = await response.json();
    if (response.ok) {
      setIsError(false);
    } else {
      setIsError(true);
      setError(data?.message);
    }
    return data;
  } catch (error) {
    setIsError(true);
    setError(error.message);
  }
};

export const deleteRequest = async ({
  setIsError,
  setError,
  reqBody,
  path,
  token,
}) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reqBody),
    };
    const response = await fetch(API_URL + path, options);
    const data = await response.json();
    if (response.ok) {
      setIsError(false);
    } else {
      setIsError(true);
      setError(data?.message);
    }
    return data;
  } catch (error) {
    setIsError(true);
    setError(error.message);
  }
};
