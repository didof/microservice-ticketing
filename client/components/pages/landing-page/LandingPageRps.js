import CurrentUserPopulated from './CurrentUserPopulated'
import CurrentUserEmpty from './CurrentUserEmpty'

const LandingPageRps = ({ currentUser }) => {
  return currentUser ? <CurrentUserPopulated /> : <CurrentUserEmpty />
}

export default LandingPageRps
