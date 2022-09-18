import axios from 'axios'
import { DOMAIN } from '../../util/settings/config';
import { SET_CAROUSEL } from './types/CarouselType';
import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from './types/QuanLyPhimTypes';
import { history } from '../../App';

export const layDanhSachPhimAction = (tenPhim = "") => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrFilm: result.data.content
            })
        } catch (errors) {
            console.log('errors', errors)
        }
    };
}
export const themPhimUploadHinhAction = (formData) => {

    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.themPhimUploadHinh(formData);
            alert("them phim thanh cong")
            // dispatch({
            //     type: SET_DANH_SACH_PHIM,
            //     arrFilm: result.data.content
            // })
        } catch (errors) {
            console.log('errors', errors)
        }
    };
}
export const quanLyPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layThongTinPhim(maPhim);
            dispatch({
                type: SET_THONG_TIN_PHIM,
                thongTinFilm: result.data.content
            })
        } catch (errors) {
            console.log('errors', errors)
        }
    };
}
export const capNhatFilmUploadAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.capNhatPhimUpload(formData);
            dispatch(layDanhSachPhimAction());
            history.push("/admin/films")
        } catch (errors) {
            console.log('errors', errors)
        }
    };
}
export const xoaFilmAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.xoaPhim(maPhim);
            dispatch(layDanhSachPhimAction());
            // history.push("/admin/films");
        } catch (errors) {
            console.log('errors', errors)
        }
    };
}

