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
import {ForgotUserPassword} from "../redux/actions";

const initData = {
    username: '',
}
const initErrorData = {
    username: false,
}

function ForgotPassword(props) {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const uid = urlParams.get('uid');
    console.log('uid', uid)
    const [loginData, setForgotPasswordData] = useState(initData);
    const [errors, setErrors] = useState(initErrorData);


    const getInputValues = (e) => {
        const {name, value} = e.target;
        setForgotPasswordData({
            ...loginData,
            [name]: value
        })
    };


    async function forgotPass() {
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
            props.ForgotUserPassword({
                username: loginData.username,
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
                <div className="form-title">Enter your phone number</div>
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
                        e.key === 'Enter' && forgotPass()
                    }}
                    onChange={getInputValues}
                />
                <PrimaryButton
                    title={'Get Code'}
                    cb={forgotPass}/>
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
    ForgotUserPassword,
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

