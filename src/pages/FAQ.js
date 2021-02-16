import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

export default function FAQ() {
  return (
    <Layout>
      <div style={{ padding: `0 10px`, alignSelf: `center`, maxWidth: 500 }}>
        <SEO title="FAQ" description="Frequently asked questions" />

        <h1>Frequently Asked Questions</h1>

        <h2>Currency</h2>
        <p>
          All prices listed are in Canadian dollar{" "}
          <span role="img" aria-label="canadian flag">
            🇨🇦
          </span>{" "}
          (CAD). Exchange rate will apply if you are paying with a different
          currency.
        </p>
        <p>
          If your payment method is not available, please{" "}
          <Link to="/contact">contact me</Link>.
        </p>

        <h2>Shipping</h2>
        <p>We offer free shipping for Canada and US.</p>
        <p>
          If you live outside of Canada and US, please{" "}
          <Link to="/contact">contact me</Link>.
        </p>

        <h2>Returns</h2>
        <p>Buyers can return their purchases within 14 days upon receiving.</p>
        <p>Buyers will be responsible for the return shipping cost.</p>
        <p>
          The returns will not be accepted if they are not in their original
          condition.
        </p>
      </div>
    </Layout>
  )
}
