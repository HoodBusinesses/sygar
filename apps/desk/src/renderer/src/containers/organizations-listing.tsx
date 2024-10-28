import { useMemo, useState } from 'react'
import Search from '../components/Search'
import SortByPopover from '../components/SortBy'
import Filter from '../components/Filter'
import OrgListingHeader from '@renderer/components/OrganizationListingHeader'
import Pagination from '@renderer/components/Pagination'
import OrganizationTable from '@renderer/components/OrganizationTable'
import { mockOrganizations } from '@renderer/utils/static/organizations'
import { applyFilters, sortConfig } from '@renderer/utils/filter/filter'
import OrgModals from '@renderer/components/OrgModals'
import Navbar from '@renderer/components/Navbar'
import { useTranslate } from '@renderer/hooks/useTranslate'

const ITEMS_PER_PAGE = 10

const OrganizationsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<sortConfig>()
  const { isRtl} = useTranslate()

  const [modals, setModals] = useState({
    isDeleteModalOpen: false,
    isExportModalOpen: false,
    isImportModalOpen: false,
    isSubscriptionModalOpen: false,
    editModalOpen: false
  })

  const setModalState = (modalName, state): void => {
    setModals(prevModals => ({
      ...prevModals,
      [modalName]: state
    }))
  }

  const handleCloseModals = (): void => {
    setModals({
      isDeleteModalOpen: false,
      isExportModalOpen: false,
      isImportModalOpen: false,
      isSubscriptionModalOpen: false,
      editModalOpen: false
    })
  }
  const openDeleteModal = (): void => setModalState('isDeleteModalOpen', true)
  const openExportModal = (): void => setModalState('isExportModalOpen', true)
  const openImportModal = (): void => setModalState('isImportModalOpen', true)
  const openSubscriptionModal = (): void => setModalState('isSubscriptionModalOpen', true)
  const openEditModal = (): void => setModalState('editModalOpen', true)

  // Memoized filtered data
  const filteredOrganizations = useMemo(() => {
    return applyFilters(mockOrganizations, { searchQuery, sortConfig })
  }, [searchQuery, sortConfig])

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
  }

  return (
    <main dir={isRtl ? 'rtl' : 'ltr'} className="h-full bg-white w-full p-6 space-y-6">
      {!modals.editModalOpen && (
        <>
          {/* Header */}
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

      {/** MODALS */}
      <OrgModals modals={modals} handleCloseModals={handleCloseModals} />
    </main>
  )
}

export default OrganizationsPage
