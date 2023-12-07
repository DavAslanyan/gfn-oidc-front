import {urlCheckLogin, urlRegister, request} from "../api";


export const CheckLoginCredentials = (data) => {
    const requestData = {
        url: `${urlCheckLogin}`,
        method: "POST",
        customHeadersProps:{
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data
    };
    return () => {
        return request(requestData).then(res => {
            return res.data
        })
    }
};

export const RegisterUser = (data) => {
    const requestData = {
        url: `${urlRegister}`,
        method: "POST",
        data
    };
    return () => {
        return request(requestData).then(res => {
            return res.data
        })
    }
};

export const ForgotUserPassword = (data) => {
    const requestData = {
        url: `${urlRegister}`,
        method: "POST",
        data
    };
    return () => {
        return request(requestData).then(res => {
            return res.data
        })
    }
};

