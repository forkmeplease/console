import { StatusLabel, type StatusLabelProps, Tooltip } from '@qovery/shared/ui'
import { dateFullFormat, timeAgo } from '@qovery/shared/util-dates'
import { useDeploymentStatus } from '../hooks/use-deployment-status/use-deployment-status'

export interface ServiceDeploymentStatusLabelProps extends Omit<StatusLabelProps, 'status'> {
  environmentId?: string
  serviceId?: string
}

export function ServiceDeploymentStatusLabel({
  environmentId,
  serviceId,
  ...props
}: ServiceDeploymentStatusLabelProps) {
  const { data: deploymentStatus } = useDeploymentStatus({ environmentId, serviceId })
  return (
    <div className="flex items-center gap-3 leading-7 text-neutral-350 text-sm">
      <StatusLabel status={deploymentStatus?.state} {...props} />
      {deploymentStatus?.last_deployment_date && (
        <Tooltip content={dateFullFormat(deploymentStatus.last_deployment_date)}>
          <span className="text-xs text-neutral-300 font-medium">
            {timeAgo(new Date(deploymentStatus.last_deployment_date))} ago
          </span>
        </Tooltip>
      )}
    </div>
  )
}

export default ServiceDeploymentStatusLabel
