export const logCallbackMemoization = (...functions) => {
  console.log(functions)
  const set = new Set()
  functions.forEach(fn => set.add(fn))
  // console.info(set)
}
