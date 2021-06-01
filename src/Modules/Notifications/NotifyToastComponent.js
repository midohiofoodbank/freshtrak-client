import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastTypes = {
  info: toast.TYPE.INFO,
  success: toast.TYPE.SUCCESS,
  warn: toast.TYPE.WARNING,
  error: toast.TYPE.ERROR,
  default: toast.TYPE.DEFAULT
}
export const showToast = (message, type = "default") => {
  toast.configure()
  toast(message, {
    type: toastTypes[type],
    hideProgressBar: true,
    enter: "fadeIn",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
  })
}
export const NotifyToast = ({position='top-left', }) => {

  return (
    <div className='notify-toast-container'>
      <ToastContainer autoClose={false} position={position}/>
    </div>
  )
}