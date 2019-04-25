import { handleActions } from 'redux-actions';
import { showAlert, hide, showConfirm } from '../actions/dialog';

const initialState = {
    alertVisible: false,
    confirmVisible: false,
    data: {}
}

export default handleActions(
{
    [showAlert]: (state, action) => ({ ...initialState, 
                                        alertVisible: true, 
                                        data: {
                                            title: action.payload.title,
                                            message: action.payload.message
                                        }}),
    [showConfirm]: (state, action) => ({ ...initialState, 
                                        confirmVisible: true, 
                                        data: {
                                            title: action.payload.title,
                                            message: action.payload.message,
                                            confirmCallback: action.payload.confirmCallback
                                        }}),                                  
    [hide]: (state, action) => ({...initialState})
}, initialState);