// import packages
import React, {useEffect, useState} from "react";

// import assets

// import components
import AuthWrapper from "../components/auth-wrapper/AuthWrapper";

// import utils
import {PrimaryButton} from "../components/buttons/Buttons";
import {InputGroup} from "../components/uiElements/input-group/InputGroup";
import {Logo} from "../assets/images";
import {Link, useLocation} from "react-router-dom";

const initData = {
    username: '',
    password: '',
}
const initErrorData = {
    username: false,
    password: false,
}

function Login() {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const uid = urlParams.get('uid');
    console.log('uid', uid)
    const [loginData, setLoginData] = useState(initData);
    const [errors, setErrors] = useState(initErrorData);


    const getInputValues = (e) => {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    };


    async function loginUser() {
        let result = true;
        const err = {}
        if (!loginData.username) {
            result = false;
            err.username = true;
        }

        if (!loginData.password) {
            result = false;
            err.password = true;
        }
        if (result) {

            redirectByPost(`http://localhost:4000/interaction/${uid}`, {
                username: loginData.username,
                password: loginData.password,
            })
        } else {
            setErrors(err)
        }
    }

    function redirectByPost(url, parameters) {
        parameters = parameters || {};

        let form = document.createElement("form");
        form.id = "reg-form";
        form.name = "reg-form";
        form.action = url;
        form.method = "post";
        form.enctype = "multipart/form-data";
        form.target = "_blank";

        Object.keys(parameters).forEach(function (key) {
            let input = document.createElement("input");
            input.type = "text";
            input.name = key;
            input.value = parameters[key];
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);

        return false;
    }

    return <AuthWrapper>
        <div className="form-content sign-in">
            <div className={'form-logo'}>
                <img src={Logo}/>
            </div>
            <div className="inner-part">
                <div className="form-title">Please sign in</div>
                <div className="form-sub-title">
                </div>
                <InputGroup
                    inputType={'input'}
                    type={"text"}
                    name={'username'}
                    value={loginData.username}
                    error={errors.username}
                    label={'Phone'}
                    placeholder={'Phone'}
                    maxLength={50}
                    onKeyDown={(e) => {
                        e.key === 'Enter' && loginUser()
                    }}
                    onChange={getInputValues}
                />
                <InputGroup
                    inputType={'input'}
                    type={`text`}
                    name={'password'}
                    label={'Password'}
                    placeholder={'Password'}
                    value={loginData.password}
                    error={errors.password}
                    maxLength={50}
                    onKeyDown={(e) => {
                        // e.key === 'Enter' && loginUser()
                    }}
                    onChange={getInputValues}
                >
                </InputGroup>
                <PrimaryButton
                    title={'Sign In'}
                    cb={loginUser}/>
                {/*<div className={'forgot-password'}>*/}
                {/*    <Link to={'/forgot'}>Forgot password?</Link>*/}
                {/*</div>*/}
                <div className={'line'}/>
                <footer className={'footer'}>
                    Don't have an account? <Link to={'/register'}>Register now</Link>
                </footer>
            </div>

        </div>
    </AuthWrapper>
}

export default Login
