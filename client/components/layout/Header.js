import Link from 'next/link'

const Header = ({ data }) => {
  const { currentUser } = data
  return (
    <header>
      <nav className='navbar navbar-light bg-light'>
        <Logo />

        <Email currentUser={currentUser} />

        <div className='d-flex justify-content-end '>
          <ul className='nav d-flex align-items-center'>
            {currentUser ? <CurrentUserPopulated /> : <CurrentUserEmpty />}
          </ul>
        </div>
      </nav>
    </header>
  )
}

const Logo = () => (
  <h1>
    <Link href='/'>
      <a className='navbar-brand'>Ticketing</a>
    </Link>
  </h1>
)

const Email = ({ currentUser }) => {
  if (!currentUser) return null

  const { email } = currentUser
  return <h6>{email}</h6>
}

const CurrentUserPopulated = () => {
  return (
    <li className='nav-item'>
      <Link href='/auth/signout'>
        <a className='nav-link'>Sign out</a>
      </Link>
    </li>
  )
}

const CurrentUserEmpty = () => {
  return (
    <>
      <li className='nav-item'>
        <Link href='/auth/signin'>
          <a className='nav-link'>Sign in</a>
        </Link>
      </li>
      <li className='nav-item px-2'>
        <Link href='/auth/signup'>
          <a className='nav-link'>Sign up</a>
        </Link>
      </li>
    </>
  )
}

export default Header
