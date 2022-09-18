import { ThongTinPhongVe } from "../../_core/models/ThongTinPhongVe";
import {
    CHUYEN_TAB,
    CHUYEN_TAB_ACTIVE,
    DAT_GHE,
    DAT_VE,
    DAT_VE_HOAN_TAT,
    SET_CHI_TIET_PHONG_VE,
} from "../actions/types/QuanLyDatVeTypes";

const initialState = {
    chiTietPhongVe: new ThongTinPhongVe(),
    danhSachGheDangDat: [
    ],
    tabActive: "1",
    danhSachGheKhachDat: [
        { maGhe: 58602 },
        { maGhe: 58604 },
    ]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CHI_TIET_PHONG_VE: {
            return { ...state, chiTietPhongVe: action.chiTietPhongVe };
        }

        case DAT_VE: {
            let danhSachGheCapNhat = [...state.danhSachGheDangDat];
            let index = danhSachGheCapNhat.findIndex(
                (gheDD) => gheDD.maGhe == action.gheDuocChon.maGhe
            );
            // console.log('index: ', index);
            if (index != -1) {
                danhSachGheCapNhat.splice(index, 1);
            } else {
                danhSachGheCapNhat.push(action.gheDuocChon);
            }
            return { ...state, danhSachGheDangDat: danhSachGheCapNhat };
        }
        case DAT_VE_HOAN_TAT: {
            return { ...state, danhSachGheDangDat: [] }
        }
        case CHUYEN_TAB: {
            state.tabActive = "2";
            return { ...state }
        }
        case CHUYEN_TAB_ACTIVE: {
            // console.log(action);
            return { ...state, tabActive: action.tabActive }
        }
        case DAT_GHE: {

            return { ...state, danhSachGheKhachDat: action.arrGheKhachDat }
        }
        default:
            return state;
    }
};
