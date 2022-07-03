import axios from 'axios';
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const successJson = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }
const errorJson = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }
export const successToast= (successMsg) => {
    toast.success(successMsg, successJson);
}
export const errorToast= (errorMsg) => {
    toast.error(errorMsg, errorJson);
}