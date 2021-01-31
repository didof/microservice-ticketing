import buildClient from '../api/build-client'
import LandingPageLogic from '../components/pages/landing-page/LandingPageLogic'

const LandingPage = ({ currentUser }) => {
  return <LandingPageLogic currentUser={currentUser} />
}

LandingPage.getInitialProps = async ctx => {
  const client = buildClient(ctx)
  const { data } = await client.get('/api/users/currentuser')
  return data
}

export default LandingPage
