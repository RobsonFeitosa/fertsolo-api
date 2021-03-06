import {
  somaDeBasesDTO,
  ctcefDTO,
  ctcph7DTO,
  mSaturacaoAluminioDTO,
  vSaturacaoBasesDTO,
  ncph7DTO,
  ncph7prnt7DTO,
  ngDTO,
  ncph6DTO,
} from '../dtos/FormulaLimingPlastering';

export function somaDeBasesCalc(data: somaDeBasesDTO): number {
  const { ca, mg } = data;

  const k = data.k ? data.k : 0;
  const na = data.na ? data.na : 0;

  const amount = Number((k + na + ca + mg).toFixed(2));

  return amount;
}

export function ctcefCalc(data: ctcefDTO): number {
  const { ca, mg, al } = data;

  const k = data.k ? data.k : 0;
  const na = data.na ? data.na : 0;

  const amount = Number((k + na + ca + mg + al).toFixed(2));

  return amount;
}

export function ctcph7Calc(data: ctcph7DTO): number {
  const { ca, mg, h_al } = data;

  const k = data.k ? data.k : 0;
  const na = data.na ? data.na : 0;

  const amount = Number((k + na + ca + mg + h_al).toFixed(2));

  return amount;
}

export function mSaturacaoAluminioCalc(data: mSaturacaoAluminioDTO): number {
  const { ctcef, al } = data;

  const amount = Number(((al * 100) / ctcef).toFixed(2));

  return amount;
}

export function vSaturacaoBasesCalc(data: vSaturacaoBasesDTO): number {
  const { ctcph, sb } = data;

  const amount = Number(((sb * 100) / ctcph).toFixed(2));

  return amount;
}

export function ncph6Calc(data: ncph7DTO): number {
  const { mo, al } = data;

  const amount = Number((-0.516 + 0.805 * mo + 2.435 * al).toFixed(2));

  return amount;
}

export function ncph7Calc(data: ncph6DTO): number {
  const { ctcph7, prnt, s_sb } = data;

  const amount = Number(((ctcph7 * (90 - s_sb)) / prnt).toFixed(2));

  return amount;
}

export function ncph7prnt7Calc(data: ncph7prnt7DTO): number {
  const { ncph7, prnt } = data;

  const amount = Number(((ncph7 * 100) / prnt).toFixed(2));

  return amount;
}

export function ngCalc(data: ngDTO): number {
  const { ca, ctcef } = data;

  const amount = Number(((0.6 * ctcef - ca) * 6.4).toFixed(2));

  return amount;
}
