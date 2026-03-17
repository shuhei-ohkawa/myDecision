export interface TreatmentOption {
  id: string;
  clinicName: string;
  treatmentType: string;
  expectedEffect: string;
  riskPercent: number;
  downtimeWeeks: number;
  totalCostYen: number | null;
  insuranceCovered: boolean;
  insuranceCopayPercent?: number;
}

export interface PersonalRiskAdjustment {
  condition: string;
  riskMultiplier: number;
  warningMessage: string;
}

export interface RiskAdjustmentResult {
  baseRiskPercent: number;
  adjustedRiskPercent: number;
  adjustments: {
    condition: string;
    delta: number;
    message: string;
  }[];
}
