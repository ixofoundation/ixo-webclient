
import { toast } from 'react-toastify';
import '../../assets/toasts.css';
import { ErrorTypes } from '../../types/models';

const successToast = (message: string) => {
	// @ts-ignore
	toast(message, {
		position: toast.POSITION.TOP_RIGHT,
		className: 'successToast',
		autoClose: 25000
	});
};

const errorToast = (message: string, type?: ErrorTypes) => {
	// @ts-ignore
	toast(message, {
		position: toast.POSITION.TOP_RIGHT,
		className: 'errorToast',
		autoClose: 25000
	});
	if (type === ErrorTypes.goBack) {
		history.back(-1);
	}
};

const warningToast = (message: string) => {
	// @ts-ignore
	toast(message, {
		position: toast.POSITION.TOP_RIGHT,
		className: 'warningToast',
		autoClose: 25000
	});
};

export { successToast, errorToast, warningToast };