import axios from 'axios';

export class quanLyMonAnService {
    layDanhSachMonAn = () => {
        return axios({
            url:"http://localhost:8080/dish",
            method:'GET'
        })
    }
}

export const qlMonAnService = new quanLyMonAnService();