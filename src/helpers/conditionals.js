export const checkIfEmpty = (input) => {
  if(input.length === 0) {
    return true;
  } else {
    return false;
  }
}

export const emptyArray = (input) => {
  if(input.length > 0) {
    return false;
  } else {
    return true;
  }
}

export const checkEqual = (one, two) => {
  if(one.toString() === two.toString()) {
    return true
  } else {
    return false
  }
}

export const checkEmptyFields = (...args) => {
  let foundEmpty = false
  args.forEach(arg => {
    if(arg.length === 0 ){
      foundEmpty = true
    }
  })
  return foundEmpty
}

export const checkUndefined = (input) => {
  let isUndefined = false
  if(input === undefined) {
    isUndefined = true
  }
  return isUndefined
}