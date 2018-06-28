import { toast } from 'react-toastify';
import '../../assets/toasts.css';

const successToast = (message: string) => {
	toast(message, {
		position: toast.POSITION.TOP_RIGHT,
		className: 'successToast'
	});
};

const errorToast = (message: string) => {
	toast(message, {
		position: toast.POSITION.TOP_RIGHT,
		className: 'errorToast'
	});
};

const warningToast = (message: string) => {
	toast(message, {
		position: toast.POSITION.TOP_RIGHT,
		className: 'warningToast'
	});
};

export {
	successToast,
	errorToast,
	warningToast
};