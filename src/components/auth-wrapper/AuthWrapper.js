// import packages
import React from "react";

//import styles
import "./auth-wrapper.scss";

function AuthWrapper(props) {
    const {children} = props;
    return <div className='auth-wrapper'>
        {children}
    </div>
}

export default AuthWrapper;
