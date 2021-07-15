import { ToastContainer, toast } from "react-toastify";

export function NotifToastContainer() {
  return (
    <ToastContainer position="bottom-right" autoClose={3000} closeOnClick />
  );
}

export function notify(text, type) {
  switch (type) {
    case "info":
      toast(text);
      break;
    case "error":
      toast.error(text);
      break;
    default:
      break;
  }
}
