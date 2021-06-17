import React from 'react'

import Dish from './Dish';
import "../../assets/scss/Layout/User/ListDish.scss"

export default function ListDish(props) {

    let {danhSachMonAn, gioHang} = props;

    const renderListDish = () => {
        if (gioHang.length !== 0) {
            return danhSachMonAn.map((dish, index) => {
                let findIndex = gioHang.findIndex(orderItem => orderItem.id === dish.id);
                if (findIndex === -1) {
                    return <Dish key={index} dish={dish} dishQuantity={0}></Dish>
                }
                else {
                    return <Dish key={index} dish={dish} dishQuantity={gioHang[findIndex].quantity}></Dish>
                }

            })
        }
        else {
            return danhSachMonAn.map((dish, index) => {
                return <Dish key={index} dish={dish} dishQuantity={0}></Dish>
            })
        }
    }



    return (
        <div className="listDish row">
            {renderListDish()}
        </div>
    )
}
