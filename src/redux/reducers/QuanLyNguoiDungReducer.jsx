import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG } from "../actions/types/QuanLyNguoiDungTypes"
// ! xử lý lưu thông tin đăng nhập của user
let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
    userLogin: user,
    thongTinNguoiDung: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case DANG_NHAP_ACTION: {
            const { thongTinDangNhap } = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
            localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
            return { ...state, userLogin: thongTinDangNhap }
        }

        case SET_THONG_TIN_NGUOI_DUNG: {
            return { ...state, thongTinNguoiDung: action.thongTinNguoiDung }
        }

        default:
            return state
    }
}
