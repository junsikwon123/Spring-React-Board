import React, { ChangeEvent, useRef, useState, KeyboardEvent, useEffect } from 'react';
import './style.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useBoardStore, useLoginUserStore } from 'stores';

// component : 헤더 레이아웃
const Header = () => {

    // state : 로그인 유저 상태
    const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();
    // state : path 상태
    const { pathname } = useLocation()
    // state : cookie 상태
    const [cookies, setCookies] = useCookies();
    // state : 로그인 상태 
    const [isLogin, setIsLogin] = useState<boolean>(false);
    //state : 인증페이지 상태
    const [isAuthPage, setAuthPage] = useState<boolean>(false);
    //state : 메인페이지 상태
    const [isMainPage, setMainPage] = useState<boolean>(false);
    // state : 검색 페이지 상태
    const [isSearchPage, setSearchPage] = useState<boolean>(false);
    //state : 게시물 상세페이지 상태
    const [isBoardDetailPage, setBoardDetailPage] = useState<boolean>(false);
    //state : 개시물 작성페이지 상태
    const [isBoardWritePage, setBoardWritePage] = useState<boolean>(false);
    //state : 게시물 수정페이지 상태
    const [isBoardUpdatePage, setBoardUpdatePage] = useState<boolean>(false);
    //state : 유져페이지 상태
    const [isUserPage, setUserPage] = useState<boolean>(false);

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
    // component : 마이페이지 버튼 컴포넌트
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
    // component : 업로드 버튼 컴포넌트
    const UploadButton = () => {

        //state : 게시물 상태
        const { title, content, boardImageFileList, resetBoard } = useBoardStore()
        //event handler : 업로드 버튼 클릭 이벤트 처리 함수
        const onUploadButtonClickHandler = () => {

        }
        // render : 업로드 버튼 컴포넌트 렌더링
        if (title && content)
            return <div className='black-button' onClick={onUploadButtonClickHandler} >{'업로드'}</div>
        // render : 업로드 불가 컴포넌트 렌더링
        return <div className='disable-button' >{'업로드'}</div>
    }
    //effect : path가 변경될 때 마다 실행될 함수
    useEffect(() => {
        const isAuthPage = pathname.startsWith(AUTH_PATH());
        setAuthPage(isAuthPage)
        const isMainPage = pathname === MAIN_PATH();
        setMainPage(isMainPage)
        const isSearchPage = pathname.startsWith(SEARCH_PATH(''));
        setSearchPage(isSearchPage)
        const isBoardDetailPage = pathname.startsWith(BOARD_PATH() + `/` + BOARD_DETAIL_PATH(''));
        setBoardDetailPage(isBoardDetailPage)
        const isBoardWritePage = pathname.startsWith(BOARD_PATH() + `/` + BOARD_WRITE_PATH());
        setBoardWritePage(isBoardWritePage)
        const isBoardUpdatePage = pathname.startsWith(BOARD_PATH() + `/` + BOARD_UPDATE_PATH(''));
        setBoardUpdatePage(isBoardUpdatePage)
        const isUserPage = pathname.startsWith(USER_PATH(''));
        setUserPage(isUserPage)
    }, [pathname])
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
                    {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage) && (<SearchButton />)}
                    {(isMainPage || isSearchPage || isBoardDetailPage || isUserPage) && (<MyPageButton />)}
                    {(isBoardWritePage || isBoardUpdatePage) && (<UploadButton />)}
                </div>
            </div>
        </div>
    );
};

export default Header;