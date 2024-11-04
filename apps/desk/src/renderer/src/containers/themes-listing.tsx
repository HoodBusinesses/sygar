import React, { useMemo, useState } from 'react'
import Pagination from '@renderer/components/Pagination'
import ThemeHeader from '@renderer/components/ThemeHeader'
import { useTranslate } from '@renderer/hooks/useTranslate'
import { mockThemes } from '@renderer/utils/static/organizations'
import ThemesTable from '@renderer/components/ThemesTable'
import withAuth from '@renderer/hoc/with-auth'

const ITEMS_PER_PAGE = 14

const ThemesListing: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const { isRtl } = useTranslate()
  // const [totalPages, setTotalPages] = useState(1);

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
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full bg-white w-full p-6 space-y-6">
      <ThemeHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder={'themesTable.placeholder'}
      />
      <div className="flex flex-col">
        <ThemesTable data={paginatedThemes} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default withAuth(ThemesListing)
