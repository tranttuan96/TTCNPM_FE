import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom"
import { qlMonAnService } from "../../services/quanLyMonAnService"
import "../../assets/scss/Layout/User/Searchpage.scss"
import ListDish from './ListDish';
import CurrencyFormat from 'react-currency-format';

export default function Searchpage(props) {

    const thongTinGioHang = useSelector((state) => state.GioHangReducer)
    const [danhSachMonAn, setDanhSachMonAn] = useState([]);

    useEffect(() => {
        qlMonAnService.timKiemMonAn(props.match.params.tuKhoa).then(res => {
            setDanhSachMonAn(res.data);
        }).catch(error => {
            console.log(error.response.data);
        });
    }, [props.match.params.tuKhoa]);

    const renderCartInfo = () => {
        return <div className="cartInfo__wrapper">
            <div className="cartInfo__detail">
                <span className="cart__quantity">
                    <i className="fa fa-shopping-basket"></i>
                    <span className="cart__count">{thongTinGioHang.totalQuantity}</span>
                </span>
                <span className="cart__price">
                    <CurrencyFormat value={thongTinGioHang.totalPrice} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                </span>
            </div>
            <div className="cartInfo__button">
                <NavLink className="btn btn-secondary" to="/cart" >Đến Giỏ hàng</NavLink>
            </div>
        </div>
    }

    const renderContent = () => {
        if(danhSachMonAn.length === 0) {
            return <h3 className="text-center py-2">Không có kết quả phù hợp.</h3>
        }
        else return <div>
            <h3 className="menu_title">Kết quả tìm kiếm</h3>
            <ListDish danhSachMonAn={danhSachMonAn} gioHang={thongTinGioHang.gioHang}></ListDish>
            {thongTinGioHang.totalQuantity > 0 ? renderCartInfo() : <div></div>}
        </div>
    }

    return (
        <div className="searchPage">
            {renderContent()}
        </div>
    )
}
