import { Button, CustomCard } from '@tsamantanis/react-glassmorphism'
import React, { useEffect, useState } from 'react'
import "../../assets/styles/circle.css"
import { Radio, Space, Tabs, Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapAction';
import moment from 'moment/moment';
import { StarFilled } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
const { TabPane } = Tabs;
export default function Detail(props) {
    const { filmDetail } = useSelector(state => state.QuanLyPhimReducer);

    const [tabPosition, setTabPosition] = useState('left');
    const dispatch = useDispatch();
    const changeTabPosition = (e) => {
        setTabPosition(e.target.value);
    };
    useEffect(() => {
        const { id } = props.match.params;
        dispatch(layThongTinChiTietPhim(id))
    }, [])

    return (
        <div style={{
            backgroundImage: `url(${filmDetail.hinhAnh})`,
            backgroundSize: "100%",
            backgroundPosition: "center",
            minHeight: "100vh"
        }} >
            <CustomCard
                style={{
                    paddingTop: 150,
                    minHeight: "100vh"
                }}
                effectColor="#fff" // required
                color="rgba(255,255,255,0.4)" // default color is white
                blur={10} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <div className="grid grid-cols-12">
                    <div className="col-span-5 col-start-3">
                        <div className="grid grid-cols-3">
                            <img
                                className='col-span-1'
                                src={filmDetail.hinhAnh}
                                style={{
                                    width: 250,
                                    height: 300
                                }}
                                alt="123" />
                            <div className='col-span-2 ml-5' style={{
                                marginTop: "25%"
                            }}  >
                                <p className='text-sm' >Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}</p>
                                <p className='text-4xl mb-1' >{filmDetail.tenPhim}</p>
                                <p>{filmDetail.moTa}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="flex  flex-col justify-center items-center ">
                            <h1
                                className='text-green-400 text-2xl'>
                                <Rate style={{
                                    color: "#78ed78",
                                    fontSize: 30
                                }} allowHalf
                                    value={filmDetail.danhGia / 2}
                                />
                            </h1>
                            <div className={`c100 p${filmDetail.danhGia * 10} big`}
                                style={{
                                    marginBottom: 0,
                                    marginRight: 0
                                }}
                            >
                                <span
                                    className='cursor-pointer'
                                    style={{
                                        display: "block",
                                        marginTop: "30%"
                                    }}
                                >{filmDetail.danhGia}</span>
                                <div className="slice">
                                    <div className="bar" />
                                    <div className="fill" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="mt-20 ml-72 w-2/3 container bg-white px-5 py-5 ">

                    <Tabs
                        defaultActiveKey="1"
                        centered
                    >
                        <TabPane tab="Lich chieu" key="1" style={{ minHeight: "300px" }} >
                            <div>
                                <Tabs
                                    tabPosition={"left"}
                                >
                                    {filmDetail.heThongRapChieu?.map((htr, index) => {
                                        console.log('htr: ', htr);
                                        return (
                                            <TabPane
                                                tab={
                                                    <div>
                                                        <img src={htr.logo} alt="abc" className='rounded-full' width="50" />
                                                    </div>} key={index}>
                                                {htr.cumRapChieu?.map((cumRap, index) => {
                                                    return (
                                                        <div className='mt-5' key={index}>
                                                            <div className="flex flex-row">
                                                                <img src={cumRap.hinhAnh} alt="123" style={{ width: 60, height: 60 }} />
                                                                <div className="ml-2">
                                                                    <p style={{
                                                                        fontSize: 20,
                                                                        fontWeight: "bold",
                                                                        lineHeight: 1
                                                                    }} >{cumRap.tenCumRap}</p>
                                                                    <p className='text-gray-400' style={{ marginTop: 0 }}>{cumRap.diaChi}</p>
                                                                </div>
                                                            </div>
                                                            <div className="thong-tin-lich-chieu grid grid-cols-4">
                                                                {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                                                                    return (
                                                                        <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className="col-span-1 text-green-800
                                                                        font-bold" >
                                                                            {moment(lichChieu.ngayChieuGioChieu).format("hh:mm A")}
                                                                        </NavLink>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </TabPane>

                                        )
                                    })}
                                </Tabs>
                            </div>
                        </TabPane>
                        <TabPane tab="Thong tin" key="2" style={{ minHeight: "250px" }} >
                            Thong tin
                        </TabPane>
                        <TabPane tab="Danh gia" key="3" style={{ minHeight: "250px" }} >
                            Danh gia
                        </TabPane>

                    </Tabs>
                </div>
            </CustomCard>
        </div>
    )
}
