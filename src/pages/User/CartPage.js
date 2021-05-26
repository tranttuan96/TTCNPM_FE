import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from "react-router-dom"
import { capNhatSoLuongMonAction, xoaMonAction, xoaGioHangAction } from "../../redux/actions/GioHangAction"
import { qlDonHangService } from "../../services/quanLyDonHangService"
import { domain } from '../../setting/config';
import "../../assets/scss/Layout/User/Cartpage.scss"
import CurrencyFormat from 'react-currency-format';

export default function CartPage() {

    const [isConfirm, setIsConfirm] = useState(false);
    const [orderInfo, setOrderInfo] = useState({});
    const dispatch = useDispatch();
    const thongTinGioHang = useSelector((state) => state.GioHangReducer)

    const updateQuantity = (dishID, updateType) => {
        dispatch(capNhatSoLuongMonAction(dishID, updateType))
    }

    const deleteItem = (dishID) => {
        dispatch(xoaMonAction(dishID))

    }

    const confirmOrder = () => {
        let cartInfo = {
            totalPrice: thongTinGioHang.totalPrice,
            orderItems: thongTinGioHang.gioHang
        }
        qlDonHangService.xacNhanDatMon(cartInfo).then(res => {
            setOrderInfo(res.data);
            setIsConfirm(true);
            dispatch(xoaGioHangAction())
        }).catch(error => {
            console.log(error.response.data);
        });
    }

    const renderOrderConfirmed = () => {
        return <div className="orderConfirmed">
            <div className="wrapper">
                <div className="notification">Đặt hàng thành công.</div>
                <div className="orderID">Mã đơn hàng: {orderInfo.orderID}</div>
                <NavLink to={`/checkout/${orderInfo.orderID}`} className="btn btn-primary">Tiến hành thanh toán</NavLink>
            </div>
        </div>
    }

    const renderListItem = () => {
        return thongTinGioHang.gioHang.map((item, index) => {
            return <div key={index} className="col-12 item">
                <div className="itemInfo">
                    <div className="itemInfo__img">
                        <img src={`${domain}/${item.photo}`} className="card-img-top" alt="dishImg" />
                    </div>
                    <div className="itemInfo__detail">
                        <div className="itemInfo__name">{item.name}</div>
                        <div className="itemInfo__price"><CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></div>

                        <button className="btn btn-danger" onClick={() => deleteItem(item.id)}>Xóa món</button>
                    </div>

                </div>
                <div className="itemChange">
                    <button className="btn btn-danger" onClick={() => updateQuantity(item.id, "giam")}>-</button>
                    <span>{item.quantity}</span>
                    <button className="btn btn-primary" onClick={() => updateQuantity(item.id, "tang")}>+</button>
                </div>
            </div>
        })
    }

    const renderEmptyCart = () => {
        return <div className="emptyCart">
            <div className="wrapper">
                <img src={"./images/emptyCartIcon.png"}></img>
                <div className="notification">Không có món ăn nào trong giỏ hàng của bạn.</div>
                <NavLink to="/" className="btn btn-primary">Chọn món ngay</NavLink>
            </div>
        </div>
    }


    const renderCartInfo = () => {
        return <div className="notEmptyCart">
            <h3 className="title">Giỏ hàng ({thongTinGioHang.totalQuantity} sản phẩm)</h3>
            <div className="row">
                <div className="listItem col-9 row">
                    {renderListItem()}
                </div>
                <div className="summary col-3">
                    <div className="summary_content">
                        <div className="totalPrice">
                            <div className="totalPrice__label">
                                Tạm tính
                    </div>
                            <div className="totalPrice__value">
                                <CurrencyFormat value={thongTinGioHang.totalPrice} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                            </div>
                        </div>
                        <div className="finalPrice">
                            <div className="finalPrice__label">
                                Thành tiền
                    </div>
                            <div className="finalPrice__value">
                                <CurrencyFormat value={thongTinGioHang.totalPrice} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                                <div className="description">(Đã bao gồm VAT nếu có)</div>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-success" onClick={() => confirmOrder()}>Tiến hành đặt món</button>
                </div>
            </div>
        </div>
    }

    return (
        <div className="cartPage">
            {isConfirm ? renderOrderConfirmed() : (thongTinGioHang.totalPrice === 0 ? renderEmptyCart() : renderCartInfo())}
        </div>
    )
}
