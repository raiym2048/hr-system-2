const checkObject = (obj: object) => { // this function is used in labelsAndValuesToString function
  const objectValue = Object.values(obj)[0] // if object's value is another object...
  const objectValueKeys = Object.keys(objectValue) // ...which contains 'label' and 'value...
  if (objectValueKeys.includes('label') && objectValueKeys.includes('value')) {  
    return true // ... return true, otherwise false
  }
  return false
}

export const labelsAndValuesToString = (item: object | []): object | [] => {
  if (item === null) return item // if null - return immediately

  if (Array.isArray(item)) { // if array - run every element recursively and return transphormed array
    const newItem = []
    for (const itemInArray of item) {   
      const result = labelsAndValuesToString(itemInArray)
      newItem.push(result)
    }
    return newItem
  }

  if (typeof item === 'object') { // check if it is an object
    const objectKeys = Object.keys(item)      

    if (objectKeys.length > 1) { // if it has multiple keys - run every object recursively ... 
      const newItem = {} // ... and return transphormed object
      for (const key in item) {
        const result = labelsAndValuesToString({[key]: item[key as keyof typeof item]})
        Object.assign(newItem, result)
      }  
    return newItem
    }
    
    if (checkObject(item)) { // check if object has to be transphormed
      const objectEntries = Object.entries(item)[0]
      const newItem = {[objectEntries[0]]: objectEntries[1].value} // ! make object's value's 'value' field its value
      return newItem
    }
  }
  return item // return everything else unchanged
}