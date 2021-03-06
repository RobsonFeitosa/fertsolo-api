import { injectable, inject } from 'tsyringe';

import ICreateLimingPlasteringDTO from '../dtos/ICreateLimingPlasteringDTO';
import ICreateFertilizingDTO from '../dtos/ICreateFertilizingDTO';

import ILimingPlasteringRepository from '../repositories/ILimingPlasteringRepository';
import ISamplesResponseDTO from '../dtos/ISamplesResponseDTO';

import ISampleCalculationAndInterpretationProvider from '../providers/LimingPlasteringProvider/models/ISampleCalculationAndInterpretationProvider';

type ICreateCalculated = ICreateFertilizingDTO & ICreateLimingPlasteringDTO;

interface Request {
  user_id: string;
  dataSamples: ICreateCalculated[];
}

@injectable()
class CreateLimingPlasteringService {
  constructor(
    @inject('LimingPlasteringRepository')
    private LimingPlasteringRepository: ILimingPlasteringRepository,

    @inject('SampleCalculationAndInterpretationProvider')
    private sampleCalculationAndInterpretationProvider: ISampleCalculationAndInterpretationProvider,
  ) {}

  public async execute({
    user_id,
    dataSamples,
  }: Request): Promise<ISamplesResponseDTO[]> {
    const reports = dataSamples.map(rep => {
      const temp = { ...rep };
      temp.user_id = user_id;
      temp.tb_1_clay = JSON.stringify(rep.tb_1_clay);
      temp.tb_1_silt = JSON.stringify(rep.tb_1_silt);
      temp.tb_1_sand = JSON.stringify(rep.tb_1_sand);
      temp.tb_2_m_o = JSON.stringify(rep.tb_2_m_o);
      temp.tb_2_ph = JSON.stringify(rep.tb_2_ph);
      temp.tb_3_p_fosforo = JSON.stringify(rep.tb_3_p_fosforo);
      temp.tb_3_k_potassio = JSON.stringify(rep.tb_3_k_potassio);
      temp.tb_3_na_sodio = JSON.stringify(rep.tb_3_na_sodio);
      temp.tb_3_s_enxofre = JSON.stringify(rep.tb_3_s_enxofre);
      temp.tb_3_b_boro = JSON.stringify(rep.tb_3_b_boro);
      temp.tb_3_cu_cobre = JSON.stringify(rep.tb_3_cu_cobre);
      temp.tb_3_fe_ferro = JSON.stringify(rep.tb_3_fe_ferro);
      temp.tb_3_mn_manganes = JSON.stringify(rep.tb_3_mn_manganes);
      temp.tb_3_zn_zinco = JSON.stringify(rep.tb_3_zn_zinco);
      temp.tb_4_ca_calcio = JSON.stringify(rep.tb_4_ca_calcio);
      temp.tb_4_mg_magnesio = JSON.stringify(rep.tb_4_mg_magnesio);
      temp.tb_4_al_aluminio = JSON.stringify(rep.tb_4_al_aluminio);
      temp.tb_4_h_al_acidez_potencial = JSON.stringify(
        rep.tb_4_h_al_acidez_potencial,
      );
      temp.objective_culture =
        temp.objective_culture && JSON.stringify(rep.objective_culture);
      return temp;
    });

    const response = await this.LimingPlasteringRepository.create(reports);

    const newReports = response.map(res => {
      return this.sampleCalculationAndInterpretationProvider.CI(res);
    });

    return newReports;
  }
}

export default CreateLimingPlasteringService;
