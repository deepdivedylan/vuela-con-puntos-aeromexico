import { Destino } from '../interfaces/Destino';

export interface RedemptionData {
  destino: {
    en: string;
    es: string;
  };
  destinoEnum: Destino;
  cabina_turista: {
    temporada_baja: number;
    temporada_alta: number;
  };
  cabina_premier: {
    temporada_baja: number;
    temporada_alta: number;
  };
}

export const redemptionsData: RedemptionData[] = [
  {"destino":{"en":"Mexico","es":"México"},"destinoEnum": Destino.MEXICO, "cabina_turista":{"temporada_baja":10000,"temporada_alta":14000},"cabina_premier":{"temporada_baja":23000,"temporada_alta":28000}},
  {"destino":{"en":"North America 1: USA (except New York, Seattle and Chicago)","es":"Norteamérica 1: EUA (excepto NYC, Seattle, Boston y Chicago)"},"destinoEnum": Destino.NORTEAMERICA_1, "cabina_turista":{"temporada_baja":18000,"temporada_alta":22000},"cabina_premier":{"temporada_baja":36000,"temporada_alta":43000}},
  {"destino":{"en":"North America 2: Canada + New York and Chicago","es":"Norteamérica 2: Canadá + NYC, Seattle, Boston y Chicago"},"destinoEnum": Destino.NORTEAMERICA_2, "cabina_turista":{"temporada_baja":30000,"temporada_alta":38000},"cabina_premier":{"temporada_baja":52000,"temporada_alta":72000}},
  {"destino":{"en":"Central America and the Caribbean","es":"América Central y el Caribe"},"destinoEnum": Destino.AMERICA_CENTRAL_Y_EL_CARIBE, "cabina_turista":{"temporada_baja":30000,"temporada_alta":39000},"cabina_premier":{"temporada_baja":70000,"temporada_alta":91000}},
  {"destino":{"en":"South America North","es":"Sudamérica Norte"},"destinoEnum": Destino.SUDAMERICA_NORTE, "cabina_turista":{"temporada_baja":30000,"temporada_alta":39000},"cabina_premier":{"temporada_baja":70000,"temporada_alta":91000}},
  {"destino":{"en":"South America South","es":"Sudamérica Sur"},"destinoEnum": Destino.SUDAMERICA_SUR, "cabina_turista":{"temporada_baja":50000,"temporada_alta":66000},"cabina_premier":{"temporada_baja":100000,"temporada_alta":130000}},
  {"destino":{"en":"Northeast Asia","es":"Noreste de Asia"},"destinoEnum": Destino.NORESTE_DE_ASIA, "cabina_turista":{"temporada_baja":80000,"temporada_alta":110000},"cabina_premier":{"temporada_baja":230000,"temporada_alta":326000}},
  {"destino":{"en":"Southeast Asia","es":"Sudeste de Asia"},"destinoEnum": Destino.SUDESTE_DE_ASIA, "cabina_turista":{"temporada_baja":80000,"temporada_alta":110000},"cabina_premier":{"temporada_baja":230000,"temporada_alta":326000}},
  {"destino":{"en":"Europe","es":"Europa"},"destinoEnum": Destino.EUROPA, "cabina_turista":{"temporada_baja":75000,"temporada_alta":90000},"cabina_premier":{"temporada_baja":150000,"temporada_alta":180000}},
  {"destino":{"en":"North Africa","es":"Norte de África"},"destinoEnum": Destino.NORTE_DE_AFRICA, "cabina_turista":{"temporada_baja":93000,"temporada_alta":114000},"cabina_premier":{"temporada_baja":202000,"temporada_alta":243000}},
  {"destino":{"en":"Middle East","es":"Medio Oriente"},"destinoEnum": Destino.MEDIO_ORIENTE, "cabina_turista":{"temporada_baja":93000,"temporada_alta":114000},"cabina_premier":{"temporada_baja":202000,"temporada_alta":243000}},
  {"destino":{"en":"Africa","es":"África"},"destinoEnum": Destino.AFRICA, "cabina_turista":{"temporada_baja":120000,"temporada_alta":143000},"cabina_premier":{"temporada_baja":257000,"temporada_alta":303000}},
  {"destino":{"en":"Hawaii","es":"Hawái"},"destinoEnum": Destino.HAWAI, "cabina_turista":{"temporada_baja":34000,"temporada_alta":41000},"cabina_premier":{"temporada_baja":76000,"temporada_alta":89000}},
  {"destino":{"en":"Southwest Asia","es":"Sudoeste de Asia"},"destinoEnum": Destino.SUDOESTE_DE_ASIA, "cabina_turista":{"temporada_baja":115000,"temporada_alta":145000},"cabina_premier":{"temporada_baja":312000,"temporada_alta":409000}},
  {"destino":{"en":"Australia, New Zealand and South Pacific","es":"Australia, Nueva Zelanda y Pacífico Sur"},"destinoEnum": Destino.AUSTRALIA_NUEVA_ZELANDA_Y_PACIFICO_SUR, "cabina_turista":{"temporada_baja":128000,"temporada_alta":283000},"cabina_premier":{"temporada_baja":148000,"temporada_alta":326000}}
];