import axios from "axios";
import { getData } from "./local-storage-utils";
const client = axios.create({
    baseURL: "http://localhost:8000/api/",
});

export const request = async ({ ...options }) => {
    client.defaults.headers.common["Authorization"] = `Bearer ${getData(
        "token"
    )}`;
    client.defaults.headers.common["Accept"] = "application/json";
    client.defaults.headers.common["Content-Type"] = "application/json";
    return client(options);
};
// how use it :
// for get => request({url:'url api'})
// for post => request({url:'url api',method:'post',data:data})
