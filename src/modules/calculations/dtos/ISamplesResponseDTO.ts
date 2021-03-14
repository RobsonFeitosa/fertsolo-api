import Samples from '../infra/typeorm/entities/Samples';

interface IUnity {
  unity: string;
  value: number;
}

export default interface ISamplesResponseDTO
  extends Omit<
    Samples,
    | 'tb_1_clay'
    | 'tb_1_silt'
    | 'tb_1_sand'
    | 'tb_2_m_o'
    | 'tb_2_ph'
    | 'tb_3_p_fosforo'
    | 'tb_3_k_potassio'
    | 'tb_3_na_sodio'
    | 'tb_3_s_enxofre'
    | 'tb_3_b_boro'
    | 'tb_3_cu_cobre'
    | 'tb_3_fe_ferro'
    | 'tb_3_mn_manganes'
    | 'tb_3_zn_zinco'
    | 'tb_4_ca_calcio'
    | 'tb_4_mg_magnesio'
    | 'tb_4_al_aluminio'
    | 'tb_4_h_al_acidez_potencial'
  > {
  tb_1_clay: IUnity;
  tb_1_silt: IUnity;
  tb_1_sand: IUnity;
  tb_2_m_o: IUnity;
  tb_2_ph: IUnity;
  tb_3_p_fosforo: IUnity;
  tb_3_k_potassio: IUnity;
  tb_3_na_sodio: IUnity;
  tb_3_s_enxofre: IUnity;
  tb_3_b_boro: IUnity;
  tb_3_cu_cobre: IUnity;
  tb_3_fe_ferro: IUnity;
  tb_3_mn_manganes: IUnity;
  tb_3_zn_zinco: IUnity;
  tb_4_ca_calcio: IUnity;
  tb_4_mg_magnesio: IUnity;
  tb_4_al_aluminio: IUnity;
  tb_4_h_al_acidez_potencial: IUnity;
}
