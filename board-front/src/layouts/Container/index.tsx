import { AUTH_PATH } from 'constant';
import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import { Outlet, useLocation } from 'react-router-dom';


// component :  레이아웃
const Container = () => {

    // state : 현재 페이지 path name 상태
    const { pathname } = useLocation();

    // render : 레이아웃 렌더링
    return (
        <>
            <Header />
            <Outlet />
            {pathname !== AUTH_PATH() && <Footer />}
        </>
    );
};

export default Container;