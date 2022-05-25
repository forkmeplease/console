import { DeploymentRuleState } from '@console/shared/interfaces'
import { addOneToManyRelation, getEntitiesByIds } from '@console/shared/utils'
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import { ProjectDeploymentRule, ProjectDeploymentRuleApi, ProjectDeploymentRuleRequest } from 'qovery-typescript-axios'
import { RootState } from '@console/store/data'

export const DEPLOYMENTRULES_FEATURE_KEY = 'deploymentRules'

const deploymentRulesApi = new ProjectDeploymentRuleApi()

export const deploymentRulesAdapter = createEntityAdapter<ProjectDeploymentRule>()

export const fetchDeploymentRules = createAsyncThunk<ProjectDeploymentRule[], { projectId: string }>(
  'project/deploymentRules/fetch',
  async (data) => {
    const response = await deploymentRulesApi
      .listProjectDeploymentRules(data.projectId)
      .then((response) => response.data)
    return response.results as ProjectDeploymentRule[]
  }
)

export const postDeploymentRules = createAsyncThunk<
  ProjectDeploymentRule,
  { projectId: string } & ProjectDeploymentRuleRequest
>('project/deploymentRules/post', async (data, { rejectWithValue }) => {
  const { projectId, ...fields } = data

  try {
    const result = await deploymentRulesApi.createDeploymentRule(projectId, fields).then((response) => response.data)
    return result
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const initialDeploymentRulesState: DeploymentRuleState = deploymentRulesAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
  joinProjectDeploymentRules: {},
})

export const deploymentRulesSlice = createSlice({
  name: DEPLOYMENTRULES_FEATURE_KEY,
  initialState: initialDeploymentRulesState,
  reducers: {
    addDeploymentRule: deploymentRulesAdapter.addOne,
    removeDeploymentRule: deploymentRulesAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeploymentRules.pending, (state: DeploymentRuleState) => {
        state.loadingStatus = 'loading'
      })
      .addCase(fetchDeploymentRules.fulfilled, (state: DeploymentRuleState, action) => {
        deploymentRulesAdapter.upsertMany(state, action.payload)
        action.payload.forEach((deploymentRule) => {
          state.joinProjectDeploymentRules = addOneToManyRelation(action.meta.arg.projectId, deploymentRule.id, {
            ...state.joinProjectDeploymentRules,
          })
        })

        state.loadingStatus = 'loaded'
      })
      .addCase(fetchDeploymentRules.rejected, (state: DeploymentRuleState, action) => {
        state.loadingStatus = 'error'
        state.error = action.error.message
      })
      // post
      .addCase(postDeploymentRules.pending, (state: DeploymentRuleState) => {
        state.loadingStatus = 'loading'
      })
      .addCase(postDeploymentRules.fulfilled, (state: DeploymentRuleState, action) => {
        deploymentRulesAdapter.upsertOne(state, action.payload)
        state.loadingStatus = 'loaded'
      })
      .addCase(postDeploymentRules.rejected, (state: DeploymentRuleState, action) => {
        state.loadingStatus = 'error'
        state.error = action.error.message
      })
  },
})

export const deploymentRulesReducer = deploymentRulesSlice.reducer

export const { addDeploymentRule, removeDeploymentRule } = deploymentRulesSlice.actions

const { selectAll, selectEntities } = deploymentRulesAdapter.getSelectors()

export const getDeploymentRulesState = (rootState: RootState): DeploymentRuleState =>
  rootState.entities.project[DEPLOYMENTRULES_FEATURE_KEY]

export const selectAllDeploymentRules = createSelector(getDeploymentRulesState, selectAll)

export const selectDeploymentRulesEntitiesByProjectId = (
  state: RootState,
  projectId: string
): ProjectDeploymentRule[] => {
  const deploymentRuleState = getDeploymentRulesState(state)
  return getEntitiesByIds<ProjectDeploymentRule>(
    deploymentRuleState.entities,
    deploymentRuleState?.joinProjectDeploymentRules[projectId]
  )
}

export const selectDeploymentRuleById = (state: RootState, deploymentRuleId: string) =>
  getDeploymentRulesState(state).entities[deploymentRuleId]

export const selectDeploymentRulesEntities = createSelector(getDeploymentRulesState, selectEntities)
