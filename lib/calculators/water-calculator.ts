import { CalculatorInput, CalculatorResult, OutputUnit } from '@/types/calculator'

const LITRES_PER_CUBIC_METRE = 1000
const LITRES_PER_US_GALLON = 3.78541

export function convertToLitres(value: number, fromUnit: OutputUnit): number {
  switch (fromUnit) {
    case 'cubic-metres':
      return value * LITRES_PER_CUBIC_METRE
    case 'gallons':
      return value * LITRES_PER_US_GALLON
    case 'litres':
    default:
      return value
  }
}

export function convertFromLitres(litres: number, toUnit: OutputUnit): number {
  switch (toUnit) {
    case 'cubic-metres':
      return litres / LITRES_PER_CUBIC_METRE
    case 'gallons':
      return litres / LITRES_PER_US_GALLON
    case 'litres':
    default:
      return litres
  }
}

export function calculateWaterRequirements(input: CalculatorInput): CalculatorResult {
  const assumptions: string[] = []
  let dailyDemand = 0

  // Calculate daily demand based on use type
  switch (input.useType) {
    case 'household':
      const occupants = input.occupants || 1
      const consumptionPerPerson = input.consumptionPerPerson || 150
      dailyDemand = occupants * consumptionPerPerson
      assumptions.push(`Household consumption based on ${occupants} occupants at ${consumptionPerPerson}L/person/day`)
      break

    case 'agriculture':
      if (input.livestockCount) {
        const livestockConsumption = input.livestockCount * 50 // 50L per livestock unit (estimate)
        dailyDemand += livestockConsumption
        assumptions.push(`Livestock consumption: ${input.livestockCount} units at 50L/unit/day`)
      }
      if (input.irrigationArea) {
        const irrigationConsumption = input.irrigationArea * 5 // 5L per m² per day (estimate)
        dailyDemand += irrigationConsumption
        assumptions.push(`Irrigation: ${input.irrigationArea}m² at 5L/m²/day`)
      }
      if (dailyDemand === 0) {
        dailyDemand = 1000 // Default fallback
        assumptions.push('Default agricultural demand: 1000L/day (please specify livestock or irrigation area)')
      }
      break

    case 'commercial':
    case 'industrial':
      dailyDemand = input.facilityConsumption || 5000
      assumptions.push(`Facility consumption: ${dailyDemand}L/day`)
      break

    case 'rainwater-harvesting':
      // For rainwater harvesting, demand is typically household consumption
      const rainwaterOccupants = input.occupants || 1
      const rainwaterConsumption = input.consumptionPerPerson || 150
      dailyDemand = rainwaterOccupants * rainwaterConsumption
      assumptions.push(`Rainwater collection demand based on ${rainwaterOccupants} occupants at ${rainwaterConsumption}L/person/day`)
      break
  }

  // Calculate rainwater estimate if provided
  let rainwaterEstimate: number | undefined
  if (input.rainfallMm && input.roofArea) {
    const efficiency = (input.collectionEfficiency || 80) / 100
    rainwaterEstimate = input.rainfallMm * input.roofArea * efficiency
    assumptions.push(
      `Rainwater estimate: ${input.rainfallMm}mm rainfall over ${input.roofArea}m² at ${input.collectionEfficiency || 80}% efficiency`
    )
  }

  // Calculate recommended storage capacity
  const autonomyDays = Math.max(input.autonomyDays, 1)
  const recommendedCapacity = dailyDemand * autonomyDays

  // Convert to requested output unit
  const unit = input.outputUnit
  const dailyDemandConverted = convertFromLitres(dailyDemand, unit)
  const recommendedCapacityConverted = convertFromLitres(recommendedCapacity, unit)
  const rainwaterEstimateConverted = rainwaterEstimate
    ? convertFromLitres(rainwaterEstimate, unit)
    : undefined

  return {
    dailyDemand: Math.round(dailyDemandConverted),
    recommendedCapacity: Math.round(recommendedCapacityConverted),
    autonomyDays,
    rainwaterEstimate: rainwaterEstimateConverted ? Math.round(rainwaterEstimateConverted) : undefined,
    unit,
    assumptions,
  }
}

export function getUnitLabel(unit: OutputUnit): string {
  switch (unit) {
    case 'cubic-metres':
      return 'm³'
    case 'gallons':
      return 'gal'
    case 'litres':
    default:
      return 'L'
  }
}

export function getUnitName(unit: OutputUnit): string {
  switch (unit) {
    case 'cubic-metres':
      return 'Cubic Metres'
    case 'gallons':
      return 'US Gallons'
    case 'litres':
    default:
      return 'Litres'
  }
}
