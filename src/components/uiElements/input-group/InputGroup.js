import React, {useState} from "react";

//Import Assets
import "./inputGroup.scss";

export function InputGroup(props) {
    const {
        label, type, inputType, name, className, placeholder, error,  autocomplete = "on", onKeyDown, id,
        defValue, onChange, value, maxLength, autoFocus, resizable, disabled, forwardRef,
        integerNumber, maxValue, minValue,
    } = props;
    const [focused, setFocused] = useState(false);

    function onChangeNumber(e) {
        let {name, value} = e.target;
        if (disabled) {
            return;
        }
        if (value === '') {
            props.onChange({
                name,
                value,
            });
            return;
        }
        if (isNaN(Number(value)) || value?.split('.')?.[1]?.length > 2) {
            return;
        }
        if (value && integerNumber) {
            value = parseInt(value)
        }
        if (minValue || maxValue) {
            if (minValue && value < minValue) {
                return;
            }
            if (maxValue && value > maxValue) {
                return;
            }
        }
        props.onChange({
            name,
            value,
        });
    }

    function onFocus() {
        props.onFocus && props.onFocus();
        setFocused(true)
    }
    function onBlur() {
        props.onFocus && props.onBlur();
        setFocused(false)
    }

    return <div className={`custom-input-group ${focused || value ? 'active' : ''}`} id={name}>
        {label && <label className={'custom-label'}>{label}</label>}
        {inputType === "input" && type !== "number" && type !== "checkbox" && type !== "password" &&
            <>
                <input type={type} name={name} placeholder={placeholder} maxLength={maxLength} ref={forwardRef}
                       value={value || ''} defaultValue={defValue} onChange={onChange} autoComplete={'off'}
                       autoFocus={autoFocus} onKeyDown={onKeyDown} disabled={!!disabled} id={id}  onBlur={onBlur} onFocus={onFocus}
                       className={`${className} ${error ? "invalid" : ""}`}/>
                {props.children}
            </>}

        {inputType === "input" && type === "password" &&
            <>
                <input type={type} name={name} placeholder={placeholder} maxLength={maxLength}
                       value={value || ''} defaultValue={defValue} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
                       autoFocus={autoFocus} autoComplete={autocomplete} onKeyDown={onKeyDown}
                       className={`${className} ${error ? "invalid" : ""}`}/>
                {props.children}
            </>}

        {inputType === "input" && type === "number" &&
            <input type={'text'} name={name} placeholder={placeholder} ref={forwardRef}
                   value={value || ''} onChange={onChangeNumber} autoComplete={'off'}  onBlur={onBlur} onFocus={onFocus}
                   autoFocus={autoFocus} onKeyDown={onKeyDown} disabled={!!disabled} id={id}
                   className={`${className} ${error ? "invalid" : ""}`}/>}

        {inputType === "input" && type === "checkbox" &&
            <input type={type} name={name} checked={value} onChange={onChange}/>}

        {inputType === "textarea" &&
            <textarea name={name} placeholder={placeholder} value={value || ''}  onBlur={onBlur} onFocus={onFocus}
                      defaultValue={defValue} onChange={onChange} maxLength={maxLength}
                      className={`${className} ${error ? "invalid" : ""} ${resizable ? "resizable" : ""}`}/>}


          {inputType === "wrapper" &&
            <> {props.children}</>
        }
    </div>
}
