import { twMerge } from '@qovery/shared/util-js'
import { type IconProps } from '../icon'

export function HelmOfficialIcon({ className, ...props }: IconProps) {
  return (
    <svg
      className={twMerge('fill-current', className)}
      viewBox="0 0 24 24"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Helm icon</title>
      <path d="M18.651,19.252c0.704,1.005,0.96,2.039,0.573,2.31c-0.387,0.271-1.271-0.324-1.975-1.329 c-0.259-0.37-0.456-0.744-0.584-1.082c-1.156,0.772-2.493,1.258-3.898,1.4c0.081,0.34,0.13,0.737,0.13,1.166 c0,1.227-0.383,2.221-0.856,2.221c-0.473,0-0.856-0.994-0.856-2.221c0-0.42,0.047-0.807,0.125-1.142 c-1.414-0.099-2.765-0.547-3.944-1.284c-0.127,0.301-0.3,0.621-0.524,0.942c-0.704,1.005-1.588,1.6-1.975,1.329 c-0.387-0.271-0.131-1.305,0.573-2.31c0.236-0.337,0.492-0.622,0.743-0.85c-0.487-0.437-0.928-0.931-1.309-1.479l1.124-0.782 c1.345,1.934,3.554,3.088,5.908,3.088c2.36,0,4.571-1.158,5.916-3.098l1.125,0.78c-0.348,0.502-0.747,0.957-1.183,1.366 C18.06,18.518,18.369,18.85,18.651,19.252z M6.277,5.623C5.682,6.143,5.153,6.746,4.711,7.43l1.15,0.743 C7.193,6.111,9.453,4.88,11.907,4.88c2.535,0,4.835,1.294,6.151,3.461l1.17-0.711c-0.435-0.716-0.963-1.349-1.56-1.895 c0.324-0.245,0.671-0.603,0.983-1.049c0.704-1.005,0.96-2.039,0.573-2.31c-0.387-0.271-1.271,0.324-1.975,1.329 c-0.294,0.419-0.504,0.84-0.627,1.212c-1.152-0.761-2.485-1.232-3.9-1.364c0.108-0.372,0.175-0.83,0.175-1.333 C12.897,0.994,12.514,0,12.041,0c-0.473,0-0.856,0.994-0.856,2.221c0,0.491,0.063,0.941,0.167,1.308 c-1.413,0.09-2.757,0.525-3.93,1.247c-0.128-0.336-0.323-0.705-0.58-1.071C6.139,2.7,5.255,2.106,4.868,2.377 c-0.387,0.271-0.131,1.305,0.573,2.31C5.706,5.065,5.997,5.385,6.277,5.623z M0.5,15.272h1.648V12.8h1.859v2.473h1.648V9.043H4.008 v2.319H2.148V9.043H0.5V15.272z M7.036,9.043v6.229h4.121v-1.38H8.684v-1.112h2.032v-1.38H8.684v-0.978h2.377v-1.38L7.036,9.043 L7.036,9.043z M12.364,9.043v6.229h4.006v-1.38h-2.358V9.043L12.364,9.043L12.364,9.043z M17.443,9.043v6.229h1.514v-1.84 c0-0.16-0.008-0.335-0.024-0.527c-0.016-0.192-0.034-0.388-0.053-0.589c-0.019-0.201-0.042-0.398-0.067-0.589 c-0.026-0.192-0.048-0.364-0.067-0.517h0.038l0.498,1.457l0.863,2.099h0.613l0.862-2.099l0.517-1.457h0.038 c-0.019,0.153-0.042,0.326-0.067,0.518c-0.026,0.192-0.048,0.388-0.067,0.589c-0.019,0.201-0.037,0.398-0.053,0.589 c-0.016,0.192-0.024,0.367-0.024,0.527v1.84H23.5V9.043h-1.706l-0.939,2.588l-0.345,1.016h-0.038l-0.345-1.016l-0.978-2.588 L17.443,9.043L17.443,9.043z" />
    </svg>
  )
}

export default HelmOfficialIcon
