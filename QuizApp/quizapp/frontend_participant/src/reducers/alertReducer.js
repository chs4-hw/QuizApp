import { GET_ALERT, CREATE_ALERT } from '../actions/types';

const initialState = {
    msg: {},
    status: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALERT:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
            };
        // case CREATE_ALERT:
        //     return (state = action.payload)
        default:
            return state;
    }
}

// export default function (state = initialState, action) {
//     switch (action.type) {
//         case GET_ALERT:
//             return action.payload;
//         case CREATE_ALERT:
//             return (state = action.payload)
//         default:
//             return state;
//     }
// }
