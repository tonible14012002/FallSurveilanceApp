import {ToastColorEnum} from '../../components/ToastMessage/ToastColorEnum';
import {toastActions} from '~/context/toast';

/**
 * Displays a toast message.
 *
 * @param msg - The message to display in the toast.
 * @param type - The color of the toast. Optional.
 * @param duration - The duration of the toast in milliseconds. Optional.
 */
export function showToast(
  msg: string,
  type?: ToastColorEnum,
  duration?: number,
) {
  toastActions.open({msg, type, duration});
}
