import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateLimingPlasteringDTO from '../dtos/ICreateLimingPlasteringDTO';
import Samples from '../infra/typeorm/entities/Samples';
import ILimingPlasteringRepository from '../repositories/ILimingPlasteringRepository';

import ISampleCalculationAndInterpretationProvider from '../providers/LimingPlasteringProvider/models/ISampleCalculationAndInterpretationProvider';
import ISamplesResponseDTO from '../dtos/ISamplesResponseDTO';

interface RequestDTO {
  sampleId: string;
  dataSample: ICreateLimingPlasteringDTO;
}

@injectable()
class UpdateLimingPlasteringService {
  constructor(
    @inject('LimingPlasteringRepository')
    private LimingPlasteringRepository: ILimingPlasteringRepository,

    @inject('SampleCalculationAndInterpretationProvider')
    private sampleCalculationAndInterpretationProvider: ISampleCalculationAndInterpretationProvider,
  ) {}

  public async execute({
    sampleId,
    dataSample,
  }: RequestDTO): Promise<ISamplesResponseDTO> {
    const report = await this.LimingPlasteringRepository.findById(sampleId);

    if (!report) {
      throw new AppError('Sample not found');
    }

    report.description_cuture = dataSample.description_cuture;
    report.tb_1_description_deep_culture =
      dataSample.tb_1_description_deep_culture;

    report.tb_1_clay = JSON.stringify(dataSample.tb_1_clay);
    report.tb_1_silt = JSON.stringify(dataSample.tb_1_silt);
    report.tb_1_sand = JSON.stringify(dataSample.tb_1_sand);
    report.tb_2_m_o = JSON.stringify(dataSample.tb_2_m_o);
    report.tb_2_ph = JSON.stringify(dataSample.tb_2_ph);
    report.tb_3_p_fosforo = JSON.stringify(dataSample.tb_3_p_fosforo);
    report.tb_3_k_potassio = JSON.stringify(dataSample.tb_3_k_potassio);
    report.tb_3_s_enxofre = JSON.stringify(dataSample.tb_3_s_enxofre);
    report.tb_3_b_boro = JSON.stringify(dataSample.tb_3_b_boro);
    report.tb_3_cu_cobre = JSON.stringify(dataSample.tb_3_cu_cobre);
    report.tb_3_fe_ferro = JSON.stringify(dataSample.tb_3_fe_ferro);
    report.tb_3_mn_manganes = JSON.stringify(dataSample.tb_3_mn_manganes);
    report.tb_3_zn_zinco = JSON.stringify(dataSample.tb_3_zn_zinco);
    report.tb_4_ca_calcio = JSON.stringify(dataSample.tb_4_ca_calcio);
    report.tb_4_mg_magnesio = JSON.stringify(dataSample.tb_4_mg_magnesio);
    report.tb_4_al_aluminio = JSON.stringify(dataSample.tb_4_al_aluminio);
    report.tb_4_h_al_acidez_potencial = JSON.stringify(
      dataSample.tb_4_h_al_acidez_potencial,
    );
    report.objective_culture = JSON.stringify(dataSample.objective_culture);
    report.city = dataSample.city;
    report.uf = dataSample.uf;

    await this.LimingPlasteringRepository.save([report]);

    return this.sampleCalculationAndInterpretationProvider.CI(report);
  }
}

export default UpdateLimingPlasteringService;
