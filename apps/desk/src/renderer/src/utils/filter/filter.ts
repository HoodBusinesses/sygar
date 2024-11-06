import { Organization } from '../static/organizations'

export interface sortConfig {
  field: string
  direction: 'asc' | 'desc'
}

export interface FilterObject {
  searchQuery: string
  sortConfig: sortConfig | undefined
}

export const applyFilters = (
  organizations: Organization[],
  filters: FilterObject
): Organization[] => {
  const filtered = organizations.filter((org) => {
    const matchesSearchQuery = filters.searchQuery
      ? Object.values(org).some((value) =>
          value.toString().toLowerCase().includes(filters.searchQuery.toLowerCase())
        )
      : true
    return matchesSearchQuery
  })

  if (filters) {
    filtered.sort((a, b) => {
      if (filters.sortConfig && filters.sortConfig.field === 'email') {
        return filters.sortConfig.direction === 'asc'
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email)
      }
      return 0
    })
  }

  return filtered
}
