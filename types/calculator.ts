export type UseType = 'household' | 'agriculture' | 'commercial' | 'industrial' | 'rainwater-harvesting'

export type OutputUnit = 'litres' | 'cubic-metres' | 'gallons'

export interface CalculatorInput {
  useType: UseType
  occupants?: number
  consumptionPerPerson?: number
  livestockCount?: number
  irrigationArea?: number
  facilityConsumption?: number
  autonomyDays: number
  rainfallMm?: number
  roofArea?: number
  collectionEfficiency?: number
  outputUnit: OutputUnit
}

export interface CalculatorResult {
  dailyDemand: number
  recommendedCapacity: number
  autonomyDays: number
  rainwaterEstimate?: number
  unit: OutputUnit
  assumptions: string[]
}
