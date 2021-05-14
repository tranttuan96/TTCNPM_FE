import React, {useState, useEffect} from 'react'
import { qlMonAnService } from "../../services/quanLyMonAnService"

export default function Homepage() {

    const [danhSachMonAn, setDanhSachMonAn] = useState([]);

    useEffect(() => {
        //Gọi service Api set lại state danhSachMonAn
        qlMonAnService.layDanhSachMonAn().then(res => {
            setDanhSachMonAn(res.data);
        }).catch(error => {
            console.log(error.response.data);
        });
    }, []);


    return (
        <div>
            Trang chủ đặt món - Test commit Branch
            
        </div>
    )
}
