import { toast } from 'react-toastify';
import '../../assets/toasts.css';
import { ErrorTypes } from '../../types/models';

const successToast = (message: string) => {
	toast(message, {
		position: 'top-right',
		className: 'successToast'
	});
};

const errorToast = (message: string, type?: ErrorTypes) => {

	toast(message, {
		position: 'top-right',
		className: 'errorToast'
	});
	if (type === ErrorTypes.goBack) {
		history.back(-1);
	}
};

const warningToast = (message: string) => {
	toast(message, {
		position: 'top-right',
		className: 'warningToast'
	});
};

export {
	successToast,
	errorToast,
	warningToast
};