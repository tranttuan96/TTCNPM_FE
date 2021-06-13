import axios from 'axios';
import {domain} from '../setting/config';
export class quanLyMonAnService {
    layDanhSachMonAn = () => {
        return axios({
            url:`${domain}/dish`,
            method:'GET'
        })
    };
    timKiemMonAn = (keyword) => {
        return axios({
            url:`${domain}/dish/${keyword}`,
            method:'GET'
        })
    }
    capNhatHetMon = (keyword) => {
        return axios({
            url:`${domain}/dish/${keyword}/unavaiable`,
            method:'PUT'
        })
    };
    capNhatConMon = (keyword) => {
        return axios({
            url:`${domain}/dish/${keyword}/available`,
            method:'PUT'
        })
    };
}


export const qlMonAnService = new quanLyMonAnService();