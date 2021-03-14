import { injectable, inject } from 'tsyringe';

import ISampleCalculationAndInterpretationProvider from '../providers/LimingPlasteringProvider/models/ISampleCalculationAndInterpretationProvider';

import IUnitysLimingPlasteringRepository from '../repositories/IUnitysLimingPlasteringRepository';

import {
  ICreateLimingPlastering,
  ICreateLimingPlasteringUnitys,
} from '../dtos/ICreateLimingPlasteringDTO';
import ICreateFertilizingDTO from '../dtos/ICreateFertilizingDTO';
import IUnitysDTO from '../dtos/IUnitysDTO';

import ILimingPlasteringRepository from '../repositories/ILimingPlasteringRepository';
import ISamplesResponseDTO from '../dtos/ISamplesResponseDTO';

type ICreateCalculatedUnitys = ICreateFertilizingDTO &
  ICreateLimingPlasteringUnitys;

interface Request {
  user_id: string;
  dataSamples: ICreateCalculatedUnitys[];
}

@injectable()
class CreateLimingPlasteringService {
  constructor(
    @inject('LimingPlasteringRepository')
    private LimingPlasteringRepository: ILimingPlasteringRepository,

    @inject('UnitysLimingPlasteringRepository')
    private unitysLimingPlasteringRepository: IUnitysLimingPlasteringRepository,

    @inject('SampleCalculationAndInterpretationProvider')
    private sampleCalculationAndInterpretationProvider: ISampleCalculationAndInterpretationProvider,
  ) {}

  public async execute({
    user_id,
    dataSamples,
  }: Request): Promise<ISamplesResponseDTO[]> {
    const reports: ICreateLimingPlastering[] = [];

    dataSamples.forEach(repor => {
      reports.push({
        ...repor,
        user_id,
        tb_1_clay: repor.tb_1_clay.value,
        tb_1_silt: repor.tb_1_silt.value,
        tb_1_sand: repor.tb_1_sand.value,
        tb_2_m_o: repor.tb_2_m_o.value,
        tb_2_ph: repor.tb_2_ph.value,
        tb_3_na_sodio: repor.tb_3_na_sodio ? repor.tb_3_na_sodio.value : 0,
        tb_3_p_fosforo: repor.tb_3_p_fosforo.value,
        tb_3_k_potassio: repor.tb_3_k_potassio.value,
        tb_3_s_enxofre: repor.tb_3_s_enxofre.value,
        tb_3_b_boro: repor.tb_3_b_boro.value,
        tb_3_cu_cobre: repor.tb_3_cu_cobre.value,
        tb_3_fe_ferro: repor.tb_3_fe_ferro.value,
        tb_3_mn_manganes: repor.tb_3_mn_manganes.value,
        tb_3_zn_zinco: repor.tb_3_zn_zinco.value,
        tb_4_ca_calcio: repor.tb_4_ca_calcio.value,
        tb_4_mg_magnesio: repor.tb_4_mg_magnesio.value,

        tb_4_al_aluminio: repor.tb_4_al_aluminio.value,
        tb_4_h_al_acidez_potencial: repor.tb_4_h_al_acidez_potencial.value,
        objective_culture: JSON.stringify(repor.objective_culture),
      });
    });

    const resReports = await this.LimingPlasteringRepository.create(reports);

    const unitys: IUnitysDTO[] = [];

    dataSamples.forEach((repor, index) => {
      unitys.push({
        report_id: resReports[index].id,
        tb_1_clay: repor.tb_1_clay.unity,
        tb_1_silt: repor.tb_1_silt.unity,
        tb_1_sand: repor.tb_1_sand.unity,
        tb_2_m_o: repor.tb_2_m_o.unity,
        tb_2_ph: repor.tb_2_ph.unity,
        tb_3_p_fosforo: repor.tb_3_p_fosforo.unity,
        tb_3_k_potassio: repor.tb_3_k_potassio.unity,
        tb_3_na_sodio: repor.tb_3_na_sodio ? repor.tb_3_na_sodio.unity : '',
        tb_3_s_enxofre: repor.tb_3_s_enxofre.unity,
        tb_3_b_boro: repor.tb_3_b_boro.unity,
        tb_3_cu_cobre: repor.tb_3_cu_cobre.unity,
        tb_3_fe_ferro: repor.tb_3_fe_ferro.unity,
        tb_3_mn_manganes: repor.tb_3_mn_manganes.unity,
        tb_3_zn_zinco: repor.tb_3_zn_zinco.unity,
        tb_4_ca_calcio: repor.tb_4_ca_calcio.unity,
        tb_4_mg_magnesio: repor.tb_4_mg_magnesio.unity,
        tb_4_al_aluminio: repor.tb_4_al_aluminio.unity,
        tb_4_h_al_acidez_potencial: repor.tb_4_h_al_acidez_potencial.unity,
      });
    });

    await this.unitysLimingPlasteringRepository.create(unitys);

    const newReports = dataSamples.map((res, index) => {
      const sampleCalculated = this.sampleCalculationAndInterpretationProvider.CI(
        res,
      );

      sampleCalculated.id = resReports[index].id;
      sampleCalculated.created_at = resReports[index].created_at;
      sampleCalculated.updated_at = resReports[index].updated_at;

      return sampleCalculated;
    });

    return newReports;
  }
}

export default CreateLimingPlasteringService;
