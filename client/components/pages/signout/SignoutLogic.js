import SignoutRps from './SignoutRps'
import useRequest from '../../../hooks/use-request'
import Router from 'next/router'

const SignoutLogic = () => {
  const [doRequest, errors] = useRequest(
    {
      url: '/api/users/signout',
      method: 'post',
    },
    () => Router.replace('/auth/signin')
  )

  const onSubmitHandler = event => {
    event.preventDefault()
    doRequest()
  }

  return <SignoutRps business={{ onSubmitHandler }} renderables={{ errors }} />
}

export default SignoutLogic
