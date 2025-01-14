import { Commit } from 'qovery-typescript-axios'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getApplicationsState, getCountNewCommitsToDeploy } from '@qovery/domains/application'
import { GitApplicationEntity } from '@qovery/shared/interfaces'
import { RootState } from '@qovery/store'
import LastCommit from '../../ui/last-commit/last-commit'

export function LastCommitFeature() {
  const { applicationId = '' } = useParams()
  const commitDeltaCount = useSelector(getCountNewCommitsToDeploy(applicationId))
  const application = useSelector<RootState, GitApplicationEntity | undefined>(
    (state) => getApplicationsState(state).entities[applicationId]
  )

  const getCommitById = (commits: Commit[]) => {
    const deployedCommit = commits.find(
      (commit) => commit.git_commit_id === application?.git_repository?.deployed_commit_id
    )

    if (deployedCommit) {
      return deployedCommit
    } else {
      return application?.git_repository
    }
  }

  return (
    <LastCommit
      commit={application?.commits?.items && getCommitById(application?.commits?.items)}
      loadingStatus={application?.commits?.loadingStatus}
      commitDeltaCount={commitDeltaCount}
    />
  )
}

export default LastCommitFeature
