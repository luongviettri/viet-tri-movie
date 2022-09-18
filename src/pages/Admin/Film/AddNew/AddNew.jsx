import React, { useState } from "react";
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from "antd";
import { useFormik } from "formik";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { themPhimUploadHinhAction } from "../../../../redux/actions/QuanLyPhimAction";
import { GROUPID } from "../../../../util/settings/config";
export default function AddNew() {
    const [componentSize, setComponentSize] = useState("default");
    const [imgSrc, setImgSrc] = useState(null);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            tenPhim: "",
            trailer: "",
            moTa: "",
            ngayKhoiChieu: "",
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {}
        },
        onSubmit: (values) => {
            console.log('values: ', values);



            values.maNhom = GROUPID;




            // ! logic: cần gửi dữ liệu này lên API nhưng API nhận vào dữ liệu dạng formData  ( vì có hình ảnh) ==> phải convert dữ liệu trên giao diện sang dữ liệu dạng formData
            // !1. Tạo đối tượng formData
            let formData = new FormData();
            for (let key in values) {
                if (key !== "hinhAnh") {
                    formData.append(key, values[key]); //! nó nhận vào ts1: tên , ts2: giá trị==>  dùng for in để ko repeat code

                } else { //! nhưng đối với dữ liệu dạng hình ảnh thì phải truyền 3ts    
                    formData.append("File", values.hinhAnh, values.hinhAnh.name);
                    console.log(formData.get("File"));
                }
            }
            // ! gửi dữ liệu về backend
            dispatch(themPhimUploadHinhAction(formData));

        },
    });
    const handleChangeDatePicker = (value) => {
        let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
        formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
    };
    // ! 2 hàm này dùng kĩ thuật closure function => mục đích là để lấy key động ( ko phải hashcode ) ==> ko cần phải gõ lại nhiều
    const handleChangeSwitch = (name) => {
        // ! Switch của antd trả về value ở tham số nên ==> dùng closer function như thế này
        return (value) => {
            formik.setFieldValue(name, value);
        };
    };
    const handleChangeInputNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        };
    };
    // ! xử lý lấy hình ảnh để đưa vào formik
    const handleChangeFile = (event) => {
        // ! lấy file từ event
        let file = event.target.files[0];
        if (//! giới hạn dữ liệu là ảnh
            file.type == "image/jpeg" ||
            file.type == "image/jpg" ||
            file.type == "image/gif" ||
            file.type == "image/png") {
            // ! đem dữ liệu file lưu vào formik
            formik.setFieldValue("hinhAnh", file);
            // ! đọc file để hiển thị ảnh lên giao diện chứ ko liên quan đến gán dữ liệu vào formik
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                setImgSrc(event.target.result);
            }

        }

    }



    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    return (
        // ! submit của form antd là onsubmitcapture==> gắn hàm submit của formik vào
        <Form
            onSubmitCapture={formik.handleSubmit}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            initialValues={{
                size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
        >
            <Form.Item label="Form Size" name="size">
                <Radio.Group>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Tên phim">
                <Input name="tenPhim" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name="trailer" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input name="moTa" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
                <DatePicker onChange={handleChangeDatePicker} format={"DD/MM/YYYY"} />
            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch("dangChieu")} />
            </Form.Item>
            <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch("sapChieu")} />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked">
                <Switch onChange={handleChangeSwitch("hot")} />
            </Form.Item>

            <Form.Item label="Số sao">
                <InputNumber
                    min={1}
                    max={10}
                    onChange={handleChangeInputNumber("danhGia")}
                />
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <input
                    type="file"
                    onChange={handleChangeFile}
                    accept="image/*"
                />
                <br />
                <img src={imgSrc} alt="..." width={150} height={150} />
            </Form.Item>
            <Form.Item label="Tác vụ">
                <button
                    type="submit"
                    className=" bg-green-400 text-white p-2 rounded-md"
                >
                    Thêm phim
                </button>
            </Form.Item>
        </Form>
    );
}
