import { useEffect, useState } from "react";

//Assets
import "../assets/styles/layout.scss"

//Components

//Hooks


function Layout (props) {
    const { children } = props

    return <div className={'Layout'}>
        {children}
    </div>
}

export default Layout
