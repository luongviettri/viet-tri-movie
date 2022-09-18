import { Fragment, useEffect, useState } from "react";
import { Route, Redirect } from "react-router";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { useSelector } from "react-redux";
import { history } from "../../App";
import { NavLink } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Films', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Showtime', '9', <FileOutlined />),
];

const AdminTemplate = (props) => { //path, exact, Component
    const [collapsed, setCollapsed] = useState(false);
    const { Component, ...restProps } = props;
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const onCollapse = collapsed => {
        // console.log(collapsed);
        setCollapsed(collapsed);
    };
    // ! logic: khi vừa vào trang phải cho scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    // ! xử lý: Nếu chưa Login hoặc ko phải người quản trị ( LocalStorage chưa có token ) thì mời đi thẳng về trang login nghen.
    if (!localStorage.getItem(USER_LOGIN)) {
        alert("Ban khong co quyen truy cap")
        return (
            <Redirect to="/" />
        )
    }
    if (userLogin.maLoaiNguoiDung != "QuanTri") {
        alert("Ban khong co quyen truy cap")
        return (
            <Redirect to="/" />
        )
    }

    const operations = <Fragment>
        <button onClick={() => {
            history.push("/profile")
        }} >
            <div style={{ width: 50, height: 50, display: "flex", justifyContent: "center", alignItems: "center" }}
                className="ml-5 rounded-full bg-red-200 text-2xl"
            >
                {userLogin.taiKhoan.substr(0, 1)}
            </div>
            Hello! {userLogin.taiKhoan}
        </button>
        <button className="text-blue-800" onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            // ! đẩy user về login ==>> dùng lệnh này thay vì navigate hoặc history để load lại trang ===> xóa hết dữ liệu của user cũ
            window.location.href = "/home"
        }}  > Đăng xuất </button>
    </Fragment>





    // return (
    //     <Route {...restProps} render={(propsRoute) => {
    //         return (
    //             <>
    //                 <Layout

    //                     style={{
    //                         minHeight: '100vh',
    //                     }}
    //                 >
    //                     <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
    //                         <div className="logo p-5">
    //                             <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="..." />
    //                         </div>
    //                         <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    //                     </Sider>
    //                     <Layout className="site-layout"
    //                     >
    //                         <Header

    //                             className="site-layout-background bg-white"
    //                             style={{
    //                                 padding: 0,
    //                             }}
    //                         >
    //                             <div className="text-right pr-10 pt-1 bg-white">{operations}</div>
    //                         </Header>
    //                         {/* //! chỗ này render ra component của mình */}
    //                         <Component  {...propsRoute} />

    //                         {/* <Content
    //                             style={{
    //                                 margin: '0 16px',
    //                             }}
    //                         >
    //                             <Breadcrumb
    //                                 style={{
    //                                     margin: '16px 0',
    //                                 }}
    //                             >
    //                                 <Breadcrumb.Item>User</Breadcrumb.Item>
    //                                 <Breadcrumb.Item>Bill</Breadcrumb.Item>
    //                             </Breadcrumb>
    //                             <div
    //                                 className="site-layout-background"
    //                                 style={{
    //                                     padding: 24,
    //                                     minHeight: 360,
    //                                 }}
    //                             >
    //                                 Bill is a cat.
    //                             </div>
    //                         </Content> */}
    //                         <Footer
    //                             style={{
    //                                 textAlign: 'center',
    //                             }}
    //                         >
    //                             Ant Design ©2018 Created by Ant UED
    //                         </Footer>
    //                     </Layout>
    //                 </Layout>
    //             </>
    //         )
    //     }} />
    // )

    return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match
        return <Fragment>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo p-5">
                        <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="..." />
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <NavLink to="/admin/users">Users</NavLink>
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<FileOutlined />} title="Films">
                            <Menu.Item key="10" icon={<FileOutlined />}>
                                <NavLink to="/admin/films">Films</NavLink>

                            </Menu.Item>
                            <Menu.Item key="11" icon={<FileOutlined />}>
                                <NavLink to="/admin/films/addnew">Add new</NavLink>


                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="3" icon={<DesktopOutlined />}>
                            <NavLink to="/admin/showtimes">Showtime</NavLink>

                        </Menu.Item>
                        {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9" icon={<FileOutlined />}>
                            Files
                        </Menu.Item> */}
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} >
                        <div className="text-right pr-10 pt-1">{operations}</div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: '85vh' }}>
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </Fragment>
    }} />

}
export default AdminTemplate

