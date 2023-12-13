import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mutations } from '@qovery/domains/services/data-access'
import { queries } from '@qovery/state/util-queries'
import useRedeployService from '../use-redeploy-service/use-redeploy-service'

export function useEditService({ environmentId }: { environmentId: string }) {
  const queryClient = useQueryClient()
  const { mutate: redeployService } = useRedeployService({ environmentId })

  return useMutation(mutations.editService, {
    onSuccess(_, { payload, serviceId }) {
      queryClient.invalidateQueries({
        queryKey: queries.services.details({ serviceType: payload.serviceType, serviceId }).queryKey,
      })
    },
    meta: {
      notifyOnSuccess(_: unknown, variables: unknown) {
        const { serviceId, payload } = variables as Parameters<typeof mutations.editService>[0]
        return {
          title: 'Service updated',
          description: 'You must update to apply the settings',
          callback() {
            redeployService({ serviceId, serviceType: payload.serviceType })
          },
          labelAction: 'Update',
        }
      },
      notifyOnError: true,
    },
  })
}

export default useEditService