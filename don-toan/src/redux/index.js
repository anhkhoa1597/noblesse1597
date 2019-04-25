import { combineReducers } from 'redux';

import headerbar from './reducers/headerbar';
import dialog from './reducers/dialog';

export default () => combineReducers({
    headerbar,
    dialog
});