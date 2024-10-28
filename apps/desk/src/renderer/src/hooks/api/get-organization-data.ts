import { useQuery } from "@tanstack/react-query"

//TODO: use api Library to get the organization data
export const useOrganizationData = (organizationId: string | null) => {
  return useQuery({
    queryKey: ['organizationData', organizationId],
    queryFn: async () => {
      if (!organizationId) return null
      const response = await fetch(`/api/organizations/${organizationId}`)
      if (!response.ok) throw new Error('Failed to fetch organization')
      return response.json()
    }
  })
}
