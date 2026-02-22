import React, { useContext, useEffect, useMemo, useState } from "react";
import { DataContext } from "../../../App";
import styles from "./Cart.module.css";
import OrderSummary from "../../OrderSummary/OrderSummary";

function Cart() {
  const { cartItems, setCartItems, setCartCount } = useContext(DataContext);

  // useEffect(() => {
  //   const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [] ;
  //   const storedCount = parseInt(localStorage.getItem("cartCount",)) || 0 ;

  //   setCartItems(storedItems);
  //   setCartCount(storedCount);
  // }, [])

  // Handle quantity change
  const handleQuantityChange = (id, change) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) } // avoid going below 1
        : item
    );
    setCartItems(updatedCart);

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    localStorage.setItem("cartCount", updatedCart.length.toString());
  };

  // Calculate total cart price
  // const totalPrice = cartItems
  //   .reduce((acc, item) => acc + item.price * item.quantity, 0)
  //   .toFixed(2);

  // Example usage of useMemo

  const totalPrice = useMemo(()=> {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
  } , [cartItems])


  // handle cart remove
  const handleCartRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    setCartCount(updatedCart.length);

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    localStorage.setItem("cartCount", updatedCart.length.toString());
  };

  return (
    <div className={styles.cartWrap}>
      <div className="container-fluid">
        {cartItems.length == 0 ? (
          <h2 className="text-center"> Cart is empty </h2>
        ) : (
          ""
        )}
        <div className="row">
          <div className="col-md-8 d-xl-flex justify-content-end ">
            <div className={styles.cartLeft}>
              {cartItems.length > 0 ? (
                <>
                  <h2>Cart Items</h2>
                  {cartItems.map((item, index) => (
                    <div key={index}>
                      <div className={styles.cartCard}>
                        <div className={styles.cartImg}>
                          <img
                            src={item.image}
                            alt=""
                            width={100}
                            height={100}
                          />{" "}
                        </div>

                        <div className="d-md-flex justify-content-between flex-column flex-fill " >
                          <h3>{item.title}</h3>
                          <div
                            className={`${styles.cartBottom} d-flex justify-content-between align-items-end   `}
                          >
                            <div className="d-flex gap-3">
                              <span className={styles.cartCount}>
                                <span
                                  onClick={() =>
                                    handleQuantityChange(item.id, -1)
                                  }
                                >
                                  -
                                </span>
                                <span>{item.quantity}</span>
                                <span
                                  onClick={() =>
                                    handleQuantityChange(item.id, 1)
                                  }
                                >
                                  +
                                </span>
                              </span>
                              <span className={styles.cartPrice}>
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                            <div
                              className={styles.trashWrapper}
                              onClick={() => handleCartRemove(item.id)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          {cartItems.length > 0 && <OrderSummary totalPrice={totalPrice} />}
        </div>
      </div>
    </div>
  );
}

export default Cart;
