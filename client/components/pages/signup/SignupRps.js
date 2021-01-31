import { useCallback } from 'react'

const SignupRps = ({ values, business, refs, renderables }) => {
  const { email, password, isButtonDisabled } = values
  const {
    onSubmitHandler,
    onEmailChangeHandler,
    onPasswordChangeHandler,
    onResetClickHandler,
  } = business
  const { firstInputRef } = refs
  const { errors } = renderables

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
      {errors}
    </div>
  )
}

export default SignupRps
