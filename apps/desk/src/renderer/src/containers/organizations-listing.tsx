import { useMemo, useState } from 'react'
import Search from '../components/Search'
import { Button } from '../components/ui/button'
import { useTranslation } from 'react-i18next'
import DeleteModal from '../components/DeleteModal'
import ExportModal from '../components/ExportModal'
import ImportModal from '../components/ImportModal'
import SubscriptionModal from '../components/SubscriptionModal'
import SortByPopover from '../components/SortBy'
import Filter from '../components/Filter'
import RegistrationInfo from '../components/RegistrationInfo'
import OrgListingHeader from '@renderer/components/OrganizationListingHeader'
import Pagination from '@renderer/components/Pagination'
import OrganizationTable from '@renderer/components/OrganizationTable'

const ITEMS_PER_PAGE = 10
const DATE_OPTIONS = ['All', ...Array.from({ length: 50 }, (_, index) => `${2020 + index}`)]
type FilterObject = {
  searchQuery?: string
  selectedDate?: string
}

const applyFilters = (organizations, filters: FilterObject) => {
  return organizations.filter((org) => {
    const matchesSearchQuery = filters.searchQuery
      ? Object.values(org).some((value) =>
          value.toString().toLowerCase().includes(filters.searchQuery.toLowerCase())
        )
      : true
    const matchesSelectedDate = filters.selectedDate
      ? filters.selectedDate === 'All' || org.date.includes(filters.selectedDate)
      : true
    return matchesSearchQuery && matchesSelectedDate
  })
}

const mockOrganizations = Array.from({ length: 50 }, (_, index) => {
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

const OrganizationsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedDate, setSelectedDate] = useState(DATE_OPTIONS[0])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState(null)
  const {t} = useTranslation()

  // Memoized filtered data
  const filteredOrganizations = useMemo(() => {
    let filtered = applyFilters(mockOrganizations, {
      searchQuery,
      selectedDate
    })

    if (sortConfig) {
      filtered.sort((a, b) => {
        if (sortConfig.field === 'email') {
          return sortConfig.direction === 'asc'
            ? a.email.localeCompare(b.email)
            : b.email.localeCompare(a.email)
        }
        if (sortConfig.field === 'createdDate') {
          return sortConfig.direction === 'asc'
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime()
        }
        return 0
      })
    }

    return filtered
  }, [searchQuery, selectedDate, sortConfig])

  // Memoized paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredOrganizations.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredOrganizations, currentPage])

  const totalPages = Math.ceil(filteredOrganizations.length / ITEMS_PER_PAGE)

  const handlePageChange = (newPage): void => {
    setCurrentPage(Math.min(Math.max(1, newPage), totalPages))
  }

  const handleReset = (): void => {
    setSearchQuery('')
    setCurrentPage(1)
    setSelectedDate(DATE_OPTIONS[0])
  }


  const handleCloseModals = (): void => {
    setIsDeleteModalOpen(false)
    setIsExportModalOpen(false)
    setIsImportModalOpen(false)
    setIsSubscriptionModalOpen(false)
    setEditModalOpen(false)
  }

  const openDeleteModal = (): void => setIsDeleteModalOpen(true)
  const openExportModal = (): void => setIsExportModalOpen(true)
  const openImportModal = (): void => setIsImportModalOpen(true)
  const openSubscriptionModal = (): void => setIsSubscriptionModalOpen(true)
  const openEditModal = (): void => setEditModalOpen(true)

  return (
    <main className="h-full bg-white w-full p-6 space-y-6">
      {/* Header */}
      {!editModalOpen && (
        <>
          <OrgListingHeader openImportModal={openImportModal} openExportModal={openExportModal} />

          {/* Search and Filters */}
          <div className="flex justify-between items-center mb-6 gap-4">

            {/* Left Section: Search Input */}
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* Right Section: Buttons and Profile */}
            <div className="flex gap-4">
              <SortByPopover onSort={(sortConfig) => setSortConfig(sortConfig)} />
              <Filter OnFilter={(filters) => console.log(filters)} />
            </div>
          </div>

          {/* Organization Table Component */}
          <OrganizationTable
            openEditModal={openEditModal}
            paginatedData={paginatedData}
            openSubscriptionModal={openSubscriptionModal}
            openDeleteModal={openDeleteModal}
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {isDeleteModalOpen && <DeleteModal onClose={handleCloseModals} />}
      {isExportModalOpen && <ExportModal onClose={handleCloseModals} />}
      {isImportModalOpen && <ImportModal onClose={handleCloseModals} />}
      {isSubscriptionModalOpen && <SubscriptionModal onClose={handleCloseModals} />}
      {editModalOpen && (
        <>
          <div className="flex flex-row p-5">
            <Button
              className="custom-button bg-blue-600 hover:bg-blue-500 "
              onClick={handleCloseModals}
            >
              Close
            </Button>
            <p className="text-xl text-gray-900 px-5">Back To Organizations</p>
          </div>

          <RegistrationInfo />
        </>
      )}
    </main>
  )
}

export default OrganizationsPage
