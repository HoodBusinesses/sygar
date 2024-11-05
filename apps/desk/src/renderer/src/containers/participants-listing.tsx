import React, { useMemo, useState } from 'react'
import ParticipantsTable from '@renderer/components/ParticipantsTable'
import { mockParticipant } from '@renderer/utils/static/organizations'
// import { sortConfig } from '@renderer/utils/filter/filter'
import { useTranslate } from '@renderer/hooks/useTranslate'
import withAuth from '@renderer/hoc/with-auth'

const ITEMS_PER_PAGE = 14

const ParticipantsListing: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  // const [sortConfig, setSortConfig] = useState<sortConfig>()
  const { isRtl } = useTranslate()

  // Memoized filtered data
  const filteredParticipants = useMemo(() => {
    return mockParticipant.filter((participant) =>
      participant.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  // Memoized paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredParticipants.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredParticipants, currentPage])

  const handlePageChange = (newPage: number): void => {
    setCurrentPage(Math.min(Math.max(1, newPage), totalPages))
  }

  const totalPages = Math.ceil(filteredParticipants.length / ITEMS_PER_PAGE)

  // const handleReset = (): void => {
  //   setSearchQuery('')
  //   setCurrentPage(1)
  // }

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full bg-white w-full p-6 space-y-6">
      <div className="flex flex-col">
        <ParticipantsTable data={paginatedData} />
      </div>
    </div>
  )
}

export default withAuth(ParticipantsListing)
