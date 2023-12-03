import "./homepage.scss"
import {MainImg} from "../../assets/images";
import SubscribeModal from "../../components/modal/SubscribeModal";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getPropsFromState,} from "../../redux/mapStateToProps";
import { RegisterOrder} from "../../redux/actions";
import {useLocation, useNavigate} from "react-router-dom";
import queryString from 'query-string'


function Homepage(props) {
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [subResult, setSubResult] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()
    console.log('location', location)
    useEffect(() => {
        checkPayment()
    }, [])

    async function checkPayment() {
        if (location.pathname === '/payment/callback') {
            setLoading(true)
            const queryParams = queryString.parse(location.search);
            const {orderId} = queryParams || {}
            if (orderId) {


            }else{
                setLoading(false)
            }
            navigate('/', {replace: true})
            console.log('orderId', orderId);
        }
    }

    function toggleModalVisible() {
        setModalVisible(!modalVisible)
        setSubResult(null)
    }

    return <div className={`Homepage ${modalVisible ? 'blur-effect' : ""}`}>
        {loading && <div className={'home-loading'}>
            <div className="home-loader"/>
        </div>}
        <section className={'wrapper'}>
            <div className={'left-block'}>
                <h1>GFN Պրեմիում բաժանորդագրություն 30 օրով</h1>
                <p>
                    Գործարկեք ավելի քան 700 հասանելի խաղերից որևէ մեկը, որոնց ցանկը թարմացվում է ամեն շաբաթ
                </p>
                <div className={'subscribe-block'}>
                    <div className={'price-wrapper'}>
                        <span className={'price'}>4990֏</span>
                        <span className={'month'}> / ամիս</span>
                    </div>
                    <div className={'subscribe-button'} onClick={toggleModalVisible}>
                        Բաժանորդագրվել
                    </div>
                </div>
            </div>
            <div className={'right-block'}>
                <div className={'img-wrapper'}>
                    <img src={MainImg} alt={''}/>
                </div>
            </div>
        </section>
        <SubscribeModal isVisible={modalVisible}
                        subResult={subResult}
                        toggleVisible={toggleModalVisible}/>
    </div>
}

const mapStateToProps = (state) => {
    return getPropsFromState(state, [])
};

const mapDispatchToProps = {
    RegisterOrder,
}
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
