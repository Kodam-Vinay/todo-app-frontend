import toast from "react-hot-toast";

export const API_URL = process.env.REACT_APP_PRODUCTION_URL;
export const POST_REQUEST_TYPES = {
  auth: "AUTH",
  create: "CREATE",
};

export const storeToastSuccess = ({ successMessage }) => {
  toast.success(successMessage);
};
export const storeToastError = ({ errorMessage }) => {
  toast.error(errorMessage);
};
