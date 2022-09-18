import axios from 'axios'
import { DOMAIN } from '../../util/settings/config';
import { SET_CAROUSEL } from './types/CarouselType';
import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { SET_DANH_SACH_PHIM } from './types/QuanLyPhimTypes';
import { quanLyNguoiDungService } from '../../services/QuanLyNguoiDungService';
import { DANG_NHAP_ACTION } from './types/QuanLyNguoiDungTypes';
import { message } from 'antd';
import { history } from '../../App';

export const dangNhapAction = (user) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.dangNhap(user);
            if (status == 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: data.content,
                })
                message.success("Bạn đăng nhập thành công rồi nà", 1);
                //! chuyển hướng về trang trước đó
                setTimeout(() => {
                    history.goBack();
                }, 1000)
            } else {
                // message("error", "hất bại rồi nà");
                console.log("có lỗi gì goy");
            }

        } catch (err) {
            console.log('err: ', err);
        }
    };
}

export const layThongTinNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            console.log("Vo day");
            const { data, status } = await quanLyNguoiDungService.layLichSuDatVe();
            console.log('data: >>>', data);
            if (status == 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinNguoiDung: data.content,
                })
            } else {
                console.log("có lỗi gì goy");
            }

        } catch (err) {
            console.log('err: ', err);
        }
    };
}

