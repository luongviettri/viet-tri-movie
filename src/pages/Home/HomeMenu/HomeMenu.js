import React, { Fragment, PureComponent } from "react";

import { Tabs, Radio, Space } from "antd";
import { divide } from "lodash";
import { NavLink } from "react-router-dom";
import moment from "moment/moment";

const { TabPane } = Tabs;

export default class Demo extends React.PureComponent {
    state = {
        tabPosition: "left",
    };

    changeTabPosition = (e) => {
        this.setState({ tabPosition: e.target.value });
    };

    renderHeThongRap = () => {
        let { heThongRapChieu } = this.props;
        // <TabPane tab={<img src="https://picsum.photos/200" className="rounded-full" width="50" />} key="1">
        //     Content of Tab 1
        // </TabPane>
        // ! tab ==>  để hiển thị cái hình của tab
        //! bên trong của thẻ Tabs ==> để hiển thị thông tin bên phải 
        return heThongRapChieu?.map((heThongRap, index) => {
            let { tabPosition } = this.state;
            return (
                <TabPane
                    tab={
                        <img
                            src={heThongRap.logo}
                            className="rounded-full"
                            width="50"
                        />
                    }
                    key={index}
                >
                    <Tabs tabPosition={tabPosition}>
                        {heThongRap.lstCumRap?.map((cumRap, index) => {
                            return (
                                <TabPane
                                    tab={
                                        <div style={{
                                            width: "300px",
                                            display: "flex"
                                        }} >
                                            <img src={"https://picsum.photos/50"} width="50" alt="abc" />
                                            <div className="text-left ml-2">
                                                {cumRap.tenCumRap}
                                                <div className="text-red-500">Chi tiết</div>
                                            </div>
                                        </div>
                                    }
                                    key={index}
                                >
                                    {/* 
                                    //! Load phim tương ứng
                                    //! thuộc tính onError ==> cài hình ảnh mặc định nếu ảnh trên API bị lỗi
                                    */}

                                    {cumRap.danhSachPhim.slice(0, 4).map((phim, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <div className="my-5">
                                                    <div style={{ display: "flex" }} >
                                                        <img
                                                            style={{
                                                                height: 75,
                                                                width: 75
                                                            }}
                                                            src={phim.hinhAnh} alt={phim.tenPhim}
                                                            onError={(event) => {
                                                                event.target.onerror = null;
                                                                event.target.src = "https://picsum.photos/75/75"
                                                            }}
                                                        />
                                                        <div className="ml-2">
                                                            <h1 className="text-2xl text-green-700" >{phim.tenPhim}</h1>
                                                            <p>{cumRap.diaChi}</p>
                                                            <div className="grid grid-cols-6 gap-6">
                                                                {phim.lstLichChieuTheoPhim?.slice(0, 12).map((lichChieu, index) => {
                                                                    return (
                                                                        <NavLink to={`/checkout/${lichChieu.maLichChieu}`} className="text-xl text-green-400" key={index} >
                                                                            {moment(lichChieu.ngayChieuGioChieu).format("hh:mm A")}
                                                                        </NavLink>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Fragment>
                                        )
                                    })}

                                </TabPane>
                            )
                        })}
                    </Tabs>
                </TabPane>
            );
        });
        return;
    };

    render() {
        const { tabPosition } = this.state;
        return (
            <>
                <Tabs tabPosition={tabPosition}>
                    {this.renderHeThongRap()}

                    {/* <TabPane tab={<img src="https://picsum.photos/200" className="rounded-full" width="50" />} key="2">
                        Content of Tab 2
                    </TabPane>
                    <TabPane tab={<img src="https://picsum.photos/200" className="rounded-full" width="50" />} key="3">
                        Content of Tab 3
                    </TabPane> */}
                </Tabs>
            </>
        );
    }
}
