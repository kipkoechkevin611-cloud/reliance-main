'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calculator, Droplets, Info, ArrowRight } from 'lucide-react'
import { calculateWaterRequirements, getUnitLabel } from '../../lib/calculators/water-calculator'
import type { CalculatorInput, UseType, OutputUnit } from '../../types/calculator'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Container } from '../../components/layout/container'
import { routes } from '../../lib/routes'
import { products } from '../../data/products'

export default function CalculatorPage() {
  const [useType, setUseType] = useState<UseType>('household')
  const [occupants, setOccupants] = useState<number>(4)
  const [consumptionPerPerson, setConsumptionPerPerson] = useState<number>(150)
  const [livestockCount, setLivestockCount] = useState<number>(0)
  const [irrigationArea, setIrrigationArea] = useState<number>(0)
  const [facilityConsumption, setFacilityConsumption] = useState<number>(5000)
  const [autonomyDays, setAutonomyDays] = useState<number>(3)
  const [rainfallMm, setRainfallMm] = useState<number>(0)
  const [roofArea, setRoofArea] = useState<number>(0)
  const [collectionEfficiency, setCollectionEfficiency] = useState<number>(80)
  const [outputUnit, setOutputUnit] = useState<OutputUnit>('litres')
  const [result, setResult] = useState<ReturnType<typeof calculateWaterRequirements> | null>(null)

  const handleCalculate = () => {
    const input: CalculatorInput = {
      useType,
      occupants: useType === 'household' || useType === 'rainwater-harvesting' ? occupants : undefined,
      consumptionPerPerson:
        useType === 'household' || useType === 'rainwater-harvesting' ? consumptionPerPerson : undefined,
      livestockCount: useType === 'agriculture' ? livestockCount : undefined,
      irrigationArea: useType === 'agriculture' ? irrigationArea : undefined,
      facilityConsumption: useType === 'commercial' || useType === 'industrial' ? facilityConsumption : undefined,
      autonomyDays,
      rainfallMm: rainfallMm > 0 ? rainfallMm : undefined,
      roofArea: roofArea > 0 ? roofArea : undefined,
      collectionEfficiency: rainfallMm > 0 && roofArea > 0 ? collectionEfficiency : undefined,
      outputUnit,
    }

    setResult(calculateWaterRequirements(input))
  }

  const recommendedProducts = result
    ? products
        .filter((p) => p.capacityLiters >= result.recommendedCapacity * (outputUnit === 'litres' ? 1 : outputUnit === 'cubic-metres' ? 1000 : 3.78541))
        .sort((a, b) => a.capacityLiters - b.capacityLiters)
        .slice(0, 3)
    : []

  return (
    <div className="min-h-screen bg-[#F3F6F8]">
      {/* Header */}
      <div className="bg-[#103B66] text-white py-12 md:py-16">
        <Container>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center flex-wrap gap-3">
            <Calculator className="w-8 h-8 shrink-0" />
            Water Capacity Calculator
          </h1>
          <p className="text-[#B8C5D0]">
            Estimate your water storage requirements based on your specific needs
          </p>
        </Container>
      </div>

      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Calculator Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-[#102A43] mb-6">Enter Your Requirements</h2>

            <div className="space-y-6">
              {/* Use Type */}
              <div>
                <Label htmlFor="useType">Intended Use</Label>
                <select
                  id="useType"
                  value={useType}
                  onChange={(e) => setUseType(e.target.value as UseType)}
                  className="w-full h-11 mt-2 px-4 rounded-md border border-[#DCE4EA] bg-white text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#0F9D9A]"
                >
                  <option value="household">Household</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="rainwater-harvesting">Rainwater Harvesting</option>
                </select>
              </div>

              {/* Household Inputs */}
              {(useType === 'household' || useType === 'rainwater-harvesting') && (
                <>
                  <div>
                    <Label htmlFor="occupants">Number of Occupants</Label>
                    <Input
                      id="occupants"
                      type="number"
                      min="1"
                      value={occupants}
                      onChange={(e) => setOccupants(Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="consumption">Daily Consumption per Person (Litres)</Label>
                    <Input
                      id="consumption"
                      type="number"
                      min="50"
                      value={consumptionPerPerson}
                      onChange={(e) => setConsumptionPerPerson(Number(e.target.value))}
                      className="mt-2"
                    />
                    <p className="text-xs text-[#526575] mt-1">
                      Typical range: 100-200L per person per day
                    </p>
                  </div>
                </>
              )}

              {/* Agricultural Inputs */}
              {useType === 'agriculture' && (
                <>
                  <div>
                    <Label htmlFor="livestock">Number of Livestock Units</Label>
                    <Input
                      id="livestock"
                      type="number"
                      min="0"
                      value={livestockCount}
                      onChange={(e) => setLivestockCount(Number(e.target.value))}
                      className="mt-2"
                    />
                    <p className="text-xs text-[#526575] mt-1">
                      Estimated 50L per livestock unit per day
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="irrigation">Irrigation Area (m²)</Label>
                    <Input
                      id="irrigation"
                      type="number"
                      min="0"
                      value={irrigationArea}
                      onChange={(e) => setIrrigationArea(Number(e.target.value))}
                      className="mt-2"
                    />
                    <p className="text-xs text-[#526575] mt-1">
                      Estimated 5L per m² per day
                    </p>
                  </div>
                </>
              )}

              {/* Commercial/Industrial Inputs */}
              {(useType === 'commercial' || useType === 'industrial') && (
                <div>
                  <Label htmlFor="facility">Daily Facility Consumption (Litres)</Label>
                  <Input
                    id="facility"
                    type="number"
                    min="100"
                    value={facilityConsumption}
                    onChange={(e) => setFacilityConsumption(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
              )}

              {/* Autonomy Days */}
              <div>
                <Label htmlFor="autonomy">Desired Autonomy (Days)</Label>
                <Input
                  id="autonomy"
                  type="number"
                  min="1"
                  value={autonomyDays}
                  onChange={(e) => setAutonomyDays(Number(e.target.value))}
                  className="mt-2"
                />
                <p className="text-xs text-[#526575] mt-1">
                  How many days of water supply do you want to store?
                </p>
              </div>

              {/* Rainwater Harvesting Inputs */}
              <div className="border-t border-[#DCE4EA] pt-6">
                <h3 className="font-semibold text-[#17212B] mb-4 flex items-center">
                  <Droplets className="mr-2 w-4 h-4 text-[#0F9D9A]" />
                  Rainwater Collection (Optional)
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="rainfall">Average Rainfall (mm)</Label>
                    <Input
                      id="rainfall"
                      type="number"
                      min="0"
                      value={rainfallMm}
                      onChange={(e) => setRainfallMm(Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="roof">Roof Collection Area (m²)</Label>
                    <Input
                      id="roof"
                      type="number"
                      min="0"
                      value={roofArea}
                      onChange={(e) => setRoofArea(Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="efficiency">Collection Efficiency (%)</Label>
                    <Input
                      id="efficiency"
                      type="number"
                      min="50"
                      max="95"
                      value={collectionEfficiency}
                      onChange={(e) => setCollectionEfficiency(Number(e.target.value))}
                      className="mt-2"
                    />
                    <p className="text-xs text-[#526575] mt-1">
                      Typical range: 75-85% (accounts for losses)
                    </p>
                  </div>
                </div>
              </div>

              {/* Output Unit */}
              <div>
                <Label htmlFor="unit">Output Unit</Label>
                <select
                  id="unit"
                  value={outputUnit}
                  onChange={(e) => setOutputUnit(e.target.value as OutputUnit)}
                  className="w-full h-11 mt-2 px-4 rounded-md border border-[#DCE4EA] bg-white text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#0F9D9A]"
                >
                  <option value="litres">Litres (L)</option>
                  <option value="cubic-metres">Cubic Metres (m³)</option>
                  <option value="gallons">US Gallons (gal)</option>
                </select>
              </div>

              <Button variant="primary" size="lg" onClick={handleCalculate} className="w-full">
                Calculate Requirements
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result ? (
              <>
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-xl font-bold text-[#102A43] mb-6 flex items-center">
                    <Calculator className="mr-2 w-6 h-6 text-[#0F9D9A]" />
                    Calculation Results
                  </h2>

                  <div className="space-y-4">
                    <div className="bg-[#F3F6F8] rounded-lg p-4">
                      <p className="text-sm text-[#526575] mb-1">Estimated Daily Demand</p>
                      <p className="text-2xl font-bold text-[#102A43]">
                        {result.dailyDemand.toLocaleString()} {getUnitLabel(result.unit)}
                      </p>
                    </div>

                    <div className="bg-[#0F9D9A] bg-opacity-10 rounded-lg p-4 border-2 border-[#0F9D9A]">
                      <p className="text-sm text-[#526575] mb-1">Recommended Storage Capacity</p>
                      <p className="text-3xl font-bold text-[#0F9D9A]">
                        {result.recommendedCapacity.toLocaleString()} {getUnitLabel(result.unit)}
                      </p>
                      <p className="text-sm text-[#526575] mt-2">
                        Based on {result.autonomyDays} days of autonomy
                      </p>
                    </div>

                    {result.rainwaterEstimate && (
                      <div className="bg-[#F3F6F8] rounded-lg p-4">
                        <p className="text-sm text-[#526575] mb-1 flex items-center">
                          <Droplets className="mr-1 w-4 h-4 text-[#0F9D9A]" />
                          Estimated Rainwater Collection
                        </p>
                        <p className="text-xl font-bold text-[#102A43]">
                          {result.rainwaterEstimate.toLocaleString()} {getUnitLabel(result.unit)}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 p-4 bg-[#F3F6F8] rounded-lg">
                    <h3 className="font-semibold text-[#17212B] mb-2 flex items-center">
                      <Info className="mr-2 w-4 h-4 text-[#0F9D9A]" />
                      Assumptions
                    </h3>
                    <ul className="text-sm text-[#526575] space-y-1">
                      {result.assumptions.map((assumption: string, index: number) => (
                        <li key={index}>• {assumption}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 text-xs text-[#526575]">
                    <p>
                      <strong>Disclaimer:</strong> This calculator provides estimates based on typical
                      consumption patterns. Actual requirements may vary based on specific conditions,
                      climate, and usage patterns. For irrigation, livestock, and industrial applications,
                      consult with a specialist for accurate requirements.
                    </p>
                  </div>

                  <Link href={routes.quote} className="mt-6 block">
                    <Button variant="primary" size="lg" className="w-full">
                      Request a Quote Based on These Results
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>

                {/* Recommended Products */}
                {recommendedProducts.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-8">
                    <h2 className="text-xl font-bold text-[#102A43] mb-6">
                      Recommended Tanks
                    </h2>
                    <div className="space-y-4">
                      {recommendedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="border border-[#DCE4EA] rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-[#17212B]">{product.name}</h3>
                            <span className="text-[#0F9D9A] font-semibold">
                              {product.capacityLiters.toLocaleString()}L
                            </span>
                          </div>
                          <p className="text-sm text-[#526575] mb-3">{product.shortDescription}</p>
                          <Link href={`${routes.products}/${product.slug}`}>
                            <Button variant="outline" size="sm" className="w-full">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <Calculator className="w-16 h-16 text-[#526575] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#17212B] mb-2">
                  Enter Your Requirements
                </h3>
                <p className="text-[#526575]">
                  Fill in the form to calculate your water storage needs
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
