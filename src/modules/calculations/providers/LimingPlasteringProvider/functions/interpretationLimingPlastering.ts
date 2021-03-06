import { INTERPRETATION_VALUES } from '../config/interpretationValues';

const { MUITOBAIXO, BAIXO, MEDIO, ALTO, MUITOALTO } = INTERPRETATION_VALUES;

export function ClayInter(value: number): string {
  let classe: string;

  switch (!!value) {
    case value <= 20:
      classe = 'classe 4';
      break;
    case value <= 40:
      classe = 'classe 3';
      break;
    case value <= 60:
      classe = 'classe 2';
      break;
    case value > 60:
      classe = 'classe 1';
      break;
    default:
      classe = 'classe 0';
      break;
  }

  return classe;
}

export function pHInter(value: number): string {
  let res: string;

  switch (!!value) {
    case value <= 5:
      res = MUITOBAIXO;
      break;
    case value <= 5.4:
      res = BAIXO;
      break;
    case value <= 6:
      res = MEDIO;
      break;
    case value > 6:
      res = ALTO;
      break;
    default:
      res = '';
      break;
  }

  return res;
}

export function pFosforoMelichInter(value: number): string {
  let res: string;

  switch (!!value) {
    case value < 0:
      res = 'not-exist';
      break;
    case value <= 5:
      res = MUITOBAIXO;
      break;
    case value <= 10:
      res = BAIXO;
      break;
    case value <= 20:
      res = MEDIO;
      break;
    case value > 40:
      res = ALTO;
      break;
    default:
      res = '';
      break;
  }

  return res;
}

export function kPotassioInter({ ctc, k }: { ctc: number; k: number }): string {
  let res: string;

  switch (!!ctc) {
    case ctc <= 5:
      switch (!!k) {
        case k < 0:
          res = 'not-exist';
          break;
        case k <= 15:
          res = MUITOBAIXO;
          break;
        case k <= 30:
          res = BAIXO;
          break;
        case k >= 45:
          res = MEDIO;
          break;
        case k >= 90:
          res = ALTO;
          break;
        case k > 90:
          res = MUITOALTO;
          break;
        default:
          res = '';
          break;
      }
      break;
    case ctc <= 15:
      switch (!!k) {
        case k < 0:
          res = 'not-exist';
          break;
        case k <= 20:
          res = MUITOBAIXO;
          break;
        case k <= 40:
          res = BAIXO;
          break;
        case k >= 60:
          res = MEDIO;
          break;
        case k >= 120:
          res = ALTO;
          break;
        case k > 120:
          res = MUITOALTO;
          break;
        default:
          res = '';
          break;
      }
      break;
    case ctc > 15:
      switch (!!k) {
        case k < 0:
          res = 'not-exist';
          break;
        case k <= 30:
          res = MUITOBAIXO;
          break;
        case k <= 60:
          res = BAIXO;
          break;
        case k >= 90:
          res = MEDIO;
          break;
        case k >= 180:
          res = ALTO;
          break;
        case k > 180:
          res = MUITOALTO;
          break;
        default:
          res = '';
          break;
      }
      break;
    default:
      res = '';
      break;
  }

  return res;
}

export function sEnxofreInter(value: number): string {
  let res: string;

  switch (!!value) {
    case value < 0:
      res = 'not-exist';
      break;
    case value <= 2:
      res = BAIXO;
      break;
    case value <= 5:
      res = MEDIO;
      break;
    case value > 5:
      res = ALTO;
      break;
    default:
      res = '';
      break;
  }

  return res;
}

export function bBoroInter(value: number): string {
  let res: string;

  switch (!!value) {
    case value < 0:
      res = 'not-exist';
      break;
    case value < 0.1:
      res = BAIXO;
      break;
    case value <= 0.3:
      res = MEDIO;
      break;
    case value > 0.3:
      res = ALTO;
      break;
    default:
      res = '';
      break;
  }

  return res;
}

export function cuCobreInter(value: number): string {
  let res: string;

  switch (!!value) {
    case value < 0:
      res = 'not-exist';
      break;
    case value < 0.2:
      res = BAIXO;
      break;
    case value <= 0.4:
      res = MEDIO;
      break;
    case value > 0.4:
      res = ALTO;
      break;
    default:
      res = '';
      break;
  }

  return res;
}

export function feFerroInter(value: number): string {
  let res: string;

  switch (!!value) {
    case value < 0:
      res = 'not-exist';
      break;
    case value > 5:
      res = ALTO;
      break;
    default:
      res = '';
      break;
  }

  return res;
}

export function mnManganesInter(value: number): string {
  let res: string;

  switch (!!value) {
    case value < 0:
      res = 'not-exist';
      break;
    case value < 2.5:
      res = BAIXO;
      break;
    case value <= 5:
      res = MEDIO;
      break;
    case value > 5:
      res = ALTO;
      break;
    default:
      res = '';
      break;
  }

  return res;
}

export function znZincoInter(value: number): string {
  let res: string;

  switch (!!value) {
    case value < 0:
      res = 'not-exist';
      break;
    case value < 0.2:
      res = BAIXO;
      break;
    case value <= 0.5:
      res = MEDIO;
      break;
    case value > 0.5:
      res = ALTO;
      break;
    default:
      res = '';
      break;
  }

  return res;
}

export function caCalcioInter(value: number): string {
  let res: string;

  switch (!!value) {
    case value < 0:
      res = 'not-exist';
      break;
    case value <= 2:
      res = BAIXO;
      break;
    case value <= 4:
      res = MEDIO;
      break;
    case value > 4.1:
      res = ALTO;
      break;
      break;
    default:
      res = '';
      break;
  }

  return res;
}

export function mgMagnesioInter(value: number): string {
  let res: string;

  switch (!!value) {
    case value < 0:
      res = 'not-exist';
      break;
    case value <= 0.5:
      res = BAIXO;
      break;
    case value <= 1:
      res = MEDIO;
      break;
    case value > 1.1:
      res = ALTO;
      break;
    default:
      res = '';
      break;
  }

  return res;
}

export function ctcph7Inter(value: number): string {
  let res: string;

  switch (!!value) {
    case value <= 5:
      res = BAIXO;
      break;
    case value <= 15:
      res = MEDIO;
      break;
    case value > 15:
      res = ALTO;
      break;
    default:
      res = '';
      break;
  }

  return res;
}

export function mSaturacaoAluminioInter(value: number): string {
  let res: string;

  switch (!!value) {
    case value < 0:
      res = 'not-exist';
      break;
    case value < 1:
      res = MUITOBAIXO;
      break;
    case value <= 10:
      res = BAIXO;
      break;
    case value <= 20:
      res = MEDIO;
      break;
    case value > 20:
      res = ALTO;
      break;
    default:
      res = '';
      break;
  }

  return res;
}

export function vSaturacaoBasesInter(value: number): string {
  let res: string;

  switch (!!value) {
    case value < 45:
      res = MUITOBAIXO;
      break;
    case value <= 64:
      res = BAIXO;
      break;
    case value <= 80:
      res = MEDIO;
      break;
    case value > 81:
      res = ALTO;
      break;
    default:
      res = '';
      break;
  }

  return res;
}
