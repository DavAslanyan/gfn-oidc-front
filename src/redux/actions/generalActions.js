import { _urlRegister, request} from "../api";


export const RegisterUser = (data) => {
    const requestData = {
        url: `${_urlRegister}`,
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
        url: `${_urlRegister}`,
        method: "POST",
        data
    };
    return () => {
        return request(requestData).then(res => {
            return res.data
        })
    }
};

