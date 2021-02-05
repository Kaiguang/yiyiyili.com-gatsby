import React from "react"

import Layout from "../../components/Layout"
import SEO from "../../components/SEO"
import ArtworkCards from "../../components/ArtworkCards"

export default function CollectionsPage() {
  return (
    <Layout>
      <SEO
        title="Collections"
        description="Browse a collection of embroidery arts handmade by Yi Li."
      />

      <ArtworkCards />
    </Layout>
  )
}
