export interface nitrogenioDTO {
  culture: string;
  mo: number;
}
export interface fertilizingInterValuesDTO {
  interpretation: string;
  culture: string;
}

export interface ObjectiveCultureDTO {
  mo: number;
  culture: string;
  cultureBefore?: string | undefined;
  nitrogenioTha?: string | undefined;
  pFosforoTha?: string | undefined;
  kPotassioTha?: string | undefined;
  micronutrientesTha?: string | undefined;
  micronutrientesZincoBoroName?: string | undefined;
}
