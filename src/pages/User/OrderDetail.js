import React from 'react'

export default function OrderDetail(props) {
    return (
        <div>
            Trang chi đơn đơn hàng
            <p>Mã đơn hàng: {props.match.params.orderID}</p>
        </div>
    )
}
