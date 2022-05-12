import { ApplicationEntity } from '../domain/application.entity'
import { DefaultEntityState } from './default-entity-state.interface'

export interface ApplicationsState extends DefaultEntityState<ApplicationEntity> {
  joinEnvApp: Record<string, string[]>
}