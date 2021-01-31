// core
import { useState, useEffect, useRef, useCallback } from 'react'

// rps
import SignupRps from './SignupRps'

import useRequest from '../../../hooks/use-request'

const Signup = ({ authService }) => {
  const [email, setEmail] = useState('test@test.com')
  const [password, setPassword] = useState('12345678')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [doRequest, errors] = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
  })

  useEffect(() => {
    setIsButtonDisabled(email === '' && password === '')
  }, [email, password])

  const firstInputRef = useRef()
  useEffect(() => {
    firstInputRef.current.focus()
  }, [])

  const onEmailChangeHandler = event => setEmail(event.target.value)
  const onPasswordChangeHandler = event => setPassword(event.target.value)

  const onSubmitHandler = async event => {
    event.preventDefault()
    doRequest()
  }

  console.log()

  const onResetClickHandler = useCallback(() => {
    setEmail('')
    setPassword('')
    firstInputRef.current.focus()
  }, [])

  return (
    <SignupRps
      values={{ email, password, isButtonDisabled }}
      business={{
        onEmailChangeHandler,
        onPasswordChangeHandler,
        onSubmitHandler,
        onResetClickHandler,
      }}
      refs={{ firstInputRef }}
      renderables={{ errors }}
    />
  )
}

export default Signup
