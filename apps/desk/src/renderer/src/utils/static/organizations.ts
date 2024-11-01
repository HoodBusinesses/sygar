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
const names = [
  'Kadin Herwitz',
  'Courtney Henry',
  'Eleanor Pena',
  'Brooklyn Simmons',
  'Floyd Miles',
  'Cody Fisher',
  'Marvin McKinney',
  'Cameron Williamson',
  'Savannah Nguyen'
]

export const mockParticipant = Array.from({ length: 50 }, (_, index) => {
  const statusOptions = ['Open', 'Success', 'Inactive', 'Warning', 'Error']

  return {
    id: index + 1,
    name: names[index % names.length],
    email: 'PAQUETA@GMAIL.COM',
    cin: 'U208988',
    cnss: '132456798',
    status: statusOptions[index % statusOptions.length]
  }
})

export const mockThemes = Array.from({ length: 50 }, (_, index) => {
  const identifierOptions = [
    'FORMATION_ON_PYTHON',
    'FORMATION_ON_C++',
    'FORMATION_ON_C',
    'FORMATION_ON_WEB',
    'FORMATION_ON_JAVA'
  ]
  const year = (2010 + Math.floor(Math.random() * 13)).toString() // Random year between 2010 and 2022
  const price = (Math.random() * 1000).toFixed(2) // Random price between 0 and 1000 with 2 decimal places

  return {
    id: index + 1,
    name: names[index % names.length],
    identifier: identifierOptions[Math.floor(Math.random() * identifierOptions.length)],
    year: year,
    price: parseFloat(price)
  }
})
