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