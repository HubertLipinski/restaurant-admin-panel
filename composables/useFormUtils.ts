export default function() {

  const formErrorMap = (errors: Object) => {
    let errorArr = []

    for (const item in errors) {
      errorArr.push({
        path: item,
        message: errors[item][0],
      })
    }

    return errorArr
  }

  return {
    formErrorMap
  }
}