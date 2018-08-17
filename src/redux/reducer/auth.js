/**
 * Created by huk on 2018/8/16.
 */

import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from "../constant";

const initState = {};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case LOGIN:
            return state;
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.result
            };
        case LOGIN_FAIL:
            return state;
        default:
            return state
    }
}