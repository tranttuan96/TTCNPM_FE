import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { themMonAction, capNhatSoLuongMonAction } from "../../redux/actions/GioHangAction"
import { domain } from '../../setting/config';
import "../../assets/scss/Layout/User/Dish.scss"
import CurrencyFormat from 'react-currency-format';

export default function Dish(props) {

    const dispatch = useDispatch();
    let { dish, dishQuantity } = props;

    const updateQuantity = (dishID, updateType) => {
        dispatch(capNhatSoLuongMonAction(dishID, updateType))
    }

    const addDish = (dish) => {
        let orderItem = {
            id: dish.id,
            name:dish.name,
            price:dish.price,
            photo:dish.photo,
            status: dish.status,
            quantity: 1,
        }
        dispatch(themMonAction(orderItem))
    }

    const renderOrderBtn = () => {
        if (dishQuantity > 0) {
            return <div className="btnWrapper">
                <button className="btn btn-danger" onClick={() => updateQuantity(dish.id, "giam")}>-</button>
                <span>{dishQuantity}</span>
                <button className="btn btn-primary" onClick={() => updateQuantity(dish.id, "tang")}>+</button>
            </div>
        }
        else {
            return <div className="btnWrapper">
                <button className="btn btn-primary" onClick={() => addDish(dish)}>+</button>
            </div>
        }

    }

    return (
        <div className="col-6 col-lg-3 col-md-4 monAn">
            <div className="card">
                <NavLink to="/"><img src={`${domain}/${dish.photo}`} className="card-img-top" alt="dishImg" /></NavLink>
                <div className="card-body">
                    <h5 className="card-title"><NavLink to="/">{dish.name}</NavLink></h5>
                    <div className="wrapper">
                        <p className="card-text"><CurrencyFormat value={dish.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} /></p>
                        <div className="selectGroupBtn">
                            {dish.status == "available" ? renderOrderBtn() : <button className="btn btn-secondary" disabled>Hết món</button>}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
