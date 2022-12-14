import { baseService } from "./baseService";
import { GROUPID } from '../util/settings/config'
export class QuanLyNguoiDungService extends baseService {
    constructor() {
        super();
    }
    dangNhap = (thongTinDangNhap) => {
        return this.post(`api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
    }
    layLichSuDatVe = () => {
        return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }
}



export const quanLyNguoiDungService = new QuanLyNguoiDungService();
