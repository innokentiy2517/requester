import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const createRequest = async (topic, text, exp_date, author_id, recipient_id) => {
    const {data} = await $host.post('api/request/create', {topic, text, exp_date, author_id: author_id, recipient_id: recipient_id})
    return data
}

export const fetchRequests = async () => {
    const {data} = await $host.get('api/request')
    return data
}

export const fetchOneRequest = async (id) => {
    const {data} = await $host.get('api/request' + id)
    return data
}