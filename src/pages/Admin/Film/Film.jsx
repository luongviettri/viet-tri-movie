import React, { Fragment, useEffect } from "react";
import { Button, Table } from "antd";
import { AudioOutlined, SearchOutlined, EditOutlined, DeleteOutlined, CalendarOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { layDanhSachPhimAction, xoaFilmAction } from "../../../redux/actions/QuanLyPhimAction";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";

export default function Film() {
    const { arrFilmDefault } = useSelector((state) => state.QuanLyPhimReducer);
    const data = arrFilmDefault;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layDanhSachPhimAction());
    }, []);
    const columns = [
        {
            title: "maPhim",
            dataIndex: "maPhim",
            value: (text, object) => {
                console.log("text:>>> ", text);
                console.log("object:>>> ", object);
                return <span>{text}</span>;
            },
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ["descend"],
            defaultSortOrder: "descend",
            width: "15%"

        },
        {
            title: "Hình ảnh",
            dataIndex: "hinhAnh",
            render: (text, film, index) => {
                return (
                    <Fragment key={index}>
                        <img src={film.hinhAnh} alt="abc" width={50} height={50} onError={(e) => {
                            e.target.onError = null;
                            e.target.src = `https://picsum.photos/id/${index}/200/300`
                        }} />
                    </Fragment>
                );
            },
            width: "15%"
        },
        {
            title: "Tên phim",
            dataIndex: "tenPhim",
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();
                if (tenPhimA > tenPhimB) {
                    return 1;
                }
                return -1
            },
            sortDirections: ["descend", "ascend"],
            width: "30%"
        },
        {
            title: "Mô tả",
            dataIndex: "moTa",
            render: (text, film, index) => {
                return (
                    <Fragment key={index}>
                        {film.moTa.length > 50 ? film.moTa.substr(0, 50) + "..." : film.moTa}
                    </Fragment>
                );
            },
            width: "20%"
        },
        {
            title: "Hành động",
            dataIndex: "hanhDong",
            render: (text, film, index) => {

                return (
                    <Fragment key={index}>
                        <NavLink

                            className="mr-2 text-2xl" to={`/admin/films/edit/${film.maPhim}`}>
                            <span className="text-green-300"><EditOutlined /></span>
                        </NavLink>

                        <span
                            onClick={() => {
                                // console.log("xoa");
                                if (window.confirm("Bạn có chắc muốn xóa hem dạ ?")) {
                                    dispatch(xoaFilmAction(film.maPhim));
                                }
                            }}
                            className="text-2xl cursor-pointer" to="/">
                            <span className="text-red-500"><DeleteOutlined /></span>
                        </span>
                        <NavLink
                            className="mr-2 text-2xl" to={`/admin/films/showtimes/${film.maPhim}`}>
                            <span className="text-blue-300"><CalendarOutlined /></span>
                        </NavLink>
                    </Fragment>
                );
            },
            width: "20%"
        },
    ];
    const { Search } = Input;
    const onSearch = (value) => {
        dispatch(layDanhSachPhimAction(value));
    };

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };



    console.log("arrFilmDefault: ", arrFilmDefault);
    return (
        <div className="container">
            <h3 className="text-4xl">Quản lý phim</h3>
            <Button className="mb-5"
                onClick={() => {
                    history.push("/admin/films/addnew")
                }}
            >Thêm phim </Button>
            <Search
                className="mb-5"
                placeholder="input search text"
                enterButton={<SearchOutlined />}
                onSearch={onSearch}
                size="large"
            />

            <Table columns={columns} dataSource={data} onChange={onChange} />
        </div>
    );
}
