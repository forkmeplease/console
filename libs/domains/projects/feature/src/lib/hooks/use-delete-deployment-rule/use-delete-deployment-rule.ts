import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mutations } from '@qovery/domains/projects/data-access'
import { queries } from '@qovery/state/util-queries'

export function useDeleteDeploymentRule() {
  const queryClient = useQueryClient()

  return useMutation(mutations.deleteDeploymentRule, {
    onSuccess(_, { projectId }) {
      queryClient.invalidateQueries({
        queryKey: queries.projects.listDeploymentRules({ projectId }).queryKey,
      })
    },
    meta: {
      notifyOnSuccess: {
        title: 'Your rule has been deleted',
      },
      notifyOnError: true,
    },
  })
}

export default useDeleteDeploymentRule
