import React, { useEffect, useState } from 'react'
import { Button, Cascader, Checkbox, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import { quanLyRapService } from '../../../services/QuanLyRapService';
import { useFormik } from 'formik';
import moment from 'moment/moment';
import { quanLyDatVeService } from '../../../services/QuanLyDatVeService';
export default function Showtime(props) {
    console.log('props: ', props);

    const [state, setState] = useState({
        heThongRapChieu: [],
        cumRapChieu: [],
    })
    console.log('heThongRapChieu: ', state.heThongRapChieu);
    const { id } = props.match.params;
    useEffect(async () => {
        // ! gọi API lấy hệ thống rạp
        try {

            let result = await quanLyRapService.layThongTinHeThongRap();

            setState({
                ...state,
                heThongRapChieu: result.data.content
            })


        } catch (error) {
            console.log('error: ', error);
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            maPhim: id,
            ngayChieuGioChieu: "",
            maRap: "",
            giaVe: ""
        },
        onSubmit: async values => {
            // console.log('values: ', values);
            // alert(JSON.stringify(values, null, 2));
            try {
                const result = await quanLyDatVeService.taoLichChieu(values);
                alert("Them thanh cong")
            } catch (error) {
                console.log('error: ', error);
            }
        },
    });




    const convertSelectHTR = () => {
        return state.heThongRapChieu?.map((HTR, index) => {
            return (
                { label: HTR.tenHeThongRap, value: HTR.tenHeThongRap }
            )
        })
    }

    const handleChangeHeThongRap = async (values) => {
        console.log('values: ', values);

        try {

            let result = await quanLyRapService.layThongTinCumRap(values);
            console.log('result: ', result);
            setState({
                ...state, cumRapChieu: result.data.content
            })
            // state.cumRapChieu = result.data.content;
            // console.log('result: ', result);



        } catch (error) {
            console.log();
        }

    }

    const renderCumRap = () => {
        return state.cumRapChieu?.map((cumRap, index) => {
            return { label: cumRap.tenCumRap, value: cumRap.maCumRap }
        })
    }

    const handleChangeCumRap = (value) => {
        console.log('values: ', value);
        formik.setFieldValue("maRap", value);
        // return
    }

    const onChangeDate = (values) => {
        // console.log('values: ', values);
        formik.setFieldValue("ngayChieuGioChieu", moment(values).format("DD/MM/YYYY hh:mm:ss"))

    }
    const onOk = (values) => {
        // console.log('values: ', values);
        formik.setFieldValue("ngayChieuGioChieu", moment(values).format("DD/MM/YYYY hh:mm:ss"))
    }
    const onChangeInputNumber = (value) => {
        // console.log('values: ', values);
        formik.setFieldValue("giaVe", value);
    }
    return (
        <Form
            onSubmitCapture={formik.handleSubmit}
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}

        >
            <Form.Item
                label="Hệ thống rạp"
            >
                <Select options={convertSelectHTR()} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
            </Form.Item>
            <Form.Item
                label="Cụm rạp"
            >
                <Select options={renderCumRap()} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp" />
            </Form.Item>
            <Form.Item
                label="Ngày chiếu giờ chiếu"
            >
                <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeDate} onOk={onOk} />
            </Form.Item>

            <Form.Item
                label="Giá vé"
            >
                <InputNumber onChange={onChangeInputNumber} />
            </Form.Item>
            <Form.Item
                label="Chức năng"
            >
                <Button htmlType='submit' label="Chức năng">Tạo lịch chiếu</Button>
            </Form.Item>


        </Form>

    )
}
