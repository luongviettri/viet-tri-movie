import { Fragment, useEffect } from "react";
import { Route, Redirect } from "react-router";
import { USER_LOGIN } from "../../util/settings/config";



const CheckoutTemplate = (props) => { //path, exact, Component

    const { Component, ...restProps } = props;
    // ! logic: khi vừa vào trang phải cho scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    // ! xử lý: Nếu chưa Login ( LocalStorage chưa có token ) thì mời đi thẳng về trang login nghen.
    if (!localStorage.getItem(USER_LOGIN)) {
        return (
            <Redirect to="/login" />
        )
    }

    return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match

        return (
            <Fragment>
                <Component {...propsRoute} />

            </Fragment>
        )
    }} />

}
export default CheckoutTemplate

