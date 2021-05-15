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
}

export const qlMonAnService = new quanLyMonAnService();