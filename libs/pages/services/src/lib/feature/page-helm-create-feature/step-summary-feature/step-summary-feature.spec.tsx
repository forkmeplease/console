import { useForm } from 'react-hook-form'
import * as serviceHelmDomain from '@qovery/domains/service-helm/feature'
import { renderHook, renderWithProviders } from '@qovery/shared/util-tests'
import { type HelmGeneralData, type HelmValuesAsFileData } from '../page-helm-create-feature'
import { HelmCreateContext } from '../page-helm-create-feature'
import StepSummaryFeature from './step-summary-feature'

import SpyInstance = jest.SpyInstance

const useHelmRepositorySpy: SpyInstance = jest.spyOn(serviceHelmDomain, 'useHelmRepository')

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ organizationId: '1' }),
}))

describe('PageApplicationCreateGeneralFeature', () => {
  beforeEach(() => {
    useHelmRepositorySpy.mockReturnValue({
      data: [
        {
          id: '000-000-000',
          name: 'my-helm-repository',
          created_at: '',
        },
      ],
      isFetched: true,
      isLoading: false,
    })
  })

  it('should render successfully', () => {
    const { result: generalForm } = renderHook(() =>
      useForm<HelmGeneralData>({
        mode: 'onChange',
        defaultValues: {
          source_provider: 'GIT',
          provider: 'GITHUB',
          repository: 'Qovery/github',
          branch: 'main',
          root_path: '/',
        },
      })
    )

    const { result: valuesOverrideFileForm } = renderHook(() =>
      useForm<HelmValuesAsFileData>({
        mode: 'onChange',
        defaultValues: {
          type: 'YAML',
          content: 'test',
        },
      })
    )

    const { baseElement } = renderWithProviders(
      <HelmCreateContext.Provider
        value={{
          currentStep: 1,
          setCurrentStep: jest.fn(),
          generalForm: generalForm.current,
          valuesOverrideFileForm: valuesOverrideFileForm.current,
        }}
      >
        <StepSummaryFeature />
      </HelmCreateContext.Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
