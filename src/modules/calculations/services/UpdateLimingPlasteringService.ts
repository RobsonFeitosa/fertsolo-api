import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { ICreateLimingPlasteringUnitys } from '../dtos/ICreateLimingPlasteringDTO';
import ILimingPlasteringRepository from '../repositories/ILimingPlasteringRepository';

import ISampleCalculationAndInterpretationProvider from '../providers/LimingPlasteringProvider/models/ISampleCalculationAndInterpretationProvider';
import ISamplesResponseDTO from '../dtos/ISamplesResponseDTO';
import IUnitysLimingPlasteringRepository from '../repositories/IUnitysLimingPlasteringRepository';

interface RequestDTO {
  sampleId: string;
  dataSample: ICreateLimingPlasteringUnitys;
}

@injectable()
class UpdateLimingPlasteringService {
  constructor(
    @inject('LimingPlasteringRepository')
    private LimingPlasteringRepository: ILimingPlasteringRepository,

    @inject('UnitysLimingPlasteringRepository')
    private unitysLimingPlasteringRepository: IUnitysLimingPlasteringRepository,

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

    report.tb_1_clay = dataSample.tb_1_clay.value;
    report.tb_1_silt = dataSample.tb_1_silt.value;
    report.tb_1_sand = dataSample.tb_1_sand.value;
    report.tb_2_m_o = dataSample.tb_2_m_o.value;
    report.tb_2_ph = dataSample.tb_2_ph.value;
    report.tb_3_p_fosforo = dataSample.tb_3_p_fosforo.value;
    report.tb_3_k_potassio = dataSample.tb_3_k_potassio.value;
    report.tb_3_s_enxofre = dataSample.tb_3_s_enxofre.value;
    report.tb_3_b_boro = dataSample.tb_3_b_boro.value;
    report.tb_3_cu_cobre = dataSample.tb_3_cu_cobre.value;
    report.tb_3_fe_ferro = dataSample.tb_3_fe_ferro.value;
    report.tb_3_mn_manganes = dataSample.tb_3_mn_manganes.value;
    report.tb_3_zn_zinco = dataSample.tb_3_zn_zinco.value;
    report.tb_4_ca_calcio = dataSample.tb_4_ca_calcio.value;
    report.tb_4_mg_magnesio = dataSample.tb_4_mg_magnesio.value;
    report.tb_4_al_aluminio = dataSample.tb_4_al_aluminio.value;
    report.tb_4_h_al_acidez_potencial =
      dataSample.tb_4_h_al_acidez_potencial.value;
    report.tb_9_estoque_de_carbono_densidade_solo =
      dataSample.tb_9_estoque_de_carbono_densidade_solo;
    report.objective_culture = JSON.stringify(dataSample.objective_culture);
    report.city = dataSample.city;
    report.uf = dataSample.uf;

    const unity = await this.unitysLimingPlasteringRepository.findByIdReport(
      report.id,
    );

    if (!unity) {
      throw new AppError('Unitys not found');
    }

    unity.tb_1_clay = dataSample.tb_1_clay.unity;
    unity.tb_1_silt = dataSample.tb_1_silt.unity;
    unity.tb_1_sand = dataSample.tb_1_sand.unity;
    unity.tb_2_m_o = dataSample.tb_2_m_o.unity;
    unity.tb_2_ph = dataSample.tb_2_ph.unity;
    unity.tb_3_p_fosforo = dataSample.tb_3_p_fosforo.unity;
    unity.tb_3_k_potassio = dataSample.tb_3_k_potassio.unity;
    unity.tb_3_na_sodio = dataSample.tb_3_na_sodio
      ? dataSample.tb_3_na_sodio.unity
      : '';
    unity.tb_3_s_enxofre = dataSample.tb_3_s_enxofre.unity;
    unity.tb_3_b_boro = dataSample.tb_3_b_boro.unity;
    unity.tb_3_cu_cobre = dataSample.tb_3_cu_cobre.unity;
    unity.tb_3_fe_ferro = dataSample.tb_3_fe_ferro.unity;
    unity.tb_3_mn_manganes = dataSample.tb_3_mn_manganes.unity;
    unity.tb_3_zn_zinco = dataSample.tb_3_zn_zinco.unity;
    unity.tb_4_ca_calcio = dataSample.tb_4_ca_calcio.unity;
    unity.tb_4_mg_magnesio = dataSample.tb_4_mg_magnesio.unity;
    unity.tb_4_al_aluminio = dataSample.tb_4_al_aluminio.unity;
    unity.tb_4_h_al_acidez_potencial =
      dataSample.tb_4_h_al_acidez_potencial.unity;

    const newReport = {} as ISamplesResponseDTO;

    newReport.id = report.id;
    newReport.description_cuture = report.description_cuture;
    newReport.tb_1_description_deep_culture =
      report.tb_1_description_deep_culture;
    newReport.tb_1_clay = dataSample.tb_1_clay;
    newReport.tb_1_silt = dataSample.tb_1_silt;
    newReport.tb_1_sand = dataSample.tb_1_sand;
    newReport.tb_2_m_o = dataSample.tb_2_m_o;
    newReport.tb_2_ph = dataSample.tb_2_ph;
    newReport.tb_3_p_fosforo = dataSample.tb_3_p_fosforo;
    newReport.tb_3_k_potassio = dataSample.tb_3_k_potassio;
    if (dataSample.tb_3_na_sodio) {
      newReport.tb_3_na_sodio = dataSample.tb_3_na_sodio;
    }
    newReport.tb_3_s_enxofre = dataSample.tb_3_s_enxofre;
    newReport.tb_3_b_boro = dataSample.tb_3_b_boro;
    newReport.tb_3_cu_cobre = dataSample.tb_3_cu_cobre;
    newReport.tb_3_fe_ferro = dataSample.tb_3_fe_ferro;
    newReport.tb_3_mn_manganes = dataSample.tb_3_mn_manganes;
    newReport.tb_3_zn_zinco = dataSample.tb_3_zn_zinco;
    newReport.tb_4_ca_calcio = dataSample.tb_4_ca_calcio;
    newReport.tb_4_mg_magnesio = dataSample.tb_4_mg_magnesio;
    newReport.tb_4_al_aluminio = dataSample.tb_4_al_aluminio;
    newReport.tb_4_h_al_acidez_potencial =
      dataSample.tb_4_h_al_acidez_potencial;
    if (dataSample.tb_9_estoque_de_carbono_densidade_solo) {
      newReport.tb_9_estoque_de_carbono_densidade_solo =
        dataSample.tb_9_estoque_de_carbono_densidade_solo;
    }
    newReport.objective_culture = report.objective_culture;
    if (report.fertilizing) {
      newReport.fertilizing = report.fertilizing;
    }
    newReport.created_at = report.created_at;
    newReport.updated_at = report.updated_at;
    newReport.city = report.city;
    newReport.uf = report.uf;

    await this.LimingPlasteringRepository.save([report]);

    await this.unitysLimingPlasteringRepository.save([unity]);

    return this.sampleCalculationAndInterpretationProvider.CI(newReport);
  }
}

export default UpdateLimingPlasteringService;
