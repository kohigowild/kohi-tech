import { toast } from 'react-toastify'

export const useToast = ({ text }: { text: string }) => {
  toast(text, {
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  })
}
