import './App.css';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate'
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import Checkout from './pages/Checkout/Checkout';
// import CheckoutTemplate from './templates/CheckoutTemplate/CheckoutTemplate';
import React from 'react';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import Loading from './components/Loading/Loading';
import Profile from './pages/Profile/Profile';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
// import Film from './components/Film/Film';
import Film from './pages/Admin/Film/Film';
import Showtime from './pages/Admin/Showtime/Showtime';
import AddNew from './pages/Admin/Film/AddNew/AddNew';
import Edit from './pages/Admin/Film/Edit/Edit';
import CheckoutTemplate from './templates/CheckoutTemplate/CheckoutTemplate'

// ! dùng lazy để thực hiện tăng UX---> chỉ áp dụng với html, API và hình ảnh sẽ có cách riêng
// const CheckoutTemplate = lazy(() => import('./templates/CheckoutTemplate/CheckoutTemplate'));

// ! history
export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <HomeTemplate path="/profile" exact Component={Profile} />
        <UserTemplate path="/login" exact Component={Login} />
        <UserTemplate path="/register" exact Component={Register} />


        {/* <UserTemplate path="/admin" exact Component={Dashboard} /> */}
        <AdminTemplate path="/admin" exact Component={Dashboard} />
        <AdminTemplate path="/admin/films" exact Component={Film} />
        <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
        <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
        <AdminTemplate path="/admin/users" exact Component={Dashboard} />
        <AdminTemplate path="/admin/films/showtimes/:id" exact Component={Showtime} />
        <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />

        <HomeTemplate path="/" exact Component={Home} />
        {/* <Suspense fallback={<h1>LOADING...</h1>} > */}
        {/* </Suspense> */}

      </Switch>
    </Router>
  );
}

export default App;



