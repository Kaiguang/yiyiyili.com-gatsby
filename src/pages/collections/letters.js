import React from "react"

import Layout from "../../components/Layout"
import SEO from "../../components/SEO"
import ArtworkCards from "../../components/ArtworkCards"

export default function LettersPage() {
  return (
    <Layout>
      <SEO
        title="Embroidery Letters"
        description="Browse a collection of embroidery letter arts handmade by Yi Li."
      />

      <ArtworkCards tag="letters" />
    </Layout>
  )
}
