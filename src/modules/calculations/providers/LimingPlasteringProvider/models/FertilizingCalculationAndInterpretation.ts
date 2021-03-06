import {
  nitrogenioDTO,
  fertilizingInterValuesDTO,
} from '../dtos/FertilizingDTO';

export default interface IFertilizingProvider {
  nitrogenio({ culture, mo }: nitrogenioDTO): string;
  pFosforoInterpretation({
    interpretation,
    culture,
  }: {
    interpretation: string;
    culture: string;
  }): fertilizingInterValuesDTO;
  kPotassioInterpretation({
    interpretation,
    culture,
  }: {
    interpretation: string;
    culture: string;
  }): fertilizingInterValuesDTO;
}
