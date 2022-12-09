import { ComponentColor } from '../constants/constants';
import IToastData from '../interfaces/IToastData';

const configureToast = (toastIcon: ComponentColor, toastHeader: string, toastBody: string): IToastData => {
    return { toastIcon, toastHeader, toastBody }
}

export {
    configureToast
}