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
}

export const qlDonHangService = new quanLyDonHangService();