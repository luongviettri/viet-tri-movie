import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import i18n from '../../../../i18n';
import _ from "lodash"
import { TOKEN, USER_LOGIN } from '../../../../util/settings/config';
const { Option } = Select;



const handleChange = (value) => {
    i18n.changeLanguage(value);
};
export default function Header(props) {
    // ! sử dụng hook đa ngôn ngữ
    const { t, i18n } = useTranslation();
    // ! xử lý nút đăng nhập, đăng kí
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log('userLogin: ', userLogin);

    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return (
                <Fragment>
                    <button
                        onClick={() => {
                            history.push("/login")
                        }}
                        className="self-center px-8 py-3 rounded">
                        {/* Sign in */}
                        {t('signin')}
                    </button>
                    <button
                        onClick={() => {
                            history.push("./register")
                        }}
                        className="self-center px-8 py-3 font-semibold rounded bg-violet-600 text-coolGray-50">
                        {/* Sign up */}

                        {t('signup')}
                    </button>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <button
                    onClick={() => {
                        history.push("/profile");
                    }}
                    className="self-center px-8 py-3 rounded"
                >
                    {t("hello.1")}
                    {" " + userLogin.taiKhoan}</button>
                <button className="text-white mx-2" onClick={() => {
                    localStorage.removeItem(USER_LOGIN);
                    localStorage.removeItem(TOKEN);
                    // ! đẩy user về login ==>> dùng lệnh này thay vì navigate hoặc history để load lại trang ===> xóa hết dữ liệu của user cũ
                    window.location.href = "/home"
                }}  >

                    {t('logout')}

                </button>
            </Fragment>
        )
    }

    return (
        <header className="p-4 bg-coolGray-100 text-coolGray-800 bg-opacity-40 bg-black text-white fixed w-full z-10" >

            <div className="container flex justify-between h-16 mx-auto">
                <NavLink to="/" aria-label="Back to homepage" className="flex items-center p-2">
                    <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cyberlearn.vn" />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink to="/home" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white" activeClassName="border-b-2 border-white">Home</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/contact" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white" activeClassName="border-b-2 border-white">Contact</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/news" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white" activeClassName="border-b-2 border-white">News</NavLink>
                    </li>

                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderLogin()}

                    <Select defaultValue="en" style={{ width: 120 }} onChange={handleChange}>
                        <Option value="chi">China</Option>
                        <Option value="en">English</Option>
                        <Option value="vi">VietNam</Option>
                    </Select>
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-coolGray-800">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                {/* {t("hello.2")} */}
            </div>
        </header>

    )
}
