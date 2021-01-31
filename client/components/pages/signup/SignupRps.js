import { useCallback } from 'react'

const SignupRps = ({ values, business, refs }) => {
  const { email, password, isButtonDisabled, errors } = values
  const {
    onSubmitHandler,
    onEmailChangeHandler,
    onPasswordChangeHandler,
    onResetClickHandler,
  } = business
  const { firstInputRef } = refs

  const renderWarningAlerts = useCallback(() => {
    if (errors.length === 0) return

    return (
      <div className='alert alert-warning my-3' role='alert'>
        <h4 className='mb-3'>Something needs to be fixed:</h4>
        <ul>
          {errors.map(({ message }, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    )
  }, [errors])

  return (
    <div className='container'>
      <h1>Sign up</h1>
      <form onSubmit={onSubmitHandler}>
        <div className='form-group'>
          <label>Email address</label>
          <input
            className='form-control'
            type='text'
            value={email}
            onChange={onEmailChangeHandler}
            ref={firstInputRef}
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            className='form-control'
            type='password'
            value={password}
            onChange={onPasswordChangeHandler}
          />
        </div>
        <div className='btn-group' role='group'>
          <button
            className='btn btn-outline-warning'
            onClick={onResetClickHandler}
            disabled={isButtonDisabled}
            type='reset'
          >
            Reset
          </button>
          <button className='btn btn-primary'>Submit</button>
        </div>
      </form>
      {renderWarningAlerts()}
    </div>
  )
}

export default SignupRps
