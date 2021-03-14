import ISampleCalculationAndInterpretationProvider from '../models/ISampleCalculationAndInterpretationProvider';

import { ICreateLimingPlasteringUnitys } from '../../../dtos/ICreateLimingPlasteringDTO';
import ISamplesResponseDTO from '../../../dtos/ISamplesResponseDTO';

import {
  somaDeBasesCalc,
  ctcefCalc,
  ctcph7Calc,
  mSaturacaoAluminioCalc,
  vSaturacaoBasesCalc,
  ncph7Calc,
  ncph7prnt7Calc,
  ngCalc,
  ncph6Calc,
  cot,
} from '../functions/calculationLimingPlastering';
import {
  ClayInter,
  pHInter,
  pFosforoMelichInter,
  kPotassioInter,
  sEnxofreInter,
  bBoroInter,
  cuCobreInter,
  feFerroInter,
  mnManganesInter,
  znZincoInter,
  caCalcioInter,
  mgMagnesioInter,
  ctcph7Inter,
  mSaturacaoAluminioInter,
  vSaturacaoBasesInter,
} from '../functions/interpretationLimingPlastering';

import fertilizingFunc from '../functions/interpretationFertilizing';

import {
  convertCmol,
  moConvert,
  naSodio,
  phConvert,
} from '../utils/convertUnity';

interface ICalculatedLimingPlastering extends ICreateLimingPlasteringUnitys {
  created_at: Date;
  updated_at: Date;
}

export default class SampleCalculationAndInterpretationProvider
  implements ISampleCalculationAndInterpretationProvider {
  public CI(data: ICalculatedLimingPlastering): ISamplesResponseDTO {
    const report: ISamplesResponseDTO = {} as ISamplesResponseDTO;
    report.id = data.id;
    report.user_id = data.user_id;

    // Entradas
    report.description_cuture = data.description_cuture;
    report.tb_1_description_deep_culture = data.tb_1_description_deep_culture;
    report.tb_1_clay = data.tb_1_clay;
    report.tb_1_silt = data.tb_1_silt;
    report.tb_1_sand = data.tb_1_sand;
    report.tb_2_m_o = data.tb_2_m_o;
    report.tb_2_ph = data.tb_2_ph;
    report.tb_3_p_fosforo = data.tb_3_p_fosforo;
    report.tb_3_k_potassio = data.tb_3_k_potassio;
    report.tb_3_na_sodio = data.tb_3_na_sodio
      ? data.tb_3_na_sodio
      : { unity: '', value: 0 };
    report.tb_3_s_enxofre = data.tb_3_s_enxofre;
    report.tb_3_b_boro = data.tb_3_b_boro;
    report.tb_3_cu_cobre = data.tb_3_cu_cobre;
    report.tb_3_fe_ferro = data.tb_3_fe_ferro;
    report.tb_3_mn_manganes = data.tb_3_mn_manganes;
    report.tb_3_zn_zinco = data.tb_3_zn_zinco;
    report.tb_4_ca_calcio = data.tb_4_ca_calcio;
    report.tb_4_mg_magnesio = data.tb_4_mg_magnesio;
    report.tb_4_al_aluminio = data.tb_4_al_aluminio;
    report.tb_4_h_al_acidez_potencial = data.tb_4_h_al_acidez_potencial;

    const clayObj = data.tb_1_clay;
    const moObj = data.tb_2_m_o;
    const phcaciObj = data.tb_2_ph;
    const fosforoObj = data.tb_3_p_fosforo;
    const potassioObj = data.tb_3_k_potassio;
    const sodioObj = data.tb_3_na_sodio
      ? data.tb_3_na_sodio
      : { unity: '', value: 0 };
    const enxofreObj = data.tb_3_s_enxofre;
    const boroObj = data.tb_3_b_boro;
    const cobreObj = data.tb_3_cu_cobre;
    const ferroObj = data.tb_3_fe_ferro;
    const manganesObj = data.tb_3_mn_manganes;
    const zincoObj = data.tb_3_zn_zinco;
    const calcioObj = data.tb_4_ca_calcio;
    const magnesioObj = data.tb_4_mg_magnesio;
    const aluminioObj = data.tb_4_al_aluminio;
    const AIObj = data.tb_4_h_al_acidez_potencial;

    // Calculos e Interpretações
    report.tb_1_solo_classe = ClayInter(clayObj.value / 10);

    // ## tb2
    report.tb_2_ph_interpretation = pHInter(phConvert(phcaciObj));

    // ## tb3
    report.tb_3_p_fosforo_interpretation = pFosforoMelichInter(
      fosforoObj.value,
    );

    const interEnxofre = sEnxofreInter(enxofreObj.value);
    const interBoro = bBoroInter(boroObj.value);
    const interCobre = cuCobreInter(cobreObj.value);
    const interFerro = feFerroInter(ferroObj.value);
    const interManganes = mnManganesInter(manganesObj.value);
    const interZinco = znZincoInter(zincoObj.value);
    const interCalcio = caCalcioInter(convertCmol(calcioObj));
    const interMagnesio = mgMagnesioInter(convertCmol(magnesioObj));

    if (interEnxofre !== 'not-exist') {
      report.tb_3_s_enxofre_interpretation = interEnxofre;
    }
    if (interBoro !== 'not-exist') {
      report.tb_3_b_boro_interpretation = interBoro;
    }
    if (interCobre !== 'not-exist') {
      report.tb_3_cu_cobre_interpretation = interCobre;
    }
    if (interFerro !== 'not-exist') {
      report.tb_3_fe_ferro_interpretation = interFerro;
    }
    if (interManganes !== 'not-exist') {
      report.tb_3_mn_manganes_interpretation = interManganes;
    }
    if (interZinco !== 'not-exist') {
      report.tb_3_zn_zinco_interpretation = interZinco;
    }
    if (interCalcio !== 'not-exist') {
      report.tb_4_ca_calcio_interpretation = interCalcio;
    }

    // ## tb4
    if (interMagnesio !== 'not-exist') {
      report.tb_4_mg_magnesio_interpretation = interMagnesio;
    }

    // ## tb5
    report.tb_5_ctcef = ctcefCalc({
      k: convertCmol(potassioObj),
      ca: convertCmol(calcioObj),
      mg: convertCmol(magnesioObj),
      al: convertCmol(aluminioObj),
    });
    report.tb_5_ctcph7 = ctcph7Calc({
      k: convertCmol(potassioObj),
      na: naSodio(sodioObj),
      ca: convertCmol(calcioObj),
      mg: convertCmol(magnesioObj),
      h_al: convertCmol(AIObj),
    });
    report.tb_5_soma_de_bases = somaDeBasesCalc({
      k: convertCmol(potassioObj),
      ca: convertCmol(calcioObj),
      mg: convertCmol(magnesioObj),
    });
    report.tb_5_ctcph7_interpretation = ctcph7Inter(report.tb_5_ctcph7);

    // ## tb6
    report.tb_6_m_saturacao_por_aluminio = mSaturacaoAluminioCalc({
      ctcef: report.tb_5_ctcef,
      al: convertCmol(aluminioObj),
    });

    const interSaturacaoAluminio = mSaturacaoAluminioInter(
      report.tb_6_m_saturacao_por_aluminio,
    );

    if (interSaturacaoAluminio !== 'not-exist') {
      report.tb_6_m_saturacao_por_aluminio_interpretation = interSaturacaoAluminio;
    }

    report.tb_6_v_saturacao_por_bases = vSaturacaoBasesCalc({
      ctcph: report.tb_5_ctcph7,
      sb: report.tb_5_soma_de_bases,
    });

    report.tb_6_v_saturacao_por_bases_interpretation = vSaturacaoBasesInter(
      report.tb_6_v_saturacao_por_bases,
    );

    // ## tb7
    report.tb_7_ncph6 = ncph6Calc({
      mo: moConvert(moObj),
      al: convertCmol(aluminioObj),
    });
    report.tb_7_ncph7 = ncph7Calc({
      ctcph7: report.tb_5_ctcph7,
      s_sb: report.tb_6_v_saturacao_por_bases,
      prnt: 100,
    });
    report.tb_7_ncph7prnt7 = ncph7prnt7Calc({
      ncph7: report.tb_7_ncph7,
      prnt: 70,
    });
    report.tb_8_ng_necessidade_de_gesso = ngCalc({
      ctcef: report.tb_5_ctcef,
      ca: convertCmol(calcioObj),
    });

    // ## tb3
    report.tb_3_k_potassio_interpretation = kPotassioInter({
      ctc: report.tb_5_ctcph7,
      k: convertCmol(potassioObj),
    });

    report.tb_9_estoque_de_carbono_densidade_solo =
      data.tb_9_estoque_de_carbono_densidade_solo;

    if (report.tb_9_estoque_de_carbono_densidade_solo) {
      report.tb_9_estoque_de_carbono = cot({
        mo: moObj,
        ds: report.tb_9_estoque_de_carbono_densidade_solo,
        deep: report.tb_1_description_deep_culture,
      });
    }

    report.objective_culture = data.objective_culture;

    if (data.objective_culture) {
      const ocOb =
        typeof data.objective_culture === 'string'
          ? JSON.parse(data.objective_culture)
          : data.objective_culture;

      const calculateFertilizing = {
        interFosforo: pFosforoMelichInter(fosforoObj.value),
        interPotassio: kPotassioInter({
          ctc: report.tb_5_ctcph7,
          k: convertCmol(potassioObj),
        }),
        interZinco: report.tb_3_zn_zinco_interpretation,
        interBoro: report.tb_3_b_boro_interpretation,
        oc: ocOb,
        mo: moObj.value,
      };
      const fertilizing = fertilizingFunc(calculateFertilizing);

      report.fertilizing = fertilizing;
    }

    report.created_at = data.created_at;
    report.updated_at = data.updated_at;
    report.city = data.city;
    report.uf = data.uf;

    return report;
  }
}
