// core
import { useState, useEffect, useRef, useCallback } from 'react'
import Router from 'next/router'

// rps
import SigninRps from './SigninRps'

import useRequest from '../../../hooks/use-request'

const Signin = ({ authService }) => {
  const [email, setEmail] = useState('test@test.com')
  const [password, setPassword] = useState('12345678')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [doRequest, errors] = useRequest(
    {
      url: '/api/users/signin',
      method: 'post',
      body: {
        email,
        password,
      },
    },
    () => Router.replace('/')
  )

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

  const onResetClickHandler = useCallback(() => {
    setEmail('')
    setPassword('')
    firstInputRef.current.focus()
  }, [])

  return (
    <SigninRps
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

export default Signin
