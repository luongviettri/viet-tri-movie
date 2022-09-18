import axios from 'axios'
import { DOMAIN } from '../../util/settings/config';
import { SET_CAROUSEL } from './types/CarouselType';
import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { SET_DANH_SACH_PHIM } from './types/QuanLyPhimTypes';
import { quanLyNguoiDungService } from '../../services/QuanLyNguoiDungService';
import { DANG_NHAP_ACTION } from './types/QuanLyNguoiDungTypes';
import { message } from 'antd';
import { history } from '../../App';
import { quanLyDatVeService } from '../../services/QuanLyDatVeService';
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from './types/QuanLyDatVeTypes';
import { DISPLAY_LOADING, HIDE_LOADING } from './types/LoadingTypes';
import { displayLoadingAction, hideLoadingAction } from './LoadingAction';
import { connection } from '../../index';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';

export const layChiTietPhongVeAction = (maLichChieu) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction);

            const { data, status } = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);
            if (status == 200) {
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: data.content,
                })
            } else {
                console.log("có lỗi gì goy");
            }
            dispatch(hideLoadingAction);

        } catch (err) {
            dispatch(hideLoadingAction);

            console.log('err: ', err);
        }
    };
}
export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
    console.log('thongTinDatVe: ', thongTinDatVe);
    return async (dispatch, getState) => {
        try {
            dispatch(displayLoadingAction)
            const { data, status } = await quanLyDatVeService.datVe(thongTinDatVe);
            // ! đặt await vì dispatch là hàm bất đồng bộ ==> đặt await ở trước thì nó chờ dòng 40 chạy xong mới chạy tiếp dòng 41
            await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu))
            await dispatch({
                type: DAT_VE_HOAN_TAT
            })
            // ! khi đặt vé thành công thì gửi lên socket cho server biết để các browser khác có thể cập nhật giao diện
            let userLogin = getState().QuanLyNguoiDungReducer.userLogin;
            connection.invoke("datGheThanhCong", userLogin.taiKhoan, thongTinDatVe.maLichChieu);
            await dispatch({
                type: CHUYEN_TAB
            })
            dispatch(hideLoadingAction);

        } catch (err) {
            console.log('err: ', err);
            dispatch(hideLoadingAction);

        }
    };
}
export const datGheAction = (ghe, maLichChieu) => {

    return async (dispatch, getState) => {
        // ! getState giúp kết nối với rootReducer
        try {
            await dispatch({
                type: DAT_VE,
                gheDuocChon: ghe
            });
            //Call api về backend 
            let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
            let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;
            console.log('danhSachGheDangDat', danhSachGheDangDat);
            console.log('taiKhoan', taiKhoan);
            console.log('maLichChieu', maLichChieu);
            //Biến mảng thành chuỗi
            danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

            //Call api signalR
            connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu);
            // dispatch(hideLoadingAction);

        } catch (err) {
            dispatch(hideLoadingAction);

        }
    };
}