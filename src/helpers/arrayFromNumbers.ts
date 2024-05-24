const arrayFromNumbers = (start: number, stop: number, step: number): number[] => {
  const length = (stop - start) / step + 1
  const result = Array.from({length: length}, (_, index) => start + index * step)
  return result
}

export default arrayFromNumbers