import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Samples from './Samples';

@Entity('unitysLimingPlastering')
class Unitys {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  report_id: string;

  @ManyToOne(() => Samples)
  @JoinColumn({ name: 'report_id' })
  samples: Samples;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Unitys;
