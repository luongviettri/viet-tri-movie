import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { datGheAction, datVeAction, layChiTietPhongVeAction } from "../../redux/actions/QuanLyDatVeAction";
import { CloseOutlined, UserOutlined, CheckOutlined, SmileOutlined, HomeOutlined } from '@ant-design/icons';
import style from "./Checkout.module.css";
import _ from "lodash"
import "./Checkout.css";
import { CHUYEN_TAB_ACTIVE, DAT_GHE, DAT_VE } from "../../redux/actions/types/QuanLyDatVeTypes";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { Tabs } from 'antd';
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";
import moment from "moment/moment";
import { connection } from "../../index";
import { history } from "../../App";
import { NavLink } from "react-router-dom";
const { TabPane } = Tabs;
console.log('TabPane: ', TabPane);
function Checkout(props) {
    const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
    const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector((state) => state.QuanLyDatVeReducer);
    const { thongTinPhim } = chiTietPhongVe;
    const { danhSachGhe } = chiTietPhongVe;
    const { id } = props.match.params;
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("vo day la 1");
        dispatch(layChiTietPhongVeAction(id));
        const action = layChiTietPhongVeAction(id);
        // !logic:  nếu có 1 browser khác đặt vé thành công thì bên mình load lại giao diện
        connection.on("datVeThanhCong", () => {
            dispatch(action);
        })
        //! logic: khi component render xong thì load tất cả ghế của người khác đang đặt về browser
        connection.invoke("loadDanhSachGhe", id);


        // ! Load những ghế đang được người khác đặt từ server về = socket
        connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
            // !logic: sau khi lấy về thì loại tên mình ra khỏi danh sách, sau đó tạo thành 1 mảng ghế của khách khác, test unique ID ghế = uniqBy sau đó gửi lên reducer
            // ! Loại mình ra khỏi danh sách
            dsGheKhachDat = dsGheKhachDat.filter(item => item.taiKhoan !== userLogin.taiKhoan);
            // ! sau đó tạo thành 1 mảng ghế của khách khác

            let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
                let arrGhe = JSON.parse(item.danhSachGhe);
                return [...result, ...arrGhe];
            }, []);

            // ! unique ID 
            arrGheKhachDat = _.uniqBy(arrGheKhachDat, 'maGhe');

            // ! gửi lên reducer
            dispatch({
                type: DAT_GHE,
                arrGheKhachDat
            })

            // ! chỗ này cài logic là nếu người dùng f5 web hoặc chuyển tab thì xóa đi những ghế đang được họ click ( )
            //! f5 web
            window.addEventListener("beforeunload", clearGhe);
            // !chuyển tab--> component will unmount --> return trong useEffect

            return () => {
                clearGhe();
                window.removeEventListener("beforeunload", clearGhe);
            }

        });


    }, []);




    const clearGhe = function (event) {
        connection.invoke("huyDat", userLogin.taiKhoan, id);
    }

    const renderSeats = () => {
        return danhSachGhe.map((ghe, index) => {
            // ! start xử lý css ghế đang đặt
            let indexGheDangDat = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe == ghe.maGhe);
            let classGheDangDat = indexGheDangDat != -1 ? "gheDangDat" : "";
            // ! end xử lý css ghế đang đặt

            // ! start css ghế được mình đặt
            let classGheDaDuocDat = ghe.taiKhoanNguoiDat == userLogin.taiKhoan ? "gheDaDuocDat" : ""
            // ! end css ghế được mình đặt

            //todo: start css ghế người khác đang đặt 
            let indexGheKhachDat = danhSachGheKhachDat.findIndex(gheKD => gheKD.maGhe == ghe.maGhe);
            let classGheKhachDat = indexGheKhachDat != -1 ? "gheKhachDat" : "";
            //todo: end css ghế người khác đang đặt 
            let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
            let classGheDaDat = ghe.daDat ? "gheDaDat" : "";
            return (
                <Fragment key={index}>
                    <button
                        onClick={() => {
                            dispatch(datGheAction(
                                ghe, id
                            ))
                        }}
                        disabled={ghe.daDat || classGheKhachDat != ""}
                        className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat}  ${classGheDaDuocDat} ${classGheKhachDat} text-center `}
                    >
                        {/* //! nếu đã đặt thì so sánh xem mình đặt hay người khác đặt==> nếu người khác đặt thì xem coi là đang đặt hay đã đặt */}
                        {
                            ghe.daDat ?
                                classGheDaDat != "" ?
                                    <UserOutlined style={{ marginBottom: 7.5, fontWeight: "bold" }} />
                                    :
                                    <CloseOutlined style={{ marginBottom: 7.5, fontWeight: "bold" }} />
                                :
                                classGheKhachDat != "" ?
                                    <SmileOutlined />
                                    :
                                    ghe.stt
                        }
                    </button>
                    {/* 
                    //! sau mỗi 16 cái ghế thì sẽ  xuống hàng
                     */}
                    {(index + 1) % 16 === 0 ? <br /> : ""}
                </Fragment>
            );
        });
    };
    return (
        <div className=" h-screen ">
            <div className="grid grid-cols-12">
                <div className="col-span-9">
                    <div className="flex flex-col items-center mt-5">
                        <div
                            className="bg-black"
                            style={{
                                width: "80%",
                                height: 15,
                            }}
                        ></div>
                        <div className={`${style.trapezoid} text-center`}>
                            <h3 className="mt-3 text-black">Màn hình</h3>
                        </div>
                        <div>
                            {renderSeats()}
                        </div>
                    </div>
                    <div className="mt-5 flex justify-center">
                        <table className="divide-y divide-gray-200 w-2/3">
                            <thead className="bg-gray-50 p-5" >
                                <tr>
                                    <th>Ghế chưa đặt</th>
                                    <th>Ghế đang đặt</th>
                                    <th>Ghế vip đặt</th>
                                    <th>Ghế đã đặt</th>
                                    <th>Ghế mình đặt</th>
                                    <th>Ghế khách đặt</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="text-center">
                                        <button className="ghe  ">
                                            <CheckOutlined style={{ marginBottom: 7.5, fontWeight: "bold" }} />
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button className="ghe gheDangDat  ">
                                            <CheckOutlined style={{ marginBottom: 7.5, fontWeight: "bold" }} />
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button className="ghe gheVip  ">
                                            <CheckOutlined style={{ marginBottom: 7.5, fontWeight: "bold" }} />
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button className="ghe gheDaDat  ">
                                            <CheckOutlined style={{ marginBottom: 7.5, fontWeight: "bold" }} />
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button className="ghe gheDaDuocDat  ">
                                            <CheckOutlined style={{ marginBottom: 7.5, fontWeight: "bold" }} />
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button className="ghe gheKhachDat gheDaDuocDat  ">
                                            <CheckOutlined style={{ marginBottom: 7.5, fontWeight: "bold" }} />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-3  h-screen">
                    <div className="flex flex-col justify-between h-full pt-5">
                        <div style={{ height: "92%" }}>
                            <h3 className="text-green-400 text-center text-2xl"> {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                return tongTien += ghe.giaVe
                            }, 0).toLocaleString()} đ</h3>
                            <hr />
                            <h3 className="text-xl">{thongTinPhim.tenPhim}</h3>
                            <p>Địa điểm: {thongTinPhim.diaChi}</p>
                            <p>
                                Ngày chiếu: {thongTinPhim.ngayChieu} {thongTinPhim.gioChieu}
                            </p>
                            <hr />
                            <div className="flex flex-row my-5">
                                <div className="w-4/5">
                                    <span className="text-red-400 text-lg">Ghế</span>
                                    {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <span className="text-green-500 text-xl mx-2" >
                                                    {gheDD.stt}
                                                </span>
                                            </Fragment>
                                        )
                                    })}
                                </div>
                                <div className="text-right col-span-1">
                                    <span className="text-green-800 text-lg">
                                        {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                            return tongTien += ghe.giaVe
                                        }, 0).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                            <hr />
                            <div className="my-5">
                                <i>Email</i>
                                <br />
                                {userLogin.email}
                            </div>
                            <div className="my-5">
                                <i>Phone</i>
                                <br />
                                {userLogin.soDT}
                            </div>
                            <hr />
                        </div>
                        <div style={{ height: "8%" }}>
                            <div
                                onClick={() => {
                                    const thongTinDatVe = new ThongTinDatVe();
                                    thongTinDatVe.maLichChieu = id;
                                    thongTinDatVe.danhSachVe = danhSachGheDangDat;
                                    dispatch(datVeAction(thongTinDatVe))
                                }}
                                className="bg-green-300 h-full text-white w-full text-center py-3 font-bold text-2xl cursor-pointer">
                                Đặt vé nà
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function KetQuaDatVe(props) {
    const dispatch = useDispatch();
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log('thongTinNguoiDung: ', thongTinNguoiDung);


    // ! sau khi render xong thì lấy thông tin người dùng về gán lên giao diện, API đang lỗi
    useEffect(() => {
        // const action = layThongTinNguoiDungAction();
        // dispatch(action);
    }, [])

    const renderTicketItem = () => {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
            const seats = _.first(ticket.danhSachGhe);
            return (
                <Fragment key={index.toString()}>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://picsum.photos/200/200" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
                                <p className="text-gray-500">
                                    Giờ chiếu: {moment(ticket.ngayDat).format("hh:mm A")} - Ngày chiếu {moment(ticket.ngayDat).format("DD-MM-YYYY")}.
                                </p>
                                <p>Địa điểm: {seats.tenHeThongRap} - {seats.tenCumRap}</p>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        })
    }

    return (
        <div className="p-5">
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-900">Lịch sử đặt vé nà</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Xem kĩ thông tin đi nà</p>
                    </div>
                    <div className="flex flex-wrap -m-2">
                        {renderTicketItem()}

                    </div>
                </div>
            </section>
        </div>
    )
}

export default function (props) {
    const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

    let { tabActive } = useSelector(state => state.QuanLyDatVeReducer);
    const dispatch = useDispatch();
    // ! dùng component will unmount để set lại tab active 
    useEffect(() => {
        return () => {
            dispatch({
                type: CHUYEN_TAB_ACTIVE,
                number: '1'
            })
        }
    }, [])

    // ! nếu vào dc đây thì phải lun lun đã đăng nhập rồi ==> ko cần check như video
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



    return (
        <div className="p-5">
            <Tabs
                tabBarExtraContent={operations}
                onChange={(key) => {
                    console.log('key: ', key);
                    dispatch({
                        type: CHUYEN_TAB_ACTIVE,
                        tabNumber: key
                    })
                }}
                defaultActiveKey={"1"} activeKey={tabActive}  >
                <TabPane tab="01 CHỌN GHẾ VÀ THANH TOÁN " key="1">
                    <Checkout {...props} />
                </TabPane>
                <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
                    <KetQuaDatVe />
                </TabPane>
                <TabPane
                    tab={
                        <NavLink to="/home" >
                            <HomeOutlined />
                        </NavLink>
                    } key="3">

                </TabPane>
            </Tabs>
        </div>
    )
}
