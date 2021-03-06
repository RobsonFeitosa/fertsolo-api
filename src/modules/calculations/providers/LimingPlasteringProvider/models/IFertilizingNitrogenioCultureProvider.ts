import { nitrogenioCultureBeforeDTO } from '../dtos/FertilizingDTO';

export default interface IFertilizingNitrogenioCultureProvider {
  extend_nitrogenio_milho({
    cultureBefore,
    mo,
  }: nitrogenioCultureBeforeDTO): string;
}
