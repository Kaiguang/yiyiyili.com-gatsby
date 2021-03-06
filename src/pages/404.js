import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>404: Not Found</h1>
    <p>This page doesn't exist.</p>
    <Link to="/collections">See collections</Link>
  </Layout>
)

export default NotFoundPage
