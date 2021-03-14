import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ILimingPlasteringRepository from '../repositories/ILimingPlasteringRepository';

import ISampleCalculationAndInterpretationProvider from '../providers/LimingPlasteringProvider/models/ISampleCalculationAndInterpretationProvider';

import ISamplesResponseDTO from '../dtos/ISamplesResponseDTO';
import IUnitysLimingPlasteringRepository from '../repositories/IUnitysLimingPlasteringRepository';

@injectable()
class ShowPublicLimingPlasteringService {
  constructor(
    @inject('LimingPlasteringRepository')
    private LimingPlasteringRepository: ILimingPlasteringRepository,

    @inject('UnitysLimingPlasteringRepository')
    private unitysLimingPlasteringRepository: IUnitysLimingPlasteringRepository,

    @inject('SampleCalculationAndInterpretationProvider')
    private sampleCalculationAndInterpretationProvider: ISampleCalculationAndInterpretationProvider,
  ) {}

  public async execute(sampleId: string): Promise<ISamplesResponseDTO> {
    const report = await this.LimingPlasteringRepository.findById(sampleId);

    if (!report) {
      throw new AppError('Sample does not found');
    }

    const unitys = await this.unitysLimingPlasteringRepository.findByIdReport(
      report.id,
    );

    if (!unitys) {
      throw new AppError('Unity dos not found');
    }

    const newReport: ISamplesResponseDTO = {
      ...report,
      id: report.id,
      tb_1_clay: {
        unity: unitys?.tb_1_clay,
        value: Number(report.tb_1_clay),
      },
      tb_1_silt: {
        unity: unitys?.tb_1_silt,
        value: Number(report.tb_1_silt),
      },
      tb_1_sand: {
        unity: unitys?.tb_1_sand,
        value: Number(report.tb_1_sand),
      },
      tb_2_m_o: {
        unity: unitys?.tb_2_m_o,
        value: Number(report.tb_2_m_o),
      },
      tb_2_ph: {
        unity: unitys?.tb_2_ph,
        value: Number(report.tb_2_ph),
      },
      tb_3_na_sodio: {
        unity: unitys?.tb_3_na_sodio,
        value: Number(report.tb_3_na_sodio),
      },
      tb_3_p_fosforo: {
        unity: unitys?.tb_3_p_fosforo,
        value: Number(report.tb_3_p_fosforo),
      },
      tb_3_k_potassio: {
        unity: unitys?.tb_3_k_potassio,
        value: Number(report.tb_3_k_potassio),
      },
      tb_3_s_enxofre: {
        unity: unitys?.tb_3_s_enxofre,
        value: Number(report.tb_3_s_enxofre),
      },
      tb_3_b_boro: {
        unity: unitys?.tb_3_b_boro,
        value: Number(report.tb_3_b_boro),
      },
      tb_3_cu_cobre: {
        unity: unitys?.tb_3_cu_cobre,
        value: Number(report.tb_3_cu_cobre),
      },
      tb_3_fe_ferro: {
        unity: unitys?.tb_3_fe_ferro,
        value: Number(report.tb_3_fe_ferro),
      },
      tb_3_mn_manganes: {
        unity: unitys?.tb_3_mn_manganes,
        value: Number(report.tb_3_mn_manganes),
      },
      tb_3_zn_zinco: {
        unity: unitys?.tb_3_zn_zinco,
        value: Number(report.tb_3_zn_zinco),
      },
      tb_4_ca_calcio: {
        unity: unitys?.tb_4_ca_calcio,
        value: Number(report.tb_4_ca_calcio),
      },
      tb_4_mg_magnesio: {
        unity: unitys?.tb_4_mg_magnesio,
        value: Number(report.tb_4_mg_magnesio),
      },
      tb_4_al_aluminio: {
        unity: unitys?.tb_4_al_aluminio,
        value: Number(report.tb_4_al_aluminio),
      },
      tb_4_h_al_acidez_potencial: {
        unity: unitys?.tb_4_h_al_acidez_potencial,
        value: Number(report.tb_4_h_al_acidez_potencial),
      },
    } as ISamplesResponseDTO;

    return this.sampleCalculationAndInterpretationProvider.CI(newReport);
  }
}

export default ShowPublicLimingPlasteringService;
