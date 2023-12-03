import './subscribe.scss'
import {useState} from "react";
import {InputGroup} from "../uiElements/input-group/InputGroup";
import {useSubscribeMutation} from "../../redux/service/subscribe";


function Subscribe(){
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [subscribe] = useSubscribeMutation()

    const getInputValues = (e) => {
        const {value} = e.target;
        setEmail(value);
        setError(false)
    };

    const sendSubscribe = () => {
        if (email ) {
            subscribe({email}).then(() => {
                setEmail('')
            }, errorEmail => setError(!errorEmail))
        } else {
            setError(true)
        }
    }

    return <div className={'subscribe-block'}>
        <div className={'subscribe-title'}>
            Be the first to know when we launch
        </div>
        <div className={'subscribe-description'}>
            Stay in the loop with everything you need to know
        </div>
        <div className={'subscribe-input-block'}>
            <InputGroup
                inputType={'input'}
                type={"text"}
                value={email}
                error={error}
                name={'email'}
                placeholder={'email'}
                maxLength={100}
                onChange={getInputValues}
            />

            <button className='sent-email'
                    onClick={sendSubscribe}>
                Subscribe
            </button>
        </div>
    </div>
}
export default Subscribe
