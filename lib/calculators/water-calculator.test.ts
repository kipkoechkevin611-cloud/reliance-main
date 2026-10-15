import { describe, it, expect } from 'vitest'
import {
  calculateWaterRequirements,
  convertToLitres,
  convertFromLitres,
  getUnitLabel,
} from './water-calculator'
import type { CalculatorInput } from '../../types/calculator'

describe('Water Calculator', () => {
  describe('Unit Conversions', () => {
    it('should convert litres to litres correctly', () => {
      expect(convertToLitres(1000, 'litres')).toBe(1000)
    })

    it('should convert cubic metres to litres correctly', () => {
      expect(convertToLitres(5, 'cubic-metres')).toBe(5000)
    })

    it('should convert US gallons to litres correctly', () => {
      expect(convertToLitres(100, 'gallons')).toBeCloseTo(378.541, 2)
    })

    it('should convert litres to cubic metres correctly', () => {
      expect(convertFromLitres(5000, 'cubic-metres')).toBe(5)
    })

    it('should convert litres to US gallons correctly', () => {
      expect(convertFromLitres(378.541, 'gallons')).toBeCloseTo(100, 0)
    })

    it('should return same value for litres to litres', () => {
      expect(convertFromLitres(1000, 'litres')).toBe(1000)
    })
  })

  describe('Household Calculations', () => {
    it('should calculate daily demand for household', () => {
      const input: CalculatorInput = {
        useType: 'household',
        occupants: 4,
        consumptionPerPerson: 150,
        autonomyDays: 3,
        outputUnit: 'litres',
      }

      const result = calculateWaterRequirements(input)

      expect(result.dailyDemand).toBe(600)
      expect(result.recommendedCapacity).toBe(1800)
      expect(result.autonomyDays).toBe(3)
      expect(result.unit).toBe('litres')
    })

    it('should handle single occupant household', () => {
      const input: CalculatorInput = {
        useType: 'household',
        occupants: 1,
        consumptionPerPerson: 150,
        autonomyDays: 2,
        outputUnit: 'litres',
      }

      const result = calculateWaterRequirements(input)

      expect(result.dailyDemand).toBe(150)
      expect(result.recommendedCapacity).toBe(300)
    })
  })

  describe('Agricultural Calculations', () => {
    it('should calculate demand for livestock', () => {
      const input: CalculatorInput = {
        useType: 'agriculture',
        livestockCount: 10,
        autonomyDays: 5,
        outputUnit: 'litres',
      }

      const result = calculateWaterRequirements(input)

      expect(result.dailyDemand).toBe(500)
      expect(result.recommendedCapacity).toBe(2500)
    })

    it('should calculate demand for irrigation', () => {
      const input: CalculatorInput = {
        useType: 'agriculture',
        irrigationArea: 100,
        autonomyDays: 3,
        outputUnit: 'litres',
      }

      const result = calculateWaterRequirements(input)

      expect(result.dailyDemand).toBe(500)
      expect(result.recommendedCapacity).toBe(1500)
    })

    it('should combine livestock and irrigation', () => {
      const input: CalculatorInput = {
        useType: 'agriculture',
        livestockCount: 10,
        irrigationArea: 100,
        autonomyDays: 3,
        outputUnit: 'litres',
      }

      const result = calculateWaterRequirements(input)

      expect(result.dailyDemand).toBe(1000)
      expect(result.recommendedCapacity).toBe(3000)
    })
  })

  describe('Commercial/Industrial Calculations', () => {
    it('should calculate commercial facility demand', () => {
      const input: CalculatorInput = {
        useType: 'commercial',
        facilityConsumption: 10000,
        autonomyDays: 2,
        outputUnit: 'litres',
      }

      const result = calculateWaterRequirements(input)

      expect(result.dailyDemand).toBe(10000)
      expect(result.recommendedCapacity).toBe(20000)
    })
  })

  describe('Rainwater Harvesting', () => {
    it('should calculate rainwater collection estimate', () => {
      const input: CalculatorInput = {
        useType: 'rainwater-harvesting',
        occupants: 4,
        consumptionPerPerson: 150,
        autonomyDays: 3,
        rainfallMm: 50,
        roofArea: 200,
        collectionEfficiency: 80,
        outputUnit: 'litres',
      }

      const result = calculateWaterRequirements(input)

      expect(result.rainwaterEstimate).toBe(8000)
      expect(result.dailyDemand).toBe(600)
      expect(result.recommendedCapacity).toBe(1800)
    })

    it('should handle zero rainfall', () => {
      const input: CalculatorInput = {
        useType: 'rainwater-harvesting',
        occupants: 4,
        consumptionPerPerson: 150,
        autonomyDays: 3,
        rainfallMm: 0,
        roofArea: 200,
        collectionEfficiency: 80,
        outputUnit: 'litres',
      }

      const result = calculateWaterRequirements(input)

      expect(result.rainwaterEstimate).toBeUndefined()
    })
  })

  describe('Unit Output', () => {
    it('should convert output to cubic metres', () => {
      const input: CalculatorInput = {
        useType: 'household',
        occupants: 4,
        consumptionPerPerson: 150,
        autonomyDays: 3,
        outputUnit: 'cubic-metres',
      }

      const result = calculateWaterRequirements(input)

      expect(result.dailyDemand).toBe(1)
      expect(result.recommendedCapacity).toBe(2)
      expect(result.unit).toBe('cubic-metres')
    })

    it('should convert output to gallons', () => {
      const input: CalculatorInput = {
        useType: 'household',
        occupants: 4,
        consumptionPerPerson: 150,
        autonomyDays: 3,
        outputUnit: 'gallons',
      }

      const result = calculateWaterRequirements(input)

      expect(result.dailyDemand).toBeCloseTo(159, 0)
      expect(result.recommendedCapacity).toBeCloseTo(476, 0)
      expect(result.unit).toBe('gallons')
    })
  })

  describe('Edge Cases', () => {
    it('should handle minimum autonomy of 1 day', () => {
      const input: CalculatorInput = {
        useType: 'household',
        occupants: 4,
        consumptionPerPerson: 150,
        autonomyDays: 0,
        outputUnit: 'litres',
      }

      const result = calculateWaterRequirements(input)

      expect(result.autonomyDays).toBe(1)
      expect(result.recommendedCapacity).toBe(600)
    })
  })

  describe('Unit Labels', () => {
    it('should return correct label for litres', () => {
      expect(getUnitLabel('litres')).toBe('L')
    })

    it('should return correct label for cubic metres', () => {
      expect(getUnitLabel('cubic-metres')).toBe('m³')
    })

    it('should return correct label for gallons', () => {
      expect(getUnitLabel('gallons')).toBe('gal')
    })
  })
})
