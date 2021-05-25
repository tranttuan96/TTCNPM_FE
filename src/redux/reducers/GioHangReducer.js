const stateGioHang = {
    totalQuantity: 0,
    totalPrice: 0,
    gioHang: [
    ]
}

const GioHangReducer = (state = stateGioHang, action) => {
    switch (action.type) {
        case "THEM_MON":
            {
                let gioHangUpdate = [...state.gioHang]; //sao chép giỏ hàng mới
                gioHangUpdate.push(action.orderItem);
                //Gán giỏ hàng cũ = giỏ hàng mới (vì tính bất biến của redux)
                let totalPriceUpdate = gioHangUpdate.reduce((tongTien, spGH) => {
                    return tongTien += spGH.quantity * spGH.price;
                }, 0)
                let totalQuantityUpdate = gioHangUpdate.reduce((tongSoLuong, spGH) => {
                    return tongSoLuong += spGH.quantity;
                }, 0)
                state.gioHang = gioHangUpdate;
                state.totalPrice = totalPriceUpdate;
                state.totalQuantity = totalQuantityUpdate;
                return { ...state }
            }; break;
        case "CAP_NHAT_SO_LUONG_MON":
            {
                let gioHangUpdate = [...state.gioHang]; //sao chép giỏ hàng mới
                let index = gioHangUpdate.findIndex(spGH => spGH.id === action.dishID);
                if (index !== -1) { //sản phẩm đã tồn tại trong giỏ hàng rồi
                    if (action.updateType === "tang") {
                        gioHangUpdate[index].quantity += 1;
                    }
                    else {
                        if (gioHangUpdate[index].quantity > 1) {
                            gioHangUpdate[index].quantity -= 1;
                        } else {
                            gioHangUpdate.splice(index, 1);
                        }
                    }
                }
                let totalPriceUpdate = gioHangUpdate.reduce((tongTien, spGH) => {
                    return tongTien += spGH.quantity * spGH.price;
                }, 0)
                let totalQuantityUpdate = gioHangUpdate.reduce((tongSoLuong, spGH) => {
                    return tongSoLuong += spGH.quantity;
                }, 0)
                //Gán giỏ hàng cũ = giỏ hàng mới (vì tính bất biến của redux)
                state.gioHang = gioHangUpdate;
                state.totalPrice = totalPriceUpdate;
                state.totalQuantity = totalQuantityUpdate;
                return { ...state }
            }; break;
        case "XOA_MON":
            {
                let gioHangUpdate = [...state.gioHang]; //sao chép giỏ hàng mới
                let index = gioHangUpdate.findIndex(spGH => spGH.id === action.dishID);
                gioHangUpdate.splice(index, 1);
                let totalPriceUpdate = gioHangUpdate.reduce((tongTien, spGH) => {
                    return tongTien += spGH.quantity * spGH.price;
                }, 0)
                let totalQuantityUpdate = gioHangUpdate.reduce((tongSoLuong, spGH) => {
                    return tongSoLuong += spGH.quantity;
                }, 0)
                //Gán giỏ hàng cũ = giỏ hàng mới (vì tính bất biến của redux)
                state.gioHang = gioHangUpdate;
                state.totalPrice = totalPriceUpdate;
                state.totalQuantity = totalQuantityUpdate;
                return { ...state }
            }; break;
    }


    return { ...state }
}

export default GioHangReducer;