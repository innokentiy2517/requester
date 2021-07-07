import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const createDepartment = async (department_name, department_number) => {
    const {data} = await $host.post('api/department/create', {department_name, department_number})
    return data
}

export const fetchDepartments = async () => {
    const {data} = await $host.get('api/department')
    return data
}

// export const fetchOneRequest = async (id) => {
//     const {data} = await $host.get('api/request' + id)
//     return data
// }