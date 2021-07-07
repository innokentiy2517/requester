import {$authHost, $host} from "./index"
import jwtDecode from "jwt-decode";

export const registration = async (first_name, second_name, department_name, login, password) =>{
    const {data} = await $host.post('api/user/registration', {first_name, second_name, department_name, login, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const logIn = async (login, password) =>{
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () =>{
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}