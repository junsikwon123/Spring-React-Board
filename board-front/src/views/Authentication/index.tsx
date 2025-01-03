import React, { useState, KeyboardEvent, useRef, ChangeEvent } from 'react';
import './style.css'
import InputBox from 'components/InputBox';
import { SignInRequestDto } from 'apis/request/auth';
import { signInRequest } from 'apis';
import SignInResponseDto from 'apis/reponse/auth/sign-in.response.dto';
import ResponseDto from 'apis/reponse/response.dto';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from 'constant';
import { Navigate, useNavigate } from 'react-router-dom';

// component : 인증화면 컴포넌트
const Authentication = () => {

    //state: 화면 상태
    const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');

    // state : 쿠키상태
    const [cookie, setCookie] = useCookies()

    // function : 네비게이트 함수
    const navigator = useNavigate();

    // component : sign in card 컴포넌트
    const SignInCard = () => {

        // state: 이메일 요소 참조 상태
        const emailRef = useRef<HTMLInputElement | null>(null);
        // state: 이메일 요소 참조 상태
        const passwordRef = useRef<HTMLInputElement | null>(null);

        // state: 이메일 상태
        const [email, setEmail] = useState<string>("");
        // state: 패스워드 상태
        const [password, setPassword] = useState<string>('');
        // state: 패스워드 타입 상태
        const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
        // state: 패스워드 버튼 아이콘 상태
        const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon')
        // state: 에러 상태 
        const [error, setError] = useState<boolean>(false);

        // function : sign in response  처리함수
        const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
            if (!responseBody) {
                alert('네트워크 이상입니다.');
                return;
            }
            const { code } = responseBody;
            if (code === 'DBE') alert('데이터베이스 오류입니다.')
            if (code === 'SF' || code === 'VF') setError(true);
            if (code === 'SU') return;

            const { token, expirationTime } = responseBody as SignInResponseDto;
            const now = new Date().getTime();
            const expires = new Date(now + expirationTime * 1000);

            setCookie('accessToken', token, { expires, path: MAIN_PATH() });
            navigator(MAIN_PATH());
        }
        // event handler: 이메일 변경이벤트 처리
        const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const { value } = event.target;
            setEmail(value);
        }
        // event handler:  비밀번호 변경이벤트 처리
        const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setError(false);
            const { value } = event.target;
            setPassword(value);
        }
        // event handler : 로그인 버튼 클릭 이벤트 처리
        const onSignInButtonClickHandler = () => {
            const requestBody: SignInRequestDto = { email, password };
            signInRequest(requestBody).then(signInResponse);
        }
        // event handler : 회원가입 링크 클릭 이벤트 처리
        const onSignUpLinkClickHandler = () => {
            setView('sign-up');
        }
        // event handler : 패스워드 버튼 클릭 이벤트 처리 함수
        const onPasswordButtonClickHandler = () => {
            if (passwordType === 'text') {
                setPasswordType('password')
                setPasswordButtonIcon('eye-light-off-icon')
            } else {
                setPasswordType('text')
                setPasswordButtonIcon('eye-light-on-icon')
            }
        }

        // event handler: 이메일 인풋 키 다운 이벤트 처리
        const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            if (!passwordRef.current) return;
            passwordRef.current.focus();
        }
        // event handler: 패스워드 인풋 키 다운 이벤트 처리
        const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            onSignInButtonClickHandler();
        }

        // render: sign in card 컴포넌트 렌더링
        return (
            <div className='auth-card'>
                <div className='auth-card-box'>
                    <div className='auth-card-top'>
                        <div className='auth-cart-title-box'>
                            <div className='auth-card-title'>{'로그인'}</div>
                        </div>
                        <InputBox ref={emailRef} label='이메일 주소' type='text' placeholder='이메일 주소를 입력해주세요.' error={error} value={email} onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler} />
                        <InputBox ref={passwordRef} label='패스워드' type={passwordType} placeholder='비밀번호를 입력해주세요' error={error} value={password} onChange={onPasswordChangeHandler} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler} />
                    </div>
                    <div className='auth-card-bottom'>
                        {error &&
                            <div className='auth-sign-in-error-box'>
                                <div className='auth-sign-in-error-message'>
                                    {'이메일 주소 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요.'}
                                </div>
                            </div>
                        }
                        <div className='black-large-full-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
                        <div className='auth-description-box'>
                            <div className='auth-description'>
                                {'신규 사용자이신가요?'} <span className='auth-description-link' onClick={onSignUpLinkClickHandler}>{'회원가입'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    // component : sign Up card 컴포넌트
    const SignUpCard = () => {

        // render: sign up card 컴포넌트 렌더링
        return (
            <div className='auth-card'></div>
        );
    }

    // render : 인증화면 컴포넌트 렌더링
    return (
        <div id='auth-wrapper'>
            <div className='auth-container'>
                <div className='auth-jumbotron-box'>
                    <div className='auth-jumbotron-contants'>
                        <div className='auth-logo-icon'></div>
                        <div className='auth-jumbotron-text-box'>
                            <div className='auth-jumbotron-text'>{'환영합니다'}</div>
                            <div className='auth-jumbotron-text'>{'HOONS BOARD 입니다.'}</div>
                        </div>
                    </div>
                </div>
                {view === 'sign-in' && <SignInCard />}
                {view === 'sign-up' && <SignUpCard />}
            </div>
        </div>
    );
};

export default Authentication;