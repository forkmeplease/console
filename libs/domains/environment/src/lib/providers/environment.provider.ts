import { Environment, EnvironmentsApi, Status } from 'qovery-typescript-axios'
import { useQueryClient, useMutation, useQuery } from 'react-query'
import { toast, ToastEnum } from '@console/shared/toast'

const environmentsApi = new EnvironmentsApi()

const environmentsKeys = {
  all: ['environments'] as const,
  status: () => [...environmentsKeys.all, 'status'] as const,
}

export const useFetchEnvironments = (projectId: string, withoutStatus?: boolean) => {
  const { status, data, refetch } = useQuery<Environment[]>(
    environmentsKeys.all,
    async () => {
      const response = await environmentsApi.listEnvironment(projectId)
      return response.data.results as Environment[]
    },
    {
      onError: () => toast(ToastEnum.ERROR, 'Fetching environments error'),
      onSuccess: () => {
        // console.log('hello')
      },
    }
  )

  const { environmentsStatus } = useFetchEnvironmentsStatus(projectId, true)

  // console.log(environmentsStatus)

  // rename data variable
  const environments = data

  return { status, environments, refetch }
}

export const useFetchEnvironmentsStatus = (projectId: string, enabled = false) => {
  const queryClient = useQueryClient()

  const { status, data, refetch } = useQuery<Status[]>(
    environmentsKeys.status(),
    async () => {
      const response = await environmentsApi.getProjectEnvironmentsStatus(projectId)
      return response.data.results as Status[]
    },
    {
      enabled: enabled,
      onSuccess: (data: Status[]) => {
        queryClient.setQueryData('environments', (currentData) => {
          console.log(data)
          console.log(currentData)
          return currentData
          // return {
          //   data: {
          //     ...currentData,
          //     status: data
          //   }
          // }
        })
      },
      onError: () => toast(ToastEnum.ERROR, 'Fetching environments status error'),
    }
  )

  const environmentsStatus = data

  return { status, environmentsStatus, refetch }

  // const { isLoading, isError, data } = useMutation(
  //   async () => {
  //     const response = await environmentsApi.getProjectEnvironmentsStatus(projectId)
  //     return response.data.results as Status[]
  //   },
  //   {
  //     onSuccess: (addEnvironmentStatus) => {
  //       console.log(addEnvironmentStatus)
  //       // queryClient.setQueryData(['todos', 'detail', newTodo.id], newTodo)

  //       // ✅ update the list we are currently on instantly
  //       // queryClient.setQueryData(['todos', 'list', { filters }], (previous) =>
  //       //   previous.map((todo) => (todo.id === newTodo.id ? newtodo : todo))
  //       // )

  //       // 🥳 invalidate all the lists, but don't refetch the active one
  //       // queryClient.invalidateQueries({
  //       //   queryKey: ['todos', 'list'],
  //       //   refetchActive: false,
  //       // })
  //     },
  //   }
  // )
}
