// network
import buildClient from '../api/build-client'

// components
import Layout from '../components/layout/Layout'

// style
import 'bootstrap/dist/css/bootstrap.css'

const AppComponent = ({ Component, pageProps, data }) => {
  return (
    <Layout data={data}>
      <Component {...pageProps} />
    </Layout>
  )
}

/**
 * The {context} as a different structure from the ones provided in
 * getInitialProps used on "normal" pages.
 * context = { Component, ctx: { req, res, ... }}
 *
 * If getInitialProps is used on _app.js then the getInitialProps associated
 * with other pages is no longer automatically invoked.
 */
AppComponent.getInitialProps = async ({ ctx, Component }) => {
  const client = buildClient(ctx)
  const { data } = await client.get('/api/users/currentuser')

  // manually call getInitialProps on the Component
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  return {
    pageProps,
    data: {
      currentUser: data.currentUser,
    },
  }
}

export default AppComponent
