import React, { useState, useEffect } from 'react'
import { qlDonHangService } from "../../services/quanLyDonHangService"
import "../../assets/scss/Layout/User/Checkout.scss"
import CurrencyFormat from 'react-currency-format';
import Cards from 'react-credit-cards';
import "react-credit-cards/lib/styles.scss"
import swal from 'sweetalert';
// npm install --save react-credit-cards
// npm install sweetalert
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatName
} from "../utils/formatCreditCard";

export default function Checkout(props) {

    const [orderInfo, setOrderInfo] = useState({});
    const [creditCard, setCreditCard] = useState({
        values: {
            number: '',
            name: '',
            expiry: '',
            cvc: '',
            focused: '',
        },
        errors: {
            number: '',
            name: '',
            expiry: '',
            cvc: '',
        }
    })

    const [paymentMethod, setPaymentMethod] = useState('');
    const [readyPay, setReadyPay] = useState(false);
    const [bank, setBank] = useState('');
    const [ewallet, setEwallet] = useState('');

    useEffect(() => {
        qlDonHangService.layThongTinDonHang(props.match.params.orderID).then(res => {
            setOrderInfo(res.data);
            console.log(res.data)
        }).catch(error => {
            console.log(error.response.data);
        });
    }, []);

    const selectPaymentType = (event) => {
        let { value } = event.target;
        setPaymentMethod(value);
        let valid = true;
        if (value === "creditCard") {
            console.log("run")
            let { values, errors } = creditCard;
            for (let key in values) {
                if (key !== 'focused') {
                    if (values[key] === '') { //Nếu như có 1 values = rổng thì không hợp lệ
                        valid = false;
                    }
                }
            }
            for (let key in errors) {
                if (errors[key] !== '') { //Nếu như có 1 errrors != rổng => còn lỗi
                    valid = false;
                }
            }
        }
        else if (value === "iBanking") {
            if (bank === '') {
                valid = false;
            }
        }
        else if (value === "eWallet") {
            if (ewallet === '') {
                valid = false;
            }
        }

        if (valid) {
            setReadyPay(true);
        }
        else {
            setReadyPay(false);
        }
    }

    const selectBank = (bankName) => {
        setBank(bankName);
        setReadyPay(true);
    }
    const selectEWallet = (event) => {
        let { value } = event.target;
        setEwallet(value);
        setReadyPay(true);
    }

    const handleInputChange = (event) => {
        let { target } = event;
        if (target.name === "number") {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === "name") {
            target.value = formatName(target.value);
        } else if (target.name === "expiry") {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === "cvc") {
            target.value = formatCVC(target.value);
        }
        let regexName = /^[a-zA-Z ]*$/;
        const newValues = { ...creditCard.values, [target.name]: target.value };
        const newErrors = {
            ...creditCard.errors
        };
        if (target.name == "number") {
            if (target.value.trim() === '') {
                newErrors.number = 'Không được bỏ trống';
            }
            else if (target.value.length != 19) {
                newErrors.number = 'Số thẻ phải bao gồm 16 số.';
            }
            else {
                newErrors.number = "";
            }
        }
        else if (target.name == "name") {
            let regexName = /^[a-zA-Z ]*$/;
            if (target.value.trim() === '') {
                newErrors.name = 'Không được bỏ trống';
            }
            else if (!target.value.match(regexName)) {
                newErrors.name = "Tên trên thẻ bao gồm các ký tự không dấu.";
            }
            else {
                newErrors.name = "";
            }
        }
        else if (target.name == "expiry") {
            if (target.value.trim() === '') {
                newErrors.expiry = 'Không được bỏ trống';
            }
            else if (target.value.length != 5) {
                newErrors.expiry = "Vui lòng điền đầy đủ thời gian.";
            }
            else {
                let splitExpiry = target.value.split('/');
                let d = new Date();
                let month = d.getMonth();

                let year = d.getFullYear();
                year = year.toString();
                year = year.substr(2,2);
                console.log(month);
                if(parseInt(year) > parseInt(splitExpiry[1])) {
                    newErrors.expiry = "Thẻ đã hết hạn.";
                }
                else if(parseInt(month)+ 1 > parseInt(splitExpiry[0])) {
                    newErrors.expiry = "Thẻ đã hết hạn.";
                }
                else {
                    newErrors.expiry = "";
                }
            }
        }
        else if (target.name == "cvc") {
        console.log(target.value.length)

            if (target.value.trim() === '') {
                newErrors.cvc = 'Không được bỏ trống';
            }
            else if (target.value.length != 3) {
                newErrors.cvc = "Mã bảo mật gồm 3 chữ số.";
            }
            else {
                newErrors.cvc = "";
            }
        }

        setCreditCard(
            {
                values: newValues,
                errors: newErrors
            });


        let valid = true;
        for (let key in newValues) {
            if (key !== 'focused') {
                if (newValues[key] === '') { //Nếu như có 1 values = rổng thì không hợp lệ
                    valid = false;
                }
            }
        }
        for (let key in newErrors) {
            if (newErrors[key] !== '') { //Nếu như có 1 errrors != rổng => còn lỗi
                valid = false;
            }
        }
        console.log(newValues)
        console.log(newErrors)
        if (valid) {
            setReadyPay(true);
        }
        else {
            setReadyPay(false);
        }
    }

    const handleInputFocus = (event) => {
        let { name } = event.target;
        const newValues = { ...creditCard.values, focused: name };
        const newErrors = { ...creditCard.errors };
        setCreditCard(
            {
                values: newValues,
                errors: newErrors
            })
    }

    const doCheckout = () => {
        let paymentInfo = {
            type: "",
            cardNumber: ""
        }
        if(paymentMethod == "creditCard") {
            paymentInfo = {
                type: paymentMethod,
                cardNumber: creditCard.values.number
            }
        }
        else {
            paymentInfo = {
                type: paymentMethod,
                cardNumber: ""
            }
        }
        qlDonHangService.thucHienThanhToan(paymentInfo).then(res => {

            if(res.data.respone == "true") {
                let transactionInfo= {
                    transactionID: res.data.transactionID,
                    paymentType: paymentMethod,
                    serviceName: paymentMethod === "creditCard" ? "Visa" : (paymentMethod === "iBanking" ? bank : ewallet),
                    transactionTime: res.data.time
                }
                qlDonHangService.capNhatThanhToanThanhCong(props.match.params.orderID, transactionInfo).then(res => {
                    console.log(res.data)
                    swal("Success!", "Thanh toán thành công", "success", {
                        buttons: false,
                        timer: 1500,
                    });    
                    setTimeout(function(){ props.history.push(`/orderdetail/${props.match.params.orderID}`); }, 1500);
                    
                }).catch(error => {
                    console.log(error.response.data);
                });
            }
            else {
                swal("Oops!", "Thanh toán thất bại", "error");
            }
            
        }).catch(error => {
            console.log(error.response.data);
        });
    }

    return (
        <div className="checkoutPage">
            <h4>Chọn hình thức thanh toán</h4>
            <div className="row">
                <div className="listPaymentMethod col-9">
                    <div className="listPaymentMethod__content">
                        <div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentType"
                                    id="creditCard"
                                    value="creditCard"
                                    onChange={selectPaymentType}
                                />
                                <label className="form-check-label" htmlFor="creditCard">
                                    <i className="fab fa-cc-visa"></i>Thanh toán bằng thẻ tín dụng
                            </label>
                            </div>
                            <div className={`cardFormInput ${paymentMethod === "creditCard" ? "showSelection" : ''}`}>
                                <div className="row">
                                    <div className="col-6">
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="number">Số thẻ</label>
                                                <input
                                                    type="tel"
                                                    name="number"
                                                    id="number"
                                                    className="form-control"
                                                    placeholder="Card Number"
                                                    maxLength="19"
                                                    required
                                                    onChange={handleInputChange}
                                                    onFocus={handleInputFocus}
                                                />
                                                <div>{creditCard.errors.number}</div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="name">Tên trên thẻ</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className="form-control"
                                                    placeholder="Name"
                                                    required
                                                    onChange={handleInputChange}
                                                    onFocus={handleInputFocus}
                                                />
                                                <div>{creditCard.errors.name}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <label htmlFor="expiry">Hiệu lực đến</label>
                                                    <input
                                                        type="tel"
                                                        name="expiry"
                                                        id="expiry"
                                                        className="form-control"
                                                        placeholder="Valid Thru"
                                                        pattern="\d\d/\d\d"
                                                        required
                                                        onChange={handleInputChange}
                                                        onFocus={handleInputFocus}
                                                    />
                                                    <div>{creditCard.errors.expiry}</div>
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="cvc">Mã bảo mật</label>
                                                    <input
                                                        type="tel"
                                                        name="cvc"
                                                        id="cvc"
                                                        className="form-control"
                                                        placeholder="CVC"
                                                        pattern="\d{3,4}"
                                                        maxLength="3"
                                                        required
                                                        onChange={handleInputChange}
                                                        onFocus={handleInputFocus}
                                                    />
                                                    <div>{creditCard.errors.cvc}</div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-6">
                                        <Cards
                                            number={creditCard.values.number}
                                            name={creditCard.values.name}
                                            expiry={creditCard.values.expiry}
                                            cvc={creditCard.values.cvc}
                                            focused={creditCard.values.focused}
                                            locale={{ valid: 'Hiệu lực đến' }}
                                            placeholders={{ name: 'TÊN CHỦ THẺ' }}
                                        />
                                    </div>
                                </div>



                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentType"
                                    id="iBanking"
                                    value="iBanking"
                                    onChange={selectPaymentType}
                                />
                                <label className="form-check-label" htmlFor="iBanking">
                                    <i className="fa fa-credit-card"></i>
                                    Thanh toán bằng Internet Banking
                            </label>
                            </div>
                            <ul className={`listBank ${paymentMethod === "iBanking" ? "showListBank" : ''}`}>
                                <li className={`atm ${bank === "Vietinbank" ? "atm-active" : ""}`} onClick={() => selectBank("Vietinbank")}>
                                    <img
                                        src={"/images/banks/VTB.jpg"}
                                        alt="Vietinbank"
                                    />
                                </li>
                                <li className={`atm ${bank === "Vietcombank" ? "atm-active" : ""}`} onClick={() => selectBank("Vietcombank")}>

                                    <img
                                        src={"/images/banks/VCB.jpg"}
                                        alt="Vietcombank"
                                    />
                                </li>
                                <li className={`atm ${bank === "Sacombank" ? "atm-active" : ""}`} onClick={() => selectBank("Sacombank")}>
                                    <img
                                        src={"/images/banks/sacombank.png"}
                                        alt="Sacombank"
                                    />
                                </li>
                                <li className={`atm ${bank === "SCB" ? "atm-active" : ""}`} onClick={() => selectBank("SCB")}>

                                    <img
                                        src={"/images/banks/scb.png"}
                                        alt="SCB"
                                    />
                                </li>
                                <li className={`atm ${bank === "Eximbank" ? "atm-active" : ""}`} onClick={() => selectBank("Eximbank")}>

                                    <img
                                        src={"/images/banks/eximbank.jpg"}
                                        alt="Eximbank"
                                    />
                                </li>
                                <li className={`atm ${bank === "BIDV" ? "atm-active" : ""}`} onClick={() => selectBank("BIDV")}>

                                    <img
                                        src={"/images/banks/BIDV.jpg"}
                                        alt="BIDV"
                                    />
                                </li>
                                <li className={`atm ${bank === "DongA Bank" ? "atm-active" : ""}`} onClick={() => selectBank("DongA Bank")}>

                                    <img
                                        src={"/images/banks/DAB.jpg"}
                                        alt="DongA Bank"
                                    />
                                </li>
                                <li className={`atm ${bank === "ACB" ? "atm-active" : ""}`} onClick={() => selectBank("ACB")}>
                                    <img
                                        src={"/images/banks/ACB.jpg"}
                                        alt="ACB"
                                    />
                                </li>
                                <li className={`atm ${bank === "MBBank" ? "atm-active" : ""}`} onClick={() => selectBank("MBBank")}>

                                    <img
                                        src={"/images/banks/MB.jpg"}
                                        alt="MBBank"
                                    />
                                </li>
                                <li className={`atm ${bank === "Techcombank" ? "atm-active" : ""}`} onClick={() => selectBank("Techcombank")}>

                                    <img
                                        src={"/images/banks/TCB.jpg"}
                                        alt="Techcombank"
                                    />
                                </li>
                                <li className={`atm ${bank === "VPBank" ? "atm-active" : ""}`} onClick={() => selectBank("VPBank")}>

                                    <img
                                        src={"/images/banks/VPB.jpg"}
                                        alt="VPBank"
                                    />
                                </li>
                                <li className={`atm ${bank === "VIB" ? "atm-active" : ""}`} onClick={() => selectBank("VIB")}>

                                    <img
                                        src={"/images/banks/VIB.jpg"}
                                        alt="VIB"
                                    />
                                </li>
                                <li className={`atm ${bank === "HDBank" ? "atm-active" : ""}`} onClick={() => selectBank("HDBank")}>

                                    <img
                                        src={"/images/banks/HDB.jpg"}
                                        alt="HDBank"
                                    />
                                </li>
                                <li className={`atm ${bank === "Oceanbank" ? "atm-active" : ""}`} onClick={() => selectBank("Oceanbank")}>

                                    <img
                                        src={"/images/banks/OJB.jpg"}
                                        alt="Oceanbank"
                                    />
                                </li>
                                <li className={`atm ${bank === "SHB" ? "atm-active" : ""}`} onClick={() => selectBank("SHB")}>

                                    <img
                                        src={"/images/banks/SHB.jpg"}
                                        alt="SHB"
                                    />
                                </li>
                                <li className={`atm ${bank === "SeABank" ? "atm-active" : ""}`} onClick={() => selectBank("SeABank")}>

                                    <img
                                        src={"/images/banks/SEAB.jpg"}
                                        alt="SeABank"
                                    />
                                </li>
                                <li className={`atm ${bank === "ABBank" ? "atm-active" : ""}`} onClick={() => selectBank("ABBank")}>

                                    <img
                                        src={"/images/banks/ABB.jpg"}
                                        alt="ABBank"
                                    />
                                </li>
                                <li className={`atm ${bank === "TPBank" ? "atm-active" : ""}`} onClick={() => selectBank("TPBank")}>

                                    <img
                                        src={"/images/banks/TPB.jpg"}
                                        alt="TPBank"
                                    />
                                </li>
                                <li className={`atm ${bank === "LienVietPostBank" ? "atm-active" : ""}`} onClick={() => selectBank("LienVietPostBank")}>

                                    <img
                                        src={"/images/banks/LPB.jpg"}
                                        alt="LienVietPostBank"
                                    />
                                </li>
                                <li className={`atm ${bank === "SAIGONBANK" ? "atm-active" : ""}`} onClick={() => selectBank("SAIGONBANK")}>

                                    <img
                                        src={"/images/banks/SGB.jpg"}
                                        alt="SAIGONBANK"
                                    />
                                </li>
                                <li className={`atm ${bank === "Nam A Bank" ? "atm-active" : ""}`} onClick={() => selectBank("Nam A Bank")}>

                                    <img
                                        src={"/images/banks/NAB.jpg"}
                                        alt="Nam A Bank"
                                    />
                                </li>
                                <li className={`atm ${bank === "VietABank" ? "atm-active" : ""}`} onClick={() => selectBank("VietABank")}>

                                    <img
                                        src={"/images/banks/VAB.jpg"}
                                        alt="VietABank"
                                    />
                                </li>
                                <li className={`atm ${bank === "NCB" ? "atm-active" : ""}`} onClick={() => selectBank("NCB")}>

                                    <img
                                        src={"/images/banks/NCB.jpg"}
                                        alt="NCB"
                                    />
                                </li>
                                <li className={`atm ${bank === "BaoVietBank" ? "atm-active" : ""}`} onClick={() => selectBank("BaoVietBank")}>

                                    <img
                                        src={"/images/banks/BVB.jpg"}
                                        alt="BaoVietBank"
                                    />
                                </li>
                                <li className={`atm ${bank === "GPBank" ? "atm-active" : ""}`} onClick={() => selectBank("GPBank")}>

                                    <img
                                        src={"/images/banks/GPB.jpg"}
                                        alt="GPBank"
                                    />
                                </li>
                                <li className={`atm ${bank === "BAC A BANK" ? "atm-active" : ""}`} onClick={() => selectBank("BAC A BANK")}>

                                    <img
                                        src={"/images/banks/NASB.jpg"}
                                        alt="BAC A BANK"
                                    />
                                </li>
                                <li className={`atm ${bank === "Maritime Bank" ? "atm-active" : ""}`} onClick={() => selectBank("Maritime Bank")}>

                                    <img
                                        src={"/images/banks/MSB.jpg"}
                                        alt="Maritime Bank"
                                    />
                                </li>
                                <li className={`atm ${bank === "PG Bank" ? "atm-active" : ""}`} onClick={() => selectBank("PG Bank")}>

                                    <img
                                        src={"/images/banks/PGB.jpg"}
                                        alt="PG Bank"
                                    />
                                </li>

                            </ul>

                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentType"
                                    id="eWallet"
                                    value="eWallet"
                                    onChange={selectPaymentType}
                                />
                                <label className="form-check-label" htmlFor="eWallet">
                                    <i className="fa fa-wallet"></i>Thanh toán bằng Ví điện tử
                            </label>
                            </div>
                            <div className={`eWalletSelection ${paymentMethod === "eWallet" ? "showSelection" : ''}`}>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="eWalletType"
                                        id="momo"
                                        value="momo"
                                        onChange={selectEWallet}
                                    />
                                    <label className="form-check-label" htmlFor="eWallet">
                                        <img
                                            src={"/images/momo.png"}
                                            alt="momo"
                                        />Momo
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="eWalletType"
                                        id="zalopay"
                                        value="zalopay"
                                        onChange={selectEWallet}
                                    />
                                    <label className="form-check-label" htmlFor="eWallet">
                                        <img
                                            src={"/images/zalopay.png"}
                                            alt="zalopay"
                                        />Zalo Pay
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="summary col-3">
                    <div className="summary_content">
                        <div className="intro">Thông tin đơn hàng</div>
                        <div className="orderID">
                            <div className="orderID__label">Mã đơn hàng</div>
                            <div className="orderID__value">{orderInfo.orderID}</div>
                        </div>
                        <div className="finalPrice">
                            <div className="finalPrice__label">Thành tiền</div>
                            <div className="finalPrice__value">
                                <CurrencyFormat
                                    value={orderInfo.totalPrice}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    suffix={"đ"}
                                />
                                <div className="description">(Đã bao gồm VAT nếu có)</div>
                            </div>
                        </div>
                    </div>
                    {readyPay === false ? <button className="btn btn-success" disabled>Tiến hành thanh toán</button> : <button className="btn btn-success" onClick={doCheckout}>Tiến hành thanh toán</button>}
                </div>
            </div>
        </div>
    );
}
