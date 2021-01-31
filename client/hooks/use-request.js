import axios from 'axios'
import { useState } from 'react'

const useRequest = ({ url, method = 'get', body = {} }) => {
  const [errors, setErrors] = useState(null)

  const doRequest = async () => {
    try {
      const response = await axios[method](url, body)
      setErrors(null)
      return response.data
    } catch (err) {
      setErrors(
        <div className='alert alert-warning my-3' role='alert'>
          <h4 className='mb-3'>Something needs to be fixed:</h4>
          <ul>
            {err.response.data.errors.map(({ message }, index) => (
              <li key={`${index} | ${url}`}>{message}</li>
            ))}
          </ul>
        </div>
      )
    }
  }

  return [doRequest, errors]
}

export default useRequest
