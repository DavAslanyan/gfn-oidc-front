import React, { useEffect, useState } from "react";
import Modal from 'react-modal';

import './subscribe-modal.scss';
import { CloseIcon, SubscribeSuccess } from "../../assets/images";

import { InputGroup } from "../uiElements/input-group/InputGroup";
import { getPropsFromState } from "../../redux/mapStateToProps";
import { RegisterOrder } from "../../redux/actions";
import { connect } from "react-redux";

function SubscribeModal (props) {
    const { isVisible, toggleVisible, subResult } = props;
    const [username, setUsername] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log('isVisible', isVisible)
        if (!isVisible) {
            setErrorMessage('');
            setUsername('');
            setError(false);
            setLoading(false);
        }else if(subResult?.error){
            setUsername('');
            setError(false);
            setLoading(false);
            setErrorMessage('Ինչոր բան այն չէ, փորցեք մի փոքր ուշ!')
        }
    }, [isVisible])

    const handleChangeInput = (e) => {
        const value = e.target.value
        setUsername(value)
        setError(false)
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!username) {
            setError(true)
            return;
        }
        setLoading(true)
        const reqData = {
            username: username
        }
        await props.RegisterOrder(reqData).then(data => {
            console.log('data', data)
            window.open(data?.formUrl, '_self',)
        }).catch(error => {
            console.log('error', error)
            setErrorMessage('Ինչոր բան այն չէ, փորձեք մի փոքր ուշ!')
        }).finally(() => {
            setLoading(false)
        })
    }

    return <Modal isOpen={isVisible}
                  onRequestClose={toggleVisible}
                  className={'modal-wrapper'}
                  overlayClassName={'modal-overlay'}>
        <div className={'close-icon'}>
            <CloseIcon onClick={toggleVisible}/>
        </div>
        <div className="modal-content">
            {loading && <div className={'loading'}>
                <div className="loader"/>
            </div>}
            {errorMessage ? <div className={'subscribe-content'}>
                    <div className={'text-block'}>
                        <div className="modal-title">
                            Բաժանորդագրություն
                        </div>
                        <div className="modal-description">
                            {errorMessage}
                        </div>
                    </div>
                </div> :
                (!subResult ? <div className={'subscribe-content'}>
                            <div className={'text-block'}>
                                <div className="modal-title">
                                    Բաժանորդագրություն
                                </div>
                                <div className="modal-description">
                                    «Hybrid Systems»-ը իր հաճախորդներին տրամադրում է բաժանորդագրություն համակարգչային խաղերի
                                    համար
                                </div>
                            </div>
                            <div className={'form-wrapper'}>
                                <InputGroup inputType={'input'}
                                            type={'text'}
                                            value={username}
                                            placeholder={"Հեռախոսահամար"}
                                            label={"Հեռախոսահամար"}
                                            name={'username'}
                                            error={error}
                                            maxLength={50}
                                            onChange={handleChangeInput}/>
                                <div className={'subscribe-button'} onClick={handleSubmit}>
                                    Բաժանորդագրվել
                                </div>
                            </div>
                        </div>
                        :
                        <div className={'subscribe-success'}>
                            <div className={'img-wrapper'}>
                                <SubscribeSuccess/>
                            </div>
                            <div className={'text-block'}>
                                <div className="modal-title">
                                    Շնորհավորում ենք
                                </div>
                                <div className="modal-description">
                                    Ձեր 1 ամսով բաժանորդագրությունը հաջողությամբ կատարվել է
                                </div>
                            </div>
                        </div>
                )}
        </div>
    </Modal>
}

const mapStateToProps = (state) => {
    return getPropsFromState(state, [])
};

const mapDispatchToProps = {
    RegisterOrder,
}
export default connect(mapStateToProps, mapDispatchToProps)(SubscribeModal);
