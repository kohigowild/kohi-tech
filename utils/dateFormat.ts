export function getFormatDate(isoDateStr: string) {
  const date = new Date(isoDateStr)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function isNewPost(dateString: string): boolean {
  let givenDate: Date = new Date(dateString)
  let currentDate: Date = new Date()

  let timeDifference: number = givenDate.getTime() - currentDate.getTime()
  let daysDifference: number = timeDifference / (24 * 60 * 60 * 1000)

  daysDifference = Math.abs(daysDifference)

  return daysDifference <= 3
}
