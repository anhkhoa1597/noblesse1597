import { createAction } from 'redux-actions';
import { bindActionCreators } from 'redux';
import { SHOW_ALERT_DIALOG, SHOW_CONFIRM_DIALOG, HIDE_DIALOG } from '../../config/action-types';

export const showAlert = createAction(SHOW_ALERT_DIALOG, (title, message) => ({ title, message }));
export const showConfirm = createAction(SHOW_CONFIRM_DIALOG, (title, message, confirmCallback) => ({ title, message, confirmCallback }));
export const hide = createAction(HIDE_DIALOG);

export function bindDialogActions(currentActions, dispatch) {
    return {
        ...currentActions,
        dialogActions: bindActionCreators({
            showAlert,
            showConfirm,
            hide
        }, dispatch)
    }
}