/**
 * Created by huk on 2018/8/16.
 */

import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from "../constant";

export function login(body) {
    return {
        types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
        promise: (client) => client.post('http://10.16.15.132/api/auth/',
            { data: body }
        )
    }
}