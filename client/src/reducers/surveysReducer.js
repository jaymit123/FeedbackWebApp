//Updates the state to show surveys of current logged in user.
import { FETCH_SURVEYS_USER } from '../actions/types';
export default (state = [], action) => {
    switch (action.type) {
        case FETCH_SURVEYS_USER:
            return action.payload || false;
        default:
            return state;
    }
}