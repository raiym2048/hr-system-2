const monthNumberToName = (number: number): string => {
  if (typeof(number) !== 'number' || Number.isNaN(number)) {
    return ''
  }
  const date = new Date()
  date.setMonth(number - 1)
  return date.toLocaleString('ru', {month: 'long'})
}
export default monthNumberToName