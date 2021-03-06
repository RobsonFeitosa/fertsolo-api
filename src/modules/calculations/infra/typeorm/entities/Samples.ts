import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Fertilizing from './Fertilizing';

@Entity('report_liming_plastering')
class Sample {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  fertilizing: Fertilizing[];

  @Column()
  description_cuture: string;

  @Column()
  tb_1_description_deep_culture: string;

  @Column()
  tb_1_clay: string;

  @Column()
  tb_1_silt: string;

  @Column()
  tb_1_sand: string;

  @Column()
  tb_2_m_o: string;

  @Column()
  tb_2_ph: string;

  @Column()
  tb_3_p_fosforo: string;

  @Column()
  tb_3_k_potassio: string;

  @Column()
  tb_3_na_sodio: string;

  @Column()
  tb_3_s_enxofre: string;

  @Column()
  tb_3_b_boro: string;

  @Column()
  tb_3_cu_cobre: string;

  @Column()
  tb_3_fe_ferro: string;

  @Column()
  tb_3_mn_manganes: string;

  @Column()
  tb_3_zn_zinco: string;

  @Column()
  tb_4_ca_calcio: string;

  @Column()
  tb_4_mg_magnesio: string;

  @Column()
  tb_4_al_aluminio: string;

  @Column()
  tb_4_h_al_acidez_potencial: string;

  @Column()
  objective_culture?: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  tb_2_ph_h2o: number;

  tb_5_soma_de_bases: number;

  tb_5_ctcef: number;

  tb_5_ctcph7: number;

  tb_6_m_saturacao_por_aluminio: number;

  tb_6_v_saturacao_por_bases: number;

  tb_7_ncph6: number;

  tb_7_ncph7: number;

  tb_7_ncph7prnt7: number;

  tb_8_ng_necessidade_de_gesso: number;

  tb_1_solo_classe: string;

  tb_2_ph_interpretation: string;

  tb_3_p_fosforo_interpretation: string;

  tb_3_s_enxofre_interpretation: string;

  tb_3_b_boro_interpretation: string;

  tb_3_cu_cobre_interpretation: string;

  tb_3_fe_ferro_interpretation: string;

  tb_3_mn_manganes_interpretation: string;

  tb_3_zn_zinco_interpretation: string;

  tb_3_k_potassio_interpretation: string;

  tb_4_ca_calcio_interpretation: string;

  tb_4_mg_magnesio_interpretation: string;

  tb_5_ctcph7_interpretation: string;

  tb_6_m_saturacao_por_aluminio_interpretation: string;

  tb_6_v_saturacao_por_bases_interpretation: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Sample;
