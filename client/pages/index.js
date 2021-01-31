import axios from 'axios'

const LandingPage = ({ currentUser }) => {
  console.log(currentUser)
  return <h1>Landing Page</h1>
}

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === 'undefined') {
    console.log('[SSR]')
    try {
      // http://[SERVICENAME].[NAMESPACE].svc.cluster.local/[route]
      const { data } = await axios.get(
        'http://ingress-nginx-controller.kube-system.svc.cluster.local/api/users/currentuser',
        {
          headers: req.headers,
        }
      )
      return data
    } catch (err) {
      console.warn('[SSR]')
      console.error(err)
      return {}
    }
  } else {
    console.log('[Client]')
    try {
      const { data } = await axios.get('/api/users/currentuser')
      return data
    } catch {
      console.warn('[Client]')
      console.error(err)
    }
  }
  return {}
}

export default LandingPage
