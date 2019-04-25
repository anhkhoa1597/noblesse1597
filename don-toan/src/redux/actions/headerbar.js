import { createAction } from 'redux-actions';
import { bindActionCreators } from 'redux';
import { HEADER_BAR_SHOW, HEADER_BAR_HIDE, HEADER_BAR_SET_TITLE, HEADER_BAR_SET_ACTION_CALLBACK } from '../../config/action-types';

export const show = createAction(HEADER_BAR_SHOW);
export const hide = createAction(HEADER_BAR_HIDE);
export const setTitle = createAction(HEADER_BAR_SET_TITLE, (title) => ({title}));
export const setActionCallback = createAction(HEADER_BAR_SET_ACTION_CALLBACK, (actionCallback) => ({ actionCallback }));

export function bindHeaderBarActions(currentActions, dispatch) {
    return {
        ...currentActions,
        headerBarActions: bindActionCreators({
            show,
            hide,
            setTitle,
            setActionCallback
        }, dispatch)
    }
}