import { createContext } from "react";

const ResponseContext = createContext({
  isError: false,
  error: "",
  isLoading: false,
  isSuccess: false,
  successMessage: "",
  toggleLoading: () => {},
  toggleError: () => {},
  toggleSuccess: () => {},
  storeError: () => {},
  storeSuccess: () => {},
});
export default ResponseContext;
