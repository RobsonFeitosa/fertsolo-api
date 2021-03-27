import {
  FIELDS_CULTURE_VALUES,
  INTERPRETATION_VALUES,
  FIELDS_CULTURE_VALUES_BEFORE,
  FIELDS_CULTURE_THA,
} from '../config/interpretationValues';

import Fertilizing from '../../../infra/typeorm/entities/Fertilizing';

const {
  ARROZ_DE_SEQUEIRO,
  FEIJAO,
  MILHO,
  SOJA,
  SORGO,
  GRAMINEAS,
  ABOBORAEMORANGA,
  ACAR,
  ALHO,
  BETERRABACENOURA,
  MELANCIAMELAO,
  PIMENTAL,
  BATATADOCE,
} = FIELDS_CULTURE_VALUES;
const { MUITOBAIXO, BAIXO, MEDIO, ALTO, MUITOALTO } = INTERPRETATION_VALUES;

const {
  LEGUMINOSA,
  CONSORCIO_OU_POUSIO,
  GRAMINEA,
} = FIELDS_CULTURE_VALUES_BEFORE;

const { _6A8, _7A11, _9A11, _12A15 } = FIELDS_CULTURE_THA;

interface fertilizingFuncDTO {
  mo: number;
  interFosforo: string;
  interPotassio: string;
  interZinco: string;
  interBoro: string;
  oc: {
    culture: string;
    cultureBefore?: string;
    nitrogenioTha?: string;
    pFosforoTha?: string;
    kPotassioTha?: string;
    micronutrientesTha?: string;
    micronutrientesZincoBoroName?: string;
  }[];
}

interface INitrogenioReq {
  mo: number;
  nitrogenioValues?: {
    property: string;
    properties: string[];
    values: {
      [key: number]: string[];
    };
  };
  values?: string[] | undefined;
}

interface ITuplaProperty {
  first: string[];
  second: string[];
}

interface IOCTuplaFertilizing {
  p_fosforo_fertilizing?: string | undefined;
  k_postassio_fertilizing?: string | undefined;
}

interface IMicronutrientesReq {
  inter: {
    zn: string;
    b: string;
    type: string;
  };

  enters?: {
    property: string;
    properties: string[];
    values: {
      [key: number]: {
        zn: string[];
        b: string[];
      };
    };
  };
}

interface IMicronutrientesRes {
  zn?: string | undefined;
  b?: string | undefined;
}

interface IPKInterReq {
  inter: { name: string; type: string };
  pkValues?: {
    property: string;
    properties: string[];
    values: {
      [key: number]: string[];
    };
  };
  values?: ITuplaProperty | string[] | undefined;
}

interface IPKInterRes {
  p_fosforo_first_fertilizing?: string;
  p_fosforo_second_fertilizing?: string;
  k_potassio_first_fertilizing?: string;
  k_potassio_second_fertilizing?: string;
}

function nitrogenioMO({
  mo,
  nitrogenioValues,
  values,
}: INitrogenioReq): string {
  if (nitrogenioValues) {
    const callbackNitrogenio = (vl: number): string => {
      switch (nitrogenioValues?.property) {
        case nitrogenioValues?.properties[0]:
          return nitrogenioValues?.values[0][vl];
          break;
        case nitrogenioValues?.properties[1]:
          return nitrogenioValues?.values[1][vl];
          break;
        case nitrogenioValues?.properties[2]:
          return nitrogenioValues?.values[2][vl];
          break;
        default:
          return '';
          break;
      }
    };

    switch (!!mo) {
      case mo <= 2.5:
        return callbackNitrogenio(0);
        break;
      case mo <= 5:
        return callbackNitrogenio(1);
        break;
      case mo > 5:
        return callbackNitrogenio(2);
        break;
      default:
        return '';
        break;
    }
  }

  if (values) {
    switch (!!mo) {
      case mo <= 2.5:
        return values[0];
        break;
      case mo <= 5:
        return values[1];
        break;
      case mo > 5:
        return values[2];
        break;
      default:
        return '';
        break;
    }
  }

  return 'Não recomendado';
}

function micronutrientes({
  inter,
  enters,
}: IMicronutrientesReq): IMicronutrientesRes {
  const callbackMicron = (vl: number): IMicronutrientesRes => {
    switch (enters?.property) {
      case enters?.properties[0]:
        return {
          ...(inter.b && {
            b: enters?.values[0].b[vl],
          }),
          ...(inter.zn && {
            zn: enters?.values[0].zn[vl],
          }),
        };
        break;
      case enters?.properties[1]:
        return {
          ...(inter.b && {
            b: enters?.values[1].b[vl],
          }),
          ...(inter.zn && {
            zn: enters?.values[1].zn[vl],
          }),
        };
        break;
      case enters?.properties[2]:
        return {
          ...(inter.b && {
            b: enters?.values[2].b[vl],
          }),
          ...(inter.zn && {
            zn: enters?.values[2].zn[vl],
          }),
        };
        break;
      default:
        return {} as IMicronutrientesRes;
        break;
    }
  };

  switch (inter.zn) {
    case BAIXO:
      return callbackMicron(0);
      break;
    case MEDIO:
      return callbackMicron(1);
      break;
    case ALTO:
      return callbackMicron(2);
      break;
    default:
      return {};
      break;
  }
}

function PKInter({
  inter,
  values,
  pkValues,
}: IPKInterReq): IPKInterRes | IOCTuplaFertilizing {
  const valuesObj: ITuplaProperty =
    values !== undefined
      ? (Object.assign(values) as ITuplaProperty)
      : ({} as ITuplaProperty);
  const valuesArr: string[] = values as string[];

  const valuesTyp =
    valuesObj.first !== undefined && valuesObj.second !== undefined;

  const callbackObjectFertilizing = (vl: number): IPKInterRes => {
    return {
      ...(inter.type === 'fosforo' &&
        valuesTyp && {
          p_fosforo_first_fertilizing: valuesObj.first[vl],
          p_fosforo_second_fertilizing: valuesObj.second[vl],
        }),
      ...(inter.type === 'fosforo' &&
        !valuesTyp && {
          p_fosforo_fertilizing: valuesArr[vl],
        }),

      ...(inter.type === 'potassio' &&
        valuesTyp && {
          k_potassio_first_fertilizing: valuesObj.first[vl],
          k_potassio_second_fertilizing: valuesObj.second[vl],
        }),
      ...(inter.type === 'potassio' &&
        !valuesTyp && {
          k_potassio_fertilizing: valuesArr[vl],
        }),
    };
  };

  const callbackObjectFertilizingThird = (vl: number): IOCTuplaFertilizing => {
    switch (pkValues?.property) {
      case pkValues?.properties[0]:
        return {
          ...(inter.type === 'fosforo' && {
            p_fosforo_fertilizing: pkValues?.values[0][vl],
          }),
          ...(inter.type === 'potassio' && {
            k_potassio_fertilizing: pkValues?.values[0][vl],
          }),
        };
        break;
      case pkValues?.properties[1]:
        return {
          ...(inter.type === 'fosforo' && {
            p_fosforo_fertilizing: pkValues?.values[1][vl],
          }),
          ...(inter.type === 'potassio' && {
            k_potassio_fertilizing: pkValues?.values[1][vl],
          }),
        };
        break;
      case pkValues?.properties[2]:
        return {
          ...(inter.type === 'fosforo' && {
            p_fosforo_fertilizing: pkValues?.values[2][vl],
          }),
          ...(inter.type === 'potassio' && {
            k_potassio_fertilizing: pkValues?.values[2][vl],
          }),
        };
        break;
      default:
        return {} as IOCTuplaFertilizing;
        break;
    }
  };

  switch (inter.name) {
    case MUITOBAIXO:
      return pkValues
        ? callbackObjectFertilizingThird(0)
        : callbackObjectFertilizing(0);
      break;
    case BAIXO:
      return pkValues
        ? callbackObjectFertilizingThird(1)
        : callbackObjectFertilizing(1);
      break;
    case MEDIO:
      return pkValues
        ? callbackObjectFertilizingThird(2)
        : callbackObjectFertilizing(2);
    case ALTO:
      return pkValues
        ? callbackObjectFertilizingThird(3)
        : callbackObjectFertilizing(3);
      break;
    case MUITOALTO:
      return pkValues
        ? callbackObjectFertilizingThird(4)
        : callbackObjectFertilizing(4);
      break;
    default:
      return {} as IPKInterRes | IOCTuplaFertilizing;
      break;
  }
}

export default function fertilizingFunc({
  mo,
  interFosforo,
  interPotassio,
  interZinco,
  interBoro,
  oc,
}: fertilizingFuncDTO): any {
  return oc.map((objCulture: any) => {
    const item: Fertilizing = {
      culture_name: objCulture.culture,
    } as Fertilizing;

    switch (objCulture.culture) {
      case ARROZ_DE_SEQUEIRO:
        return {
          ...item,
          ...(!!mo && {
            n_nitrogenio: nitrogenioMO({
              mo,
              values: ['60', '55', '25'],
            }),
          }),
          ...(interFosforo &&
            PKInter({
              inter: { name: interFosforo, type: 'fosforo' },
              values: {
                first: ['100', '60', '50', '20', '0'],
                second: ['60', '40', '20', '20', '20'],
              },
            })),
          ...(interPotassio &&
            PKInter({
              inter: { name: interPotassio, type: 'potassio' },
              values: {
                first: ['100', '60', '50', '20', '0'],
                second: ['60', '40', '20', '20', '20'],
              },
            })),
        };

      case FEIJAO:
        return {
          ...item,
          ...(!!mo && {
            n_nitrogenio: nitrogenioMO({
              mo,
              values: ['50', '30', '20'],
            }),
          }),
          ...(!!interFosforo &&
            PKInter({
              inter: { name: interFosforo, type: 'fosforo' },
              values: {
                first: ['105', '65', '55', '25', '0'],
                second: ['65', '45', '25', '25', '25'],
              },
            })),
          ...(!!interPotassio &&
            PKInter({
              inter: { name: interPotassio, type: 'potassio' },
              values: {
                first: ['110', '70', '60', '30', '0'],
                second: ['70', '50', '30', '20', '30'],
              },
            })),
        };

        break;

      case MILHO:
        return {
          ...item,
          ...(objCulture.objective_culture_before_milho && {
            cultureBefore: objCulture.objective_culture_before_milho,
            n_nitrogenio: nitrogenioMO({
              mo,
              nitrogenioValues: {
                property: objCulture.objective_culture_before_milho,
                properties: [LEGUMINOSA, CONSORCIO_OU_POUSIO, GRAMINEA],
                values: {
                  0: ['70', '50', '30'],
                  1: ['80', '60', '40'],
                  2: ['90', '70', '50'],
                },
              },
            }),
          }),
          ...(interFosforo &&
            PKInter({
              inter: { name: interFosforo, type: 'fosforo' },
              values: {
                first: ['125', '85', '75', '45', '0'],
                second: ['85', '65', '45', '45', '45'],
              },
            })),
          ...(interPotassio &&
            PKInter({
              inter: { name: interPotassio, type: 'potassio' },
              values: {
                first: ['110', '70', '60', '30', '0'],
                second: ['70', '50', '30', '30', '30'],
              },
            })),
        };
        break;

      case SOJA:
        return {
          ...item,
          ...(!!mo && {
            n_nitrogenio: nitrogenioMO({
              mo,
            }),
          }),
          ...(interFosforo &&
            PKInter({
              inter: { name: interFosforo, type: 'fosforo' },
              values: {
                first: ['110', '70', '60', '30', '0'],
                second: ['70', '50', '30', '30', '30'],
              },
            })),
          ...(interPotassio &&
            PKInter({
              inter: { name: interPotassio, type: 'potassio' },
              values: {
                first: ['125', '85', '75', '45', '0'],
                second: ['85', '65', '45', '45', '45'],
              },
            })),
        };
        break;

      case SORGO:
        return {
          ...item,
          ...(!!mo && {
            n_nitrogenio: nitrogenioMO({
              mo,
              values: ['60', '40', '20'],
            }),
          }),
          ...(interFosforo &&
            PKInter({
              inter: { name: interFosforo, type: 'fosforo' },
              values: {
                first: ['115', '75', '65', '35', '0'],
                second: ['75', '55', '35', '35', '35'],
              },
            })),
          ...(interPotassio &&
            PKInter({
              inter: { name: interPotassio, type: 'potassio' },
              values: {
                first: ['105', '65', '55', '25', '0'],
                second: ['65', '45', '25', '25', '25'],
              },
            })),
        };
        break;

      case GRAMINEAS:
        return {
          ...item,
          ...(!!mo && {
            n_nitrogenio: nitrogenioMO({
              mo,
              values: ['200', 'de 100 a 200', '100'],
            }),
          }),
          ...(interFosforo &&
            PKInter({
              inter: { name: interFosforo, type: 'fosforo' },
              values: {
                first: ['120', '100', '80', '60', '0'],
                second: ['100', '80', '60', '60', '60'],
              },
            })),
          ...(interPotassio &&
            PKInter({
              inter: { name: interPotassio, type: 'potassio' },
              values: {
                first: ['120', '100', '80', '60', '0'],
                second: ['100', '60', '60', '60', '60'],
              },
            })),
        };
        break;

      case ABOBORAEMORANGA:
        return {
          ...item,
          ...(!!mo && {
            n_nitrogenio: nitrogenioMO({
              mo,
              values: ['60', '46', '25'],
            }),
          }),
          ...(interFosforo &&
            PKInter({
              inter: { name: interFosforo, type: 'fosforo' },
              values: ['240', '180', '140', '100', '80'],
            })),
          ...(interPotassio &&
            PKInter({
              inter: { name: interPotassio, type: 'potassio' },
              values: ['170', '130', '90', '60', '60'],
            })),
        };
        break;

      case ACAR:
        return {
          ...item,
          ...(!!mo && {
            n_nitrogenio: nitrogenioMO({
              mo,
              values: ['de 150 a 200', '100', '80'],
            }),
          }),
          ...(interFosforo &&
            PKInter({
              inter: { name: interFosforo, type: 'fosforo' },
              values: ['200', '140', '100', '70', '40'],
            })),
          ...(interPotassio &&
            PKInter({
              inter: { name: interPotassio, type: 'potassio' },
              values: ['240', '200', '160', '120', '90'],
            })),
        };
        break;

      case ALHO:
        return {
          ...item,
          ...(objCulture.nitrogenioTha && {
            n_nitrogenio: nitrogenioMO({
              mo,
              nitrogenioValues: {
                property: objCulture.nitrogenioTha,
                properties: [_6A8, _7A11, _12A15],
                values: {
                  0: ['150', '135', '120'],
                  1: ['225', '210', '180'],
                  2: ['300', '270', '255'],
                },
              },
            }),
          }),
          ...(objCulture.pFosforoTha &&
            PKInter({
              inter: { name: interFosforo, type: 'fosforo' },
              pkValues: {
                property: objCulture.pFosforoTha,
                properties: [_6A8, _9A11, _12A15],
                values: {
                  0: ['300', '250', '200', '150', '130'],
                  1: ['450', '380', '300', '250', '220'],
                  2: ['600', '500', '400', '300', '260'],
                },
              },
            })),
          ...(objCulture.kPotassioTha &&
            PKInter({
              inter: { name: interPotassio, type: 'potassio' },
              pkValues: {
                property: objCulture.kPotassioTha,
                properties: [_6A8, _9A11, _12A15],
                values: {
                  0: ['300', '240', '180', '120', '100'],
                  1: ['450', '360', '270', '180', '150'],
                  2: ['600', '480', '360', '240', '200'],
                },
              },
            })),
          ...(objCulture.micronutrientesTha &&
            micronutrientes({
              inter: { zn: interZinco, b: interBoro, type: 'solo' },
              enters: {
                property: objCulture.micronutrientesTha,
                properties: [_6A8, _9A11, _12A15],
                values: {
                  0: {
                    zn: ['9', '6', '3'],
                    b: ['0.6', '0.4', '0'],
                  },
                  1: {
                    zn: ['12', '9', '6'],
                    b: ['0.8', '0.6', '0.4'],
                  },
                  2: {
                    zn: ['15', '12', '9'],
                    b: ['1', '0.8', '0.6'],
                  },
                },
              },
            })),
        };
        break;

      case BETERRABACENOURA:
        return {
          ...item,
          ...(!!mo && {
            n_nitrogenio: nitrogenioMO({
              mo,
              values: ['100', '70', '50'],
            }),
          }),
          ...(interFosforo &&
            PKInter({
              inter: { name: interFosforo, type: 'fosforo' },
              values: ['240', '200', '150', '100', '50'],
            })),
          ...(interPotassio &&
            PKInter({
              inter: { name: interPotassio, type: 'potassio' },
              values: ['240', '180', '140', '100', '50'],
            })),
        };
        break;

      case MELANCIAMELAO:
        return {
          ...item,
          ...(!!mo && {
            n_nitrogenio: nitrogenioMO({
              mo,
              values: ['100', '70', '50'],
            }),
          }),
          ...(interFosforo &&
            PKInter({
              inter: { name: interFosforo, type: 'fosforo' },
              values: ['240', '180', '140', '100', '80'],
            })),
          ...(interPotassio &&
            PKInter({
              inter: { name: interPotassio, type: 'potassio' },
              values: ['270', '230', '190', '150', '80'],
            })),
        };
        break;

      case PIMENTAL:
        return {
          ...item,
          ...(!!mo && {
            n_nitrogenio: nitrogenioMO({
              mo,
              values: ['110', '50', '50'],
            }),
          }),
          ...(interFosforo &&
            PKInter({
              inter: { name: interFosforo, type: 'fosforo' },
              values: ['240', '180', '140', '100', '80'],
            })),
          ...(interPotassio &&
            PKInter({
              inter: { name: interPotassio, type: 'potassio' },
              values: ['270', '230', '190', '150', '120'],
            })),
        };
        break;

      case BATATADOCE:
        return {
          ...item,
          ...(!!mo && {
            n_nitrogenio: nitrogenioMO({
              mo,
              values: ['70', '40', '30'],
            }),
          }),
          ...(interFosforo &&
            PKInter({
              inter: { name: interFosforo, type: 'fosforo' },
              values: ['50', '50', '50', '50', '50'],
            })),
          ...(interPotassio &&
            PKInter({
              inter: { name: interPotassio, type: 'potassio' },
              values: ['220', '180', '120', '80', '60'],
            })),
        };
        break;

      default:
        return {} as Fertilizing;
        break;
    }
  });
}
