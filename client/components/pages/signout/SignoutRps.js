const SignoutRps = ({ business, renderables }) => {
  const { onSubmitHandler } = business
  const { errors } = renderables

  return (
    <div className='container'>
      <h1>Sign out</h1>
      <form onClick={onSubmitHandler}>
        <button className='btn btn-primary'>Submit</button>
      </form>
      {errors}
    </div>
  )
}

export default SignoutRps
