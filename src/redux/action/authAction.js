/**
 * Created by huk on 2018/8/16.
 */

import { LOGIN } from "./constant";


export function login(body) {
    return {
        type: LOGIN
    }
}