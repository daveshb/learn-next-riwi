import { toast } from "react-toastify";

export const notification = (text: string,type: "error" | "success",time?: number) => {

  if (type === "success") {
    toast.success(text, {
      position: "bottom-center",
      autoClose: time || 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  if (type === "error") {
    toast.error(text, {
      position: "bottom-center",
      autoClose: time || 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};
