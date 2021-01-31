// core
import { useState, useEffect, useRef, useCallback } from 'react'

// rps
import SignupRps from '../../components/pages/Signup'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const onChangeHandler = setState => event => setState(event.target.value)
  const onEmailChangeHandler = useCallback(onChangeHandler(setEmail), [])
  const onPasswordChangeHandler = useCallback(onChangeHandler(setPassword), [])

  const onSubmitHandler = useCallback(event => {
    event.preventDefault()
    console.log(email, password)
  }, [])

  const onResetClickHandler = useCallback(() => {
    setEmail('')
    setPassword('')
    firstInputRef.current.focus()
  }, [])

  useEffect(() => {
    setIsButtonDisabled(email === '' || password === '')
  }, [email, password])

  const firstInputRef = useRef()
  useEffect(() => {
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
    />
  )
}

export default Signup
