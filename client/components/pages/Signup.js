const SignupRps = ({ values, business, refs }) => {
  const { email, password, isButtonDisabled } = values
  const {
    onSubmitHandler,
    onEmailChangeHandler,
    onPasswordChangeHandler,
    onResetClickHandler,
  } = business
  const { firstInputRef } = refs

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
          >
            Reset
          </button>
          <button className='btn btn-primary'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default SignupRps
