import { handleActions } from 'redux-actions';
import { show, hide, setTitle, setActionCallback } from '../actions/headerbar';

const initialState = {
    visible: true,
    title: '',
    backVisible: false,
    actionCallback: () => {}
};

export default handleActions({
    [show]: (state, action) => ({ ...initialState, visible: true }),
    [hide]: (state, action) => ({ ...initialState, visible: false }),
    [setTitle]: (state, action) => ({ ...initialState, title: action.payload.title }),
    [setActionCallback]: (state, action) => ({ ...state, actionCallback: action.payload.actionCallback })
}, initialState);