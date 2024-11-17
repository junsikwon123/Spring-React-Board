import React, { ChangeEvent, useRef, useState, KeyboardEvent, useEffect } from 'react';
import './style.css'
import { useNavigate, useParams } from 'react-router-dom';
import { AUTH_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useLoginUserStore } from 'stores';

// component : 헤더 레이아웃
const Header = () => {

    // state : 로그인 유저 상태
    const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();
    // state : cookie 상태
    const [cookies, setCookies] = useCookies();
    // state : 로그인 상태 
    const [isLogin, setIsLogin] = useState<boolean>(false);
    // function : 네비게이트 함수
    const navigate = useNavigate();

    // event Handler : 로고 클릭 이벤트 처리 함수
    const onLogoClockHandler = () => {
        navigate(MAIN_PATH());
    }

    // component : 검색 버튼 컴포넌트
    const SearchButton = () => {

        //state : 검색어 버튼 요소 참조 상태
        const searchButtonWordRef = useRef<HTMLDivElement | null>(null);
        // state : 검색 버튼 상태 
        const [status, setStatus] = useState<boolean>(false);
        //state : 검색어 상태
        const [Word, setWord] = useState<string>('');
        //state : 검색어 path variable 상태
        const { searchWord } = useParams();

        // event handler : 검색 변경 이벤트 처리함수 
        const onSearchWordChangehandler = (event: ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setWord(value)
        }
        // event handler : 검색어 키 이벤트 처리 함수
        const onSearchWordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            if (!searchButtonWordRef) return;
            searchButtonWordRef.current?.click();
        }
        // event handler : 기본 icon : 검색아이콘 클릭 이벤트 처리 함수
        const onSearchButtonClickHandler = () => {
            if (!status) return setStatus(!status);
            navigate(SEARCH_PATH(Word))
        }

        //effect : 검색어 path variable 변경 될떄 마다 실행될 함수
        useEffect(() => {
            if (searchWord) {
                setWord(searchWord);
                setStatus(true)
                return;
            }
        }, [searchWord])

        if (!status)
            //render : 검색버튼 컴포넌트 렌더링 (클릭 false 상태)
            return (
                <div className='icon-button' onClick={onSearchButtonClickHandler}>
                    <div className='icon search-light-icon'></div>
                </div>
            )
        // render : 검색버튼 컴포넌트 렌더링 (클릭 true 상태)
        return (
            <div className='header-search-input-box'>
                <input type="text" className='header-search-input' value={Word} placeholder='검색어를 입력해주세요.' onChange={onSearchWordChangehandler} onKeyDown={onSearchWordKeyDownHandler} />
                <div ref={searchButtonWordRef} className='icon-button' onClick={onSearchButtonClickHandler}>
                    <div className='icon search-light-icon'></div>
                </div>
            </div>
        );
    }
    // component : 로그인 또는 마이페이지 버튼 컴포넌트
    const MyPageButton = () => {
        // state : userEmail path varialbe 상태
        const { userEmail } = useParams();

        //event handler : 마이페이지 버튼 클릭 이벤트 처리 함수
        const onMyPageButtonClickHandler = () => {
            if (!loginUser) return;
            const { email } = loginUser
            navigate(USER_PATH(email))
        }
        //event handler : 로그아웃 버튼 클릭 이벤트 처리 함수
        const onSignOutButtonClickHandler = () => {
            resetLoginUser();
            navigate(MAIN_PATH());
        }
        //event handler : 로그인 버튼 클릭 이벤트 처리 함수
        const onSignInButtonClickHacndler = () => {
            navigate(AUTH_PATH())
        }

        // render : 마이페이지 버튼 컴포넌트 렌더링
        if (isLogin && userEmail === loginUser?.email)
            return <div className='white-button' onClick={onSignOutButtonClickHandler}>{'로그아웃'}</div>
        // render : 마이페이지 버튼 컴포넌트 렌더링
        if (isLogin)
            return <div className='white-button' onClick={onMyPageButtonClickHandler}>{'마이페이지'}</div>
        // render : 로그인 버튼 컴포넌트 렌더링
        return <div className='black-button' onClick={onSignInButtonClickHacndler} >{'로그인'}</div>



    }

    // render : 헤더 레이아웃 렌더링
    return (
        <div id='header'>
            <div className='header-container'>
                <div className='header-left-box' onClick={onLogoClockHandler}>
                    <div className='icon-box'>
                        <div className='icon logo-dark-icon'></div>
                    </div>
                    <div className='header-logo'>{'hoons Board'}</div>
                </div>
                <div className='header-right-box'>
                    <SearchButton />
                    <MyPageButton />
                </div>
            </div>
        </div>
    );
};

export default Header;