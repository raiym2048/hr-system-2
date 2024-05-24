export const modifyTypeOfEmployments = (arg: string | string[]) => {
  if (typeof(arg) === 'string') {
    return arg.replaceAll("_", " ")
  }

  if (Array.isArray(arg)) {
    return arg.map(item => item.replaceAll("_", " "))
  }

  return arg
}