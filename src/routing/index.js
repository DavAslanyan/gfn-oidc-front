// Import packages
import React from "react";
import {Route, Routes} from "react-router-dom";
import Layout from "../containers/Layout";

// Import utils

// Import pages
import Login from "../containers/Login";
import Register from "../containers/Register";
import ForgotPassword from "../containers/ForgotPassword";


export default function RoutesBlocks() {
    return <Layout>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/forgot" element={<ForgotPassword/>}/>
        </Routes>
    </Layout>
}


