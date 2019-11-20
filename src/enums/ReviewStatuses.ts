export enum ReviewStatuses {
  draft = 'DRAFT',
  simulationNegative = 'SIMULATION_NEGATIVE',
  simulationPositive = 'SIMULATION_POSITIVE',
  simulationRequested = 'SIMULATION_REQUESTED',
  solved = 'SOLVED'
}

export const reviewStatusesMap: {[key in ReviewStatuses]: string} = {
  DRAFT: 'Draft',
  SIMULATION_NEGATIVE: 'Simulation Negative',
  SIMULATION_POSITIVE: 'Simulation Positive',
  SIMULATION_REQUESTED: 'Simulation Requested',
  SOLVED: 'Solved'
}