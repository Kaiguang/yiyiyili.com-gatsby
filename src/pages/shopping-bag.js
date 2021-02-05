import React, { useState } from "react"
import { Link } from "gatsby"
import { useRecoilValue } from "recoil"
import { loadStripe } from "@stripe/stripe-js"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import LoadingSpinner from "../components/LoadingSpinner"
import ShoppingBagArtworkCards from "../components/ShoppingBagArtworkCards"

import { shoppingBagState, artworksState } from "../utils/atoms.js"

import styles from "./shopping-bag.module.css"

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)

export default function ShoppingBag() {
  const shoppingBag = useRecoilValue(shoppingBagState)
  const artworks = useRecoilValue(artworksState)
  const artworksInBag = () => {
    return artworks.filter(work => shoppingBag.includes(work.id))
  }
  const subtotal = () => {
    const totalCents = artworksInBag().reduce(
      (accumulator, current) => accumulator + current.price * current.qty,
      0
    )
    return totalCents / 100
  }

  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false)

  const handleCheckoutButtonClick = async () => {
    setIsCheckoutLoading(!isCheckoutLoading)

    try {
      const stripe = await stripePromise
      const response = await fetch(
        `${process.env.API_GATEWAY_ROOT_URL}/create-stripe-checkout-session`,
        { method: "POST", body: JSON.stringify({ shoppingBag }, null, 2) }
      )
      const session = await response.json()
      await stripe.redirectToCheckout({
        sessionId: session.id,
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <Layout>
      <SEO title="Shopping Bag" />

      <h1 className={styles.h1}>
        {shoppingBag.length === 0
          ? `Shopping bag is empty.`
          : `Your bag total is $${subtotal()}`}
      </h1>

      {subtotal() === 0 ? null : isCheckoutLoading ? (
        <LoadingSpinner size={40} className={styles.loadingSpinner} />
      ) : (
        <button
          className={styles.checkoutButton}
          onClick={handleCheckoutButtonClick}
        >
          <strong>Checkout now</strong>
        </button>
      )}

      <ShoppingBagArtworkCards />

      <Link to="/collections/" className={styles.continueShopping}>
        {shoppingBag.length > 0 ? `Browse for more` : `Continue browsing`}
      </Link>

      {shoppingBag.length > 2 && subtotal() !== 0 ? (
        isCheckoutLoading ? (
          <LoadingSpinner size={40} className={styles.loadingSpinner} />
        ) : (
          <button
            className={styles.checkoutButton}
            onClick={handleCheckoutButtonClick}
          >
            <strong>Checkout</strong>
          </button>
        )
      ) : null}
    </Layout>
  )
}
