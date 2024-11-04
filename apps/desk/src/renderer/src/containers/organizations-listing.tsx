import { useMemo, useState } from 'react'
import ListingHeader from '@renderer/components/ListingHeader'
import Pagination from '@renderer/components/Pagination'
import OrganizationTable from '@renderer/components/OrganizationTable'
import { mockOrganizations } from '@renderer/utils/static/organizations'
import { applyFilters, sortConfig } from '@renderer/utils/filter/filter'
import OrgModals from '@renderer/components/OrgModals'
import { useTranslate } from '@renderer/hooks/useTranslate'
import withAuth from '@renderer/hoc/with-auth'
import SearchAndFilters from '@renderer/components/SearchAndFilter'

const ITEMS_PER_PAGE = 10

const OrganizationsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<sortConfig>()
  const [filters, setFilters] = useState<any>({})
  const { isRtl } = useTranslate()

  const [modals, setModals] = useState({
    isImportModalOpen: false,
    isExportModalOpen: false,
    isDeleteModalOpen: false,
    isSubscriptionModalOpen: false,
    isGroupsModalOpen: false,
    editModalOpen: false
  })

  const setModalState = (modalName, state): void => {
    setModals((prevModals) => ({
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
      isGroupsModalOpen: false,
      editModalOpen: false
    })
  }
  const openDeleteModal = (): void => setModalState('isDeleteModalOpen', true)
  const openExportModal = (): void => setModalState('isExportModalOpen', true)
  const openImportModal = (): void => setModalState('isImportModalOpen', true)
  const openSubscriptionModal = (): void => setModalState('isSubscriptionModalOpen', true)
  const openGroupsModal = (): void => setModalState('editGroupsOpen', true)
  const openEditModal = (): void => setModalState('editModalOpen', true)

  // Memoized filtered data
  const filteredOrganizations = useMemo(() => {
    console.log('filteredOrganizations', filters)
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
          <ListingHeader headTitle={'organization.organizations'} />

          {/* Search and Filters */}
          {/* Left Section: Search Input */}
          <SearchAndFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSortConfig={setSortConfig}
            setFilter={setFilters}
          />

          {/* Organization Table Component */}
          <OrganizationTable paginatedData={paginatedData} />

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

export default withAuth(OrganizationsPage)
