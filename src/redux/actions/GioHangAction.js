export const themMonAction = (orderItem) => {
    return {
        type:'THEM_MON',
        orderItem
    }
}

export const capNhatSoLuongMonAction = (dishID, updateType) => {
    return {
        type:'CAP_NHAT_SO_LUONG_MON',
        dishID,
        updateType,
    }
}

export const xoaMonAction = (dishID) => {
    return {
        type:'XOA_MON',
        dishID
    }
}

export const xoaGioHangAction = () => {
    return {
        type:'XOA_GIO_HANG'
    }
}