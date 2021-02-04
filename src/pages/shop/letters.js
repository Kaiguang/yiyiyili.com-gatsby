import React from "react"

import Layout from "../../components/Layout"
import SEO from "../../components/SEO"
import ArtworkCards from "../../components/ArtworkCards"

export default function LettersPage() {
  return (
    <Layout>
      <SEO title="Shop Letters" />

      <ArtworkCards tag="letters" />
    </Layout>
  )
}
