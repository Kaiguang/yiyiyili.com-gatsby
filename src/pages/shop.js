import React from "react"

import ArtworkCards from "../components/ArtworkCards"
import SEO from "../components/seo.js"
import Layout from "../components/Layout"

export default function ShopPage() {
  return (
    <Layout>
      <SEO title="Shop" />
      <ArtworkCards />
    </Layout>
  )
}
