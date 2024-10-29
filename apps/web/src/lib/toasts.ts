import { toast } from 'react-toastify'

export const putNotification = (title: string, body: string) => {
  new window.Notification(title, { body: body })
}

export const errorToast = (errorMessage: string) => {
  toast.error(errorMessage, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  })
}

export const successToast = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  })
}

export const infoToast = (message: string) => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  })
}

export const warningToast = (message: string) => {
  toast.warning(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  })
}
