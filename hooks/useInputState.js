import { useState } from 'react'

const useInput = (initialVal) => {
  const [val, setVal] = useState(initialVal)
  const handleChange = (e) => {
    setVal({ ...val, [e.target.name]: e.target.value })
  }
  const reset = () => {
    setVal(initialVal)
  }
  return [val, handleChange, reset]
}

export default useInput
