import React, { useMemo, useState } from 'react'
import Pagination from '@renderer/components/Pagination'
import ThemeHeader from '@renderer/components/ThemeHeader'
import { useTranslate } from '@renderer/hooks/useTranslate'
import { mockThemes } from '@renderer/utils/static/organizations'
import ThemesTable from '@renderer/components/ThemesTable'
import withAuth from '@renderer/hoc/with-auth'
import { List } from 'lucide-react'
import ListingHeader from '@renderer/components/ListingHeader'
import SearchAndFilters from '@renderer/components/SearchAndFilter'
import { sortConfig } from '@renderer/utils/filter/filter'
import GroupsListing from '@renderer/components/GroupsListing'
import OrgModals from '@renderer/components/OrgModals'

const ITEMS_PER_PAGE = 14

const ThemesListing: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<sortConfig>()
  const [filters, setFilters] = useState<any>({})
  const { isRtl } = useTranslate()

  const [modals, setModals] = useState({
    isImportModalOpen: false,
    isExportModalOpen: false,
    isDeleteModalOpen: false,
    isGroupsModalOpen: false,
    isSubscriptionModalOpen: false,
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
  const openGroupsModalOpen = (): void => setModalState('isGroupsModalOpen', true)
  const openSubscriptionModal = (): void => setModalState('isSubscriptionModalOpen', true)
  const openEditModal = (): void => setModalState('editModalOpen', true)

  const filteredThemes = useMemo(() => {
    return mockThemes.filter((theme) =>
      theme.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const paginatedThemes = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredThemes.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredThemes, currentPage])

  const totalPages = Math.ceil(mockThemes.length / ITEMS_PER_PAGE)

  const handlePageChange = (newPage): void => {
    setCurrentPage(Math.min(Math.max(1, newPage), totalPages))
  }

  return (
    <main dir={isRtl ? 'rtl' : 'ltr'} className="h-full bg-white w-full p-6 space-y-6">
      {!modals.isGroupsModalOpen && (
        <>
          <ListingHeader
            openImportModal={openImportModal}
            openExportModal={openExportModal}
            headTitle={'themesTable.title'}
          />
          <SearchAndFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSortConfig={setSortConfig}
            setFilter={setFilters}
          />
          <div className="flex flex-col">
            <ThemesTable
              data={paginatedThemes}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
              openGroupsModal={openGroupsModalOpen}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
      <OrgModals modals={modals} handleCloseModals={handleCloseModals} />
    </main>
  )
}

export default withAuth(ThemesListing)
