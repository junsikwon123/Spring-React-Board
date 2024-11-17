import { ChangeEvent, Dispatch, KeyboardEvent, forwardRef } from 'react';
import './style.css'

// interface: Input Box 컴포넌트 Popperties
interface Props {
    label: string;
    type: 'text' | 'password';
    error: boolean;
    placeholder: string;
    value: string;
    setValue: Dispatch<React.SetStateAction<string>>;

    icon?: string;
    onBouttonClick?: () => void;

    message?: string;

    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

// componert : Input Box 컴포넌트
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {

    // state : properties
    const { label, type, error, placeholder, value, icon, message,
        setValue, onBouttonClick, onKeyDown
    } = props;

    // event handler : input값 변경 이벤트 처리 함수
    const onChangeHadlder = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setValue(value);
    }
    // event handler : key 다운 이벤트
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (!onKeyDown) return;
        onKeyDown(event);
    }

    //reder: Input Box 컴포넌트
    return (
        <div className='inputbox'>
            <div className='inputbox-label'>{label}</div>
            <div className={error ? 'inputbox-container-error' : 'inputbox-container'}>
                <input ref={ref} type={type} className='input' placeholder={placeholder} value={value} onChange={onChangeHadlder} onKeyDown={onKeyDownHandler} />
                {onBouttonClick !== undefined && (
                    <div className='icon-button'>
                        {icon !== undefined && (<div className={`icon ${icon}`}></div>)}
                    </div>
                )}
            </div>
            {message !== undefined && (<div className='inputbox-message'>{message}</div>)}
        </div>
    );
});


export default InputBox;