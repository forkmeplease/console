import { getByText, queryByText } from '@testing-library/react'
import { render } from '__tests__/utils/setup-jest'
import { DatabaseModeEnum, ServiceDeploymentStatusEnum, StateEnum } from 'qovery-typescript-axios'
import { RunningStatus } from '@qovery/shared/enums'
import { databaseFactoryMock } from '@qovery/shared/factories'
import { DatabaseButtonsActions, DatabaseButtonsActionsProps } from './database-buttons-actions'

const mockDatabase = databaseFactoryMock(1)[0]
const props: DatabaseButtonsActionsProps = {
  database: mockDatabase,
  environmentMode: 'development',
}

describe('DatabaseButtonsActionsFeature', () => {
  beforeEach(() => {
    mockDatabase.status = {
      state: StateEnum.STOPPED,
      id: 'id',
      message: 'message',
      service_deployment_status: ServiceDeploymentStatusEnum.UP_TO_DATE,
    }
    mockDatabase.running_status = {
      state: RunningStatus.RUNNING,
      id: 'id',
      pods: [],
    }
  })

  it('should render successfully', () => {
    const { baseElement } = render(<DatabaseButtonsActions {...props} />)
    expect(baseElement).toBeTruthy()
  })

  it('should render actions for RUNNING status', async () => {
    mockDatabase.status.state = StateEnum.RUNNING
    const { baseElement } = render(<DatabaseButtonsActions {...props} />)

    getByText(baseElement, 'Redeploy')
    getByText(baseElement, 'Stop')
    getByText(baseElement, 'Restart Database')

    getByText(baseElement, 'Copy identifiers')
    getByText(baseElement, 'Delete database')
  })

  it('should render actions for STOPPED status', async () => {
    mockDatabase.status.state = StateEnum.STOPPED
    const { baseElement } = render(<DatabaseButtonsActions {...props} />)

    getByText(baseElement, 'Deploy')

    getByText(baseElement, 'Copy identifiers')
    getByText(baseElement, 'Delete database')
  })

  it('should not render Restart Database if running status is not running', async () => {
    if (mockDatabase.running_status) {
      mockDatabase.running_status.state = RunningStatus.STOPPED
    }

    const { baseElement } = render(<DatabaseButtonsActions {...props} />)

    expect(queryByText(baseElement, 'Restart Database')).toBeNull()
  })

  it('should not render Restart Database if database is managed', async () => {
    mockDatabase.mode = DatabaseModeEnum.MANAGED

    const { baseElement } = render(<DatabaseButtonsActions {...props} />)

    expect(queryByText(baseElement, 'Restart Database')).toBeNull()
  })
})