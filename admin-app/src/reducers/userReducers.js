import { userConstants } from "../actions/constants"

const initState = {
    loading: false,
    error: null,
    message: ''
}

export default (state = initState, action) => {

    console.log(action);

    switch (action.type) {
        case userConstants.USER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break;
        case userConstants.USER_REGISTER_FAILUR:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break;
    }
    return state;
}