export interface Organization {
  id: number
  image: string
  rs: string
  cnss: string
  address: string
  email: string
  responsibleName: string
  trainingManagerName: string
  date: string
}

export const mockOrganizations = Array.from({ length: 50 }, (_, index) => {
  const year = 2020 + Math.floor(index / 12)
  const month = (index % 12) + 1
  const formattedMonth = month.toString().padStart(2, '0')
  return {
    id: index + 1,
    image: '/api/placeholder/40/40',
    rs: `Organization ${index + 1}`,
    cnss: `CNSS-${index + 1}`,
    address: `Address ${index + 1}`,
    email: `org${index + 1}@example.com`,
    responsibleName: `Manager ${index + 1}`,
    trainingManagerName: `Trainer ${index + 1}`,
    date: `**/${formattedMonth}/${year}`
  }
})
