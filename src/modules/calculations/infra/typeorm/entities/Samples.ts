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
  tb_1_clay: number;

  @Column()
  tb_1_silt: number;

  @Column()
  tb_1_sand: number;

  @Column()
  tb_2_m_o: number;

  @Column()
  tb_2_ph: number;

  @Column()
  tb_3_p_fosforo: number;

  @Column()
  tb_3_k_potassio: number;

  @Column()
  tb_3_na_sodio: number;

  @Column()
  tb_3_s_enxofre: number;

  @Column()
  tb_3_b_boro: number;

  @Column()
  tb_3_cu_cobre: number;

  @Column()
  tb_3_fe_ferro: number;

  @Column()
  tb_3_mn_manganes: number;

  @Column()
  tb_3_zn_zinco: number;

  @Column()
  tb_4_ca_calcio: number;

  @Column()
  tb_4_mg_magnesio: number;

  @Column()
  tb_4_al_aluminio: number;

  @Column()
  tb_4_h_al_acidez_potencial: number;

  @Column()
  objective_culture?: string;

  @Column()
  tb_9_estoque_de_carbono_densidade_solo?: string;

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

  tb_9_estoque_de_carbono?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Sample;
