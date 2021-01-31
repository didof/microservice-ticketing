// core
import { useState, useEffect, useRef, useCallback } from 'react'

// rps
import SignupRps from './SignupRps'

import axios from 'axios'

const Signup = ({ authService }) => {
  const [email, setEmail] = useState('test@test.com')
  const [password, setPassword] = useState('12345678')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [errors, setErrors] = useState([])

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
    try {
      const response = await axios.post('/api/users/signup', {
        email,
        password,
      })
      console.log(response.data)
      setErrors([])
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }

  console.log()

  const onResetClickHandler = useCallback(() => {
    setEmail('')
    setPassword('')
    firstInputRef.current.focus()
  }, [])

  return (
    <SignupRps
      values={{ email, password, isButtonDisabled, errors }}
      business={{
        onEmailChangeHandler,
        onPasswordChangeHandler,
        onSubmitHandler,
        onResetClickHandler,
      }}
      refs={{ firstInputRef }}
    />
  )
}

export default Signup
