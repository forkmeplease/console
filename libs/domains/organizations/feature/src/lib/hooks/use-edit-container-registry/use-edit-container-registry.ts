import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mutations } from '@qovery/domains/organizations/data-access'
import { queries } from '@qovery/state/util-queries'

export function useEditContainerRegistry() {
  const queryClient = useQueryClient()

  return useMutation(mutations.editContainerRegistry, {
    onSuccess(_, { organizationId }) {
      queryClient.invalidateQueries({
        queryKey: queries.organizations.containerRegistries({ organizationId }).queryKey,
      })
    },
    meta: {
      notifyOnSuccess: {
        title: 'Your container registry has been edited',
      },
      notifyOnError: true,
    },
  })
}

export default useEditContainerRegistry
