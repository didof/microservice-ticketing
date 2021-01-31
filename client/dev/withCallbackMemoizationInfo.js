import { useState } from 'react'

const extractFunctionsShallow = obj => {
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
  const groups = []
  const sets = []
  const extractedFunctions = extractFunctionsShallow(componentProps)

  Object.entries(extractedFunctions).forEach(([group, functions]) => {
    groups.push(group)
    sets.push(new Set(functions))
  })

  sets.forEach((set, index) => {
    console.log(`watching group [${groups[index]}]...`)
    console.info(set)
  })

  return <Component {...componentProps} />
}

export default WithCallbackMemoizationInfo
