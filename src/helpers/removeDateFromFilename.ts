const removeDateFromFilename = (arg: string): string => {
  return arg.split('**')[0] + '.' + arg.split('.')[1]
}
export default removeDateFromFilename