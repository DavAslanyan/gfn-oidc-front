import axios from "axios";

export const request = ({
                            url,
                            method = "GET",
                            data = null,
                        }) => {
    let headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    };

    const requestData = {
        url: url,
        method: method,
        headers: headers,
    };

    data && (requestData.data = data);
    return axios.request(requestData)
};

axios.interceptors.response.use(response => {
        return response;
    },
    async error => {
        return Promise.reject(error);
    }
);
