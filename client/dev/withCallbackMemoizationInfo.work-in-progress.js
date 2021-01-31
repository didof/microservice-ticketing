import { useState, useEffect } from 'react'

const extractGroupsOfFunctionsShallow = obj => {
  const object = Object.assign({}, obj)
  let output = {}

  Object.entries(object).forEach(([key, values]) => {
    const roundFunctios = Object.values(values).reduce(
      (accumulator, current) => {
        if (typeof current === 'function') {
          accumulator.push(current)
        }
        return accumulator
      },
      []
    )

    if (roundFunctios.length > 0) {
      output[key] = roundFunctios
    }
  })
  return output
}

const WithCallbackMemoizationInfo = Component => componentProps => {
  let counter = 0
  const [sets, setSets] = useState([])
  const groups = extractGroupsOfFunctionsShallow(componentProps)

  useEffect(() => {
    const settified = Object.entries(groups).map(([group, functions]) => ({
      name: group,
      set: new Set(functions),
    }))
    setSets(settified)
  }, [])

  sets.forEach(({ name, set }) => {
    console.info(`watching group [${name}]...`)
  })

  return <Component {...componentProps} />
}

export default WithCallbackMemoizationInfo
