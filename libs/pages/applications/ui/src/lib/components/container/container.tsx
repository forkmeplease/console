import { Application, SignUp } from 'qovery-typescript-axios'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { LayoutPage } from '@console/shared/ui'
import { APPLICATION_URL } from '@console/shared/utils'

export interface ContainerProps {
  authLogout: () => void
  user: SignUp
  applications: Application[]
}

export function Container(props: ContainerProps) {
  const { authLogout, user, applications } = props
  const { organizationId, projectId, environmentId } = useParams()
  const navigate = useNavigate()

  return (
    <LayoutPage authLogout={authLogout} user={user}>
      <div>
        <button className="mb-2" onClick={() => navigate(-1)}>
          Back
        </button>
        <h1>Welcome to Applications!</h1>
        <ul className="mt-8">
          {applications &&
            applications.map((application: Application) => (
              <li key={application.id}>
                <Link
                  className="link text-accent2-500"
                  to={APPLICATION_URL(organizationId, projectId, environmentId, application.id)}
                >
                  {application.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </LayoutPage>
  )
}

export default Container
