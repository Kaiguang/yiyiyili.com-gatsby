import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { useSetRecoilState } from "recoil"
import { shoppingBagState } from "../utils/atoms.js"
import { emptyBag } from "../utils/shoppingBag.js"
import styles from "./checkout.module.css"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import LoadingSpinner from "../components/LoadingSpinner"

export default function Checkout() {
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const setShoppingBag = useSetRecoilState(shoppingBagState)

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    if (query.get("success")) {
      setIsCheckoutSuccess(true)
      emptyBag(setShoppingBag)
      setIsLoading(false)
    } else if (query.get("canceled")) {
      setIsCheckoutSuccess(false)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [setShoppingBag])

  return (
    <Layout>
      <div className={styles.container}>
        {isLoading ? (
          <>
            <SEO title="Checkout Page" />
            <LoadingSpinner size={40} className={styles.loadingSpinner} />
          </>
        ) : isCheckoutSuccess === null ? (
          <CheckoutStatusUnknown />
        ) : isCheckoutSuccess === true ? (
          <CheckoutSuccess />
        ) : isCheckoutSuccess === false ? (
          <CheckoutCanceled />
        ) : null}
      </div>
    </Layout>
  )
}

function CheckoutStatusUnknown() {
  return (
    <>
      <SEO title="Checkout Status Unknown" />
      <h1>
        Something wrong{" "}
        <span role="img" aria-label="surprised">
          😱
        </span>
      </h1>
      <p>
        You can either <Link to="/shop/">continue shopping</Link>.
      </p>
      <p>
        Or <Link to="/shopping-bag/">checkout the shopping bag</Link>.
      </p>
      <p>
        If you have any questions, please email{" "}
        <a href="mailto:hello@yiyiyili.com">hello@yiyiyili.com</a>
      </p>
    </>
  )
}

function CheckoutSuccess() {
  return (
    <>
      <SEO title="Checkout Success" />
      <h1>
        Order placed{" "}
        <span role="img" aria-label="smile">
          😀
        </span>
      </h1>
      <p>Thank you!</p>
      <p>Please check your email for the order confirmation.</p>
      <p>
        <Link to="/shop/">Continue shopping</Link>
      </p>
      <p>
        If you have any questions, please email{" "}
        <a href="mailto:hello@yiyiyili.com">hello@yiyiyili.com</a>
      </p>
    </>
  )
}

function CheckoutCanceled() {
  return (
    <>
      <SEO title="Checkout Canceled" />
      <h1>
        Order canceled{" "}
        <span role="img" aria-label="sad">
          😭
        </span>
      </h1>
      <Link to="/shop/">Continue shopping</Link>
      <p>
        If you have any questions, please email{" "}
        <a href="mailto:hello@yiyiyili.com">hello@yiyiyili.com</a>
      </p>
    </>
  )
}
