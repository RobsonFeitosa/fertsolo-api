export default interface ICreateFertilizingDTO {
  culture_name: {
    culture: string;
    cultureBefore?: string;
  };
  n_nitrogenio: number;
  p_fosforo_first_fertilizing: number;
  p_fosforo_second_fertilizing: number;
  k_potassio_first_fertilizing: number;
  k_potassio_second_fertilizing: number;
}
