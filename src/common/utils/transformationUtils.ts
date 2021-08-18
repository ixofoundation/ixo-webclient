export const convertArrayToObject = (array, key): {} => {
  const initialValue = {}
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    }
  }, initialValue)
}

export const sortObject = (obj): any => {
	if (obj === null){
    return null
  }
	if (typeof obj !== "object") {
    return obj
  }
	if (Array.isArray(obj)) {
    return obj.map(sortObject)
  }
	const sortedKeys = Object.keys(obj).sort()
	const result = {}
	sortedKeys.forEach(key => {
		result[key] = sortObject(obj[key])
	})

	return result;
}
