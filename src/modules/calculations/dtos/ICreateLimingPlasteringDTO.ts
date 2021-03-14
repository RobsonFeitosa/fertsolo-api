interface IUnity {
  unity: string;
  value: number;
}

export interface ICreateLimingPlastering {
  user_id: string;
  description_cuture: string;
  tb_1_description_deep_culture: string;
  tb_1_clay: number;
  tb_1_silt: number;
  tb_1_sand: number;
  tb_2_m_o: number;
  tb_2_ph: number;
  tb_3_p_fosforo: number;
  tb_3_k_potassio: number;
  tb_3_na_sodio: number;
  tb_3_s_enxofre: number;
  tb_3_b_boro: number;
  tb_3_cu_cobre: number;
  tb_3_fe_ferro: number;
  tb_3_mn_manganes: number;
  tb_3_zn_zinco: number;
  tb_4_ca_calcio: number;
  tb_4_mg_magnesio: number;
  tb_4_al_aluminio: number;
  tb_4_h_al_acidez_potencial: number;
  objective_culture?: string;
  tb_9_estoque_de_carbono_densidade_solo?: string;
  city: string;
  uf: string;
}

export interface ICreateLimingPlasteringUnitys {
  id: string;
  user_id: string;
  description_cuture: string;
  tb_1_description_deep_culture: string;
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
  objective_culture?: string;
  tb_9_estoque_de_carbono_densidade_solo?: string;
  city: string;
  uf: string;
}
