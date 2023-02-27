import { toast } from 'react-toastify'
import { ErrorTypes } from 'types/models'

const successToast = (message: string): void => {
  toast(message, {
    position: toast.POSITION.TOP_RIGHT,
    className: 'successToast',
  })
}

const errorToast = (message: string, type?: ErrorTypes, autoClose?: boolean): void => {
  toast(message, {
    position: toast.POSITION.TOP_RIGHT,
    className: 'errorToast',
    autoClose: autoClose ? 3000 : false,
  })
  if (type === ErrorTypes.goBack) {
    // history.back()
  }
}

const warningToast = (message: string): void => {
  toast(message, {
    position: toast.POSITION.TOP_RIGHT,
    className: 'warningToast',
  })
}

export { successToast, errorToast, warningToast }
