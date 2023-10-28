import { Link, useLocation } from "react-router-dom";


export default function AccountNav() {

    const {pathname} = useLocation();
    let subpage = pathname.split('/')[2];
    if(subpage === undefined){
        subpage = 'profile';
    }
    
    function linkClasses(type=null){

        let classes = 'py-2 px-4 inline-flex gap-1 rounded-full';

        if (type === subpage){
            classes += ' bg-blue-600 text-white rounded-full'
        }else{
            classes += ' bg-gray-200'
        }
        return classes;
    }

    return (
        <nav className="w-full flex justify-center mt-8 gap-4">
            <Link className={linkClasses('profile')} to={'/account'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <span className="hidden lg:inline">My Profile</span>
            </Link>
            <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375.375 0 11-.75 0 .375.375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375.375 0 11-.75 0 .375.375.375 0 01.75 0z" />
                </svg>
                <span className="hidden lg:inline">My bookings</span>
            </Link>
            <Link className={linkClasses('planes')} to={'/account/planes'}>
                <svg xmlns="http://w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                <span className="hidden lg:inline">My planes</span>
            </Link>
        </nav>

    )
}