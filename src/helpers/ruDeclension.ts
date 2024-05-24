export default function declined(number: number, forOne: string, forTwo: string, forFive: string): string {
  const double = Math.abs(number) % 100
  if (double < 21 && double > 4) {
    return `${number} ${forFive}`
  }
  const single = double % 10
  if (single === 1) {
    return `${number} ${forOne}`
  } else if (single < 5 && single > 1) {
    return `${number} ${forTwo}`
  } else {
    return `${number} ${forFive}`    
  }
}