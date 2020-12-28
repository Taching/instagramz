import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Instagram from "../components/Instagram"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>@tachingers</h1>
    <Instagram />
  </Layout>
)

export default IndexPage
