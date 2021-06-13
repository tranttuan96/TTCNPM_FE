import axios from 'axios';
import {domain} from '../setting/config';
export class quanLyDonHangService {
    xacNhanDatMon = (cartInfo) => {
        return axios({
            url:`${domain}/order`,
            method:'POST',
            data: cartInfo
        })
    };
    layThongTinDonHang = (orderID) => {
        return axios({
            url:`${domain}/order/${orderID}`,
            method:'GET',
        })
    };
    thucHienThanhToan = (paymentInfo) => {
        return axios({
            url:`${domain}/checkout`,
            method:'POST',
            data: paymentInfo
        })
    };
    capNhatThanhToanThanhCong = (orderID, transactionInfo) => {
        return axios({
            url:`${domain}/order/${orderID}/updatePayment`,
            method:'POST',
            data: transactionInfo
        })
    };

    layDonHang = () => {
        return axios({
            url:`${domain}/order`,
            method:'GET'
        })
    };
    capNhatDaNau = (orderID) => {
        return axios({
            url:`${domain}/order/${orderID}/cookDone`,
            method:'PUT'
        })
    };

}

export const qlDonHangService = new quanLyDonHangService();