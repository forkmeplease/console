import { StatusLabel, type StatusLabelProps, Tooltip } from '@qovery/shared/ui'
import { dateFullFormat, timeAgo } from '@qovery/shared/util-dates'
import { useDeploymentStatus } from '../hooks/use-deployment-status/use-deployment-status'

export interface EnvironmentDeploymentStatusLabelProps extends Omit<StatusLabelProps, 'status'> {
  environmentId?: string
}

export function EnvironmentDeploymentStatusLabel({ environmentId, ...props }: EnvironmentDeploymentStatusLabelProps) {
  const { data: deploymentStatus } = useDeploymentStatus({ environmentId })
  return (
    <div className="flex items-center gap-3 text-sm leading-7 text-neutral-350">
      <StatusLabel status={deploymentStatus?.state} {...props} />

      {deploymentStatus?.last_deployment_date && (
        <Tooltip content={dateFullFormat(deploymentStatus.last_deployment_date)}>
          <span className="text-xs font-medium text-neutral-300">
            {timeAgo(new Date(deploymentStatus.last_deployment_date))} ago
          </span>
        </Tooltip>
      )}
    </div>
  )
}

export default EnvironmentDeploymentStatusLabel
