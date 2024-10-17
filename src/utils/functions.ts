export const convertDate = (dateInString: string | undefined) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  
  if (dateInString) {
    const date = new Date(dateInString)

    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    const hours = (date.getHours() % 12) || 12 // Convert to 12-hour format
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const period = date.getHours() < 12 ? 'AM' : 'PM'
    
    return `${month} ${day}, ${year} ${hours}:${minutes} ${period}`
  }
}