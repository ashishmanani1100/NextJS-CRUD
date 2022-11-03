import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "reactstrap";
import { closeToast } from "../../App/Toast/toastSlice";

const Toast = () => {
  const dispatch = useDispatch()

  const {isOpenToast, message, type} = useSelector(state => state.toast)

  useEffect(() => {
    setTimeout(() => {
      dispatch(closeToast())
    }, 5000);
  }, [isOpenToast]);

  return (
    <Alert
      isOpen={isOpenToast}
      toggle={() => dispatch(closeToast())}
      className="w-25 position-fixed bottom-0"
      color={type}
    >
      {message}
    </Alert>
  );
};

export default Toast;