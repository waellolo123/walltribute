import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import "./payment.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { create } from "../../utils/data-provider";
import { useDispatch } from "react-redux";
import { ChangePayment } from "../../redux/slices/imagesSlice";

const MySwal = withReactContent(Swal);

const PUBLIC_KEY =
  "pk_test_51MhbmTBJ0DE9wa5iMQUJbe4Bit0dtKF5FiTolqLQat9x6yBcHHJP54D1jJ8f8hmMi0kLwzqS91uisRmu2HJBvuci00LxmGN1bk";

const Payment = () => {
  const [product, setProduct] = useState({
    name: "headphone",
    price: 100,
  });
  const handleSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Payment was Successfull",
      time: 4000,
    });
  };
  const handleFailure = () => {
    MySwal.fire({
      icon: "error",
      title: "Sorry but Something Went Wrong, please try again",
      time: 4000,
    });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const payNow = async (token) => {
    try {
      const response = await create("images/payment", {
        data: {
          amount: "100",
          token,
        },
      });

      if (response.status === 200) {
        handleSuccess();
        dispatch(ChangePayment(true));
        navigate("/upload");
        console.log("your payment was successful");
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };

  return (
    <div className="payment">
      <div className="payment-container">
        <h2 className="payment-title">
          Be a part of the largest portrait collection ever only 1$ for a good
          cause
        </h2>
        <StripeCheckout
          stripeKey={PUBLIC_KEY}
          label="Pay To Uppload"
          name="Walltribute"
          billingAddress
          shippingAddress
          amount={100}
          currency="USD"
          description="is only one dollars"
          token={payNow}
        />
        <h3 className="payment-titleSm">
          If you want to pay with cryptocurrency, send 1 $ to our wallet and
          send us the transaction hash. We will send you the access to upload
          images.
        </h3>
        <p className="payment-wallet">
          0x029290c564Ef921c56a784AA16C97E930dAF7372
        </p>
        <h4 className="payment-titleEmail">hash@walltribute.com</h4>
        <p className="payment-para">we accept the following currencies</p>
        <div className="payment-images">
          <img
            src="https://assets-cdn.trustwallet.com/blockchains/smartchain/info/logo.png"
            alt=""
            className="payment-img"
          />
          <img
            src="https://www.logo.wine/a/logo/Binance/Binance-Vertical2-Dark-Background-Logo.wine.svg"
            alt=""
            className="payment-img"
          />
          <img
            src="https://cryptologos.cc/logos/tether-usdt-logo.png"
            alt=""
            className="payment-img"
          />
        </div>
        <div className="payment-spans">
          <span className="payment-span">BUSD(Bep20)</span>
          <span className="payment-span">BUSD(Bep2)</span>
          <span className="payment-span">BUSD(ERC20)</span>
          <span className="payment-span">BNB Smart Chain</span>
          <span className="payment-span">USDT(ERC20)</span>
          <span className="payment-span">USDT(Bep20)</span>
        </div>
      </div>
    </div>
  );
};

export default Payment;
