import { SET_HE_THONG_RAP_CHIEU } from "../actions/types/QuanLyRapTypes"

const initialState = {
    heThongRapChieu: [
        {
            "maHeThongRap": "BHDStar",
            "tenHeThongRap": "BHD Star Cineplex",
            "biDanh": "bhd-star-cineplex",
            "logo": "https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png"
        },
        {
            "maHeThongRap": "CGV",
            "tenHeThongRap": "cgv",
            "biDanh": "cgv",
            "logo": "https://movienew.cybersoft.edu.vn/hinhanh/cgv.png"
        }
    ]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_HE_THONG_RAP_CHIEU: {
            state.heThongRapChieu = action.heThongRapChieu;
            return { ...state }
        }
        default:
            return state
    }
}
