// import packages
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link, useLocation} from "react-router-dom";

// import assets
import {Logo} from "../assets/images";

// import components
import AuthWrapper from "../components/auth-wrapper/AuthWrapper";
import {PrimaryButton} from "../components/buttons/Buttons";
import {InputGroup} from "../components/uiElements/input-group/InputGroup";

// import utils
import {getPropsFromState} from "../redux/mapStateToProps";
import {RegisterUser} from "../redux/actions";

const initData = {
    username: '',
    password: '',
    repeatPassword: '',
}
const initErrorData = {
    username: false,
    password: false,
    repeatPassword: false,
}

function Register(props) {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const uid = urlParams.get('uid');
    console.log('uid', uid)
    const [loginData, setRegisterData] = useState(initData);
    const [errors, setErrors] = useState(initErrorData);


    const getInputValues = (e) => {
        const {name, value} = e.target;
        setRegisterData({
            ...loginData,
            [name]: value
        })
    };


    async function registerUser() {
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
        if (!loginData.repeatPassword || loginData.password !==loginData.repeatPassword) {
            result = false;
            err.repeatPassword = true;
        }
        if (result) {
            props.RegisterUser({
                username: loginData.username,
                password: loginData.password,
            })
        } else {
            setErrors(err)
        }
    }
    return <AuthWrapper>
        <div className="form-content sign-in">
            <div className={'form-logo'}>
                <img src={Logo}/>
            </div>
            <div className="inner-part">
                <div className="form-title">Please Sign Up</div>
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
                        e.key === 'Enter' && registerUser()
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
                        // e.key === 'Enter' && registerUser()
                    }}
                    onChange={getInputValues}
                >
                </InputGroup>
                <InputGroup
                    inputType={'input'}
                    type={`text`}
                    name={'repeatPassword'}
                    label={'Password Verification'}
                    placeholder={'Password Verification'}
                    value={loginData.repeatPassword}
                    error={errors.repeatPassword}
                    maxLength={50}
                    onKeyDown={(e) => {
                        // e.key === 'Enter' && registerUser()
                    }}
                    onChange={getInputValues}
                >
                </InputGroup>
                <PrimaryButton
                    disabled={true}
                    title={'Sign Up'}
                    cb={registerUser}/>
                <div className={'line'}/>
                <footer className={'footer'}>
                    Don't have an account? <Link to={'/'}>Log In</Link>
                </footer>
            </div>

        </div>
    </AuthWrapper>
}

const mapStateToProps = (state) => {
    return getPropsFromState(state, [])
};

const mapDispatchToProps = {
    RegisterUser,
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);

