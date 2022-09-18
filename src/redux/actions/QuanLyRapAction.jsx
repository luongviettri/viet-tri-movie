import axios from 'axios'
import { DOMAIN } from '../../util/settings/config';
import { SET_CAROUSEL } from './types/CarouselType';
import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { SET_DANH_SACH_PHIM } from './types/QuanLyPhimTypes';
import { quanLyRapService } from '../../services/QuanLyRapService';
import { SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU } from './types/QuanLyRapTypes';
import { DISPLAY_LOADING, HIDE_LOADING } from './types/LoadingTypes';

export const layDanhSachHeThongRapAction = () => {

    return async (dispatch) => {
        try {
            const { data, status } = await quanLyRapService.layDanhSachHeThongRap();
            if (status == 200) {
                dispatch({
                    type: SET_HE_THONG_RAP_CHIEU,
                    heThongRapChieu: data.content
                })
            }
        } catch (error) {
            console.log('error: ', error);
        }
    }
}
export const layThongTinChiTietPhim = (id) => {

    return async (dispatch) => {
        try {
            dispatch({
                type: DISPLAY_LOADING
            });
            const { data, status } = await quanLyRapService.layThongTinLichChieuPhim(id);
            if (status == 200) {
                await dispatch({
                    type: SET_CHI_TIET_PHIM,
                    filmDetail: data.content
                })
                await dispatch({
                    type: HIDE_LOADING
                });
            }
        } catch (error) {
            await dispatch({
                type: HIDE_LOADING
            });
            console.log('error: ', error);
        }
    }
}

