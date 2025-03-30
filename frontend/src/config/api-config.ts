
import axios from "axios";
import { Cookies } from "react-cookie";
// const apiUrl = import.meta.env.VITE_API_URL;

const appAxios = axios.create({
    baseURL: "http://localhost:8000/" + "api",
});

const cookies = new Cookies();

appAxios.interceptors.request.use((conf) => {
    const token = cookies.get("auth_token");
    // const refreshToken = cookies.get("refreshToken");
    if (token) {
        conf.headers = {
            ...conf.headers,
            Authorization: `Bearer ${token}`,
        } as any;
    }
    return conf;
});

appAxios.interceptors.response.use(
    (resp) => {
        return resp;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            location.href = "/login"
            cookies.remove("auth_token")
        }
        return Promise.reject(error);
    }
);

export { appAxios };
