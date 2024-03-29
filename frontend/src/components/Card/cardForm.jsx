import { Button } from '@chakra-ui/react';
import React, {useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Till from './till';

const currentYear = new Date().getFullYear();
const monthsArr = Array.from({ length: 12 }, (x, i) => {
    const month = i + 1;
    return month <= 9 ? '0' + month : month;
});
const yearsArr = Array.from({ length: 9 }, (_x, i) => currentYear + i);

export default function CForm({
    cardMonth,
    cardYear,
    onUpdateState,
    cardNumberRef,
    cardHolderRef,
    cardDateRef,
    onCardInputFocus,
    onCardInputBlur,
    cardCvv,
    children
}) {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("delivery");
    const [cardNumber, setCardNumber] = useState('');
    const navigate = useNavigate();

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        onUpdateState(name, value);
    };

 
    const onCardNumberChange = (event) => {
        let { value, name } = event.target;
        let cardNumber = value;
        value = value.replace(/\D/g, '');
        if (/^3[47]\d{0,13}$/.test(value)) {
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
        } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
            // diner's club, 14 digits
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
        } else if (/^\d{0,16}$/.test(value)) {
            // regular cc number, 16 digits
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
                .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
        }

        setCardNumber(cardNumber.trimRight());
        onUpdateState(name, cardNumber);
    };

    const onCvvFocus = (event) => {
        onUpdateState('isCardFlipped', true);
    };

    const onCvvBlur = (event) => {
        onUpdateState('isCardFlipped', false);
    };

    return (
        <div>
            <div style={{ textAlign: "center", margin: "10px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "700" }}>
                Select payment method
            </h2>
            </div>
            <div className="" style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <div className="select-method-buttons" style={{ textAlign: "center" }}>
                    <div>
                    <label htmlFor="payment-on-delivery" style={{fontSize: "18px"}}>
                        Pay via till on Delivery&nbsp; &nbsp;
                        <input
                        className="radio"
                        type="radio"
                        name="payment-method"
                        id="payment-on-delivery"
                        checked={selectedPaymentMethod === "delivery"}
                        onChange={() => setSelectedPaymentMethod("delivery")}
                        />
                    </label>
                    <br />
                    <br/>
                    <label htmlFor="payment-on-delivery" style={{fontSize: "18px"}}>
                        Pay using a bank card &nbsp; &nbsp;
                        <input
                        className="radio"
                        type="radio"
                        name="payment-method"
                        id="back-card-payment"
                        checked={selectedPaymentMethod === "card"}
                        onChange={() => setSelectedPaymentMethod("card")}
                        />
                    </label>
                    </div>
                </div>
                <br/>
                <br/>

                {/* Payment on Delivery */}
                {selectedPaymentMethod === "delivery" && (
                    <div className="on-delivery" style={{ textAlign: "center", padding: "40px" }}>
                    <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Pay on Delivery</h1>
                    <Till/>
                    </div>
                )}
            </div>

            {selectedPaymentMethod === "card" && (
                <div className="card-form">
                    <div className="card-list">{children}</div>
                    <div className="card-form__inner" style={{padding: "60px 0px"}}>
                        <div className="card-input">
                            <label htmlFor="cardNumber" className="card-input__label">
                                Card Number
                            </label>
                            <input
                                type="tel"
                                name="cardNumber"
                                className="card-input__input"
                                autoComplete="off"
                                onChange={onCardNumberChange}
                                maxLength="19"
                                ref={cardNumberRef}
                                onFocus={(e) => onCardInputFocus(e, 'cardNumber')}
                                onBlur={onCardInputBlur}
                                value={cardNumber}
                            />
                        </div>

                        <div className="card-input">
                            <label htmlFor="cardName" className="card-input__label">
                                Card Holder
                            </label>
                            <input
                                type="text"
                                className="card-input__input"
                                autoComplete="off"
                                name="cardHolder"
                                onChange={handleFormChange}
                                ref={cardHolderRef}
                                onFocus={(e) => onCardInputFocus(e, 'cardHolder')}
                                onBlur={onCardInputBlur}
                            />
                        </div>

                        <div className="card-form__row">
                            <div className="card-form__col">
                                <div className="card-form__group">
                                    <label
                                        htmlFor="cardMonth"
                                        className="card-input__label"
                                    >
                                        Expiration Date
                                    </label>
                                    <select
                                        className="card-input__input -select"
                                        value={cardMonth}
                                        name="cardMonth"
                                        onChange={handleFormChange}
                                        ref={cardDateRef}
                                        onFocus={(e) => onCardInputFocus(e, 'cardDate')}
                                        onBlur={onCardInputBlur}
                                    >
                                        <option value="" disabled>
                                            Month
                                        </option>

                                        {monthsArr.map((val, index) => (
                                            <option key={index} value={val}>
                                                {val}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        name="cardYear"
                                        className="card-input__input -select"
                                        value={cardYear}
                                        onChange={handleFormChange}
                                        onFocus={(e) => onCardInputFocus(e, 'cardDate')}
                                        onBlur={onCardInputBlur}
                                    >
                                        <option value="" disabled>
                                            Year
                                        </option>

                                        {yearsArr.map((val, index) => (
                                            <option key={index} value={val}>
                                                {val}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="card-form__col -cvv">
                                <div className="card-input">
                                    <label
                                        htmlFor="cardCvv"
                                        className="card-input__label"
                                    >
                                        CVV
                                    </label>
                                    <input
                                        type="tel"
                                        className="card-input__input"
                                        maxLength="4"
                                        autoComplete="off"
                                        name="cardCvv"
                                        onChange={handleFormChange}
                                        onFocus={onCvvFocus}
                                        onBlur={onCvvBlur}
                                        ref={cardCvv}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <Button bg="rgb(0,181,181)" color="white" w="100%" colorScheme=>Submit</Button> */}
                        <Button width={"100%"} style={{ margin: "1rem 0" }} size='lg' colorScheme={"whatsapp"} onClick={() => { navigate("/"); alert("Order Confirmed")}}>Payment</Button>
                        
                    </div>
                </div>
            )}
        </div>
    );
}
