export const mockOrganizations = Array.from({ length: 50 }, (_, index) => {
  const year = 2020 + Math.floor(index / 12)
  const month = (index % 12) + 1
  const formattedMonth = month.toString().padStart(2, '0')
  return {
    id: index * 10 + 1,
    image: '/api/placeholder/40/40',
    rs: `Organization ${index + 1}`,
    cnss: `CNSS-${index + 1}`,
    address: `Address ${index + 1}`,
    email: `org${index + 1}@example.com`,
    responsibleName: `Manager ${index + 1}`,
    trainingManagerName: `Trainer ${index + 1}`,
    date: `**/${formattedMonth}/${year}`,
    enabled: index % 2 === 0
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
  const formationsNames = [
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
    name: formationsNames[Math.floor(Math.random() * formationsNames.length)],
    year: year,
    price: parseFloat(price),
    identifier: ''
  }
})

const facilitators = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Ethan Hunt']
const trainers = ['Frank Castle', 'Grace Hopper', 'Hank Pym', 'Ivy League', 'Jack Sparrow']
const themes = [
  'Leadership Training',
  'Technical Skills',
  'Soft Skills',
  'Project Management',
  'Time Management'
]
const locations = ['Room 20', 'Room 15', 'Room 11', 'Room 10', 'Room 7']

export const mockGroups = Array.from({ length: 50 }, (_, index) => {
  const year = 2020 + Math.floor(index / 12)
  const month = (index % 12) + 1
  const day = (index % 28) + 1

  const startMonth = new Date(year, month - 1, day).toLocaleString('default', {
    month: 'short'
  })
  const endMonth = new Date(year, month, day).toLocaleString('default', {
    month: 'short'
  })
  const startDate = `${startMonth} ${day}`
  const endDate = `${endMonth} ${(day % 28) + 1}`

  return {
    id: index + 1,
    facilator: facilitators[index % facilitators.length],
    trainer: trainers[index % trainers.length],
    theme: themes[index % themes.length],
    location: locations[index % locations.length],
    date: `${startDate} to ${endDate}`
  }
})

export const mockMember = Array.from({ length: 3 }, (_, index) => {
  return {
    id: index + 1,
    fullName: 'John Doe',
    email: 'John@example.com',
    role: 'manager',
    actionType: 'edit'
  }
})
