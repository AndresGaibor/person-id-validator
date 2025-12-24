import { validar as validarEcuador, ValidarIdentificacion as Ecuador } from './countries/ecuador';
import { ValidarIdentificacionChile as Chile } from './countries/chile';
import { ValidarIdentificacionSpain as Spain } from './countries/spain';
import { ValidarIdentificacionMexico as Mexico } from './countries/mexico';
import { ValidarIdentificacionUsa as USA } from './countries/usa';
import { ValidarIdentificacionArgentina as Argentina } from './countries/argentina';
import { ValidarIdentificacionColombia as Colombia } from './countries/colombia';
import { ValidarIdentificacionPeru as Peru } from './countries/peru';

// New Imports
import { ValidarIdentificacionAsia as Asia } from './countries/asia';
import { ValidarIdentificacionEurope as Europe } from './countries/europe';
import { ValidarIdentificacionAmericasExtended as Americas } from './countries/americas_extended';
import { ValidarIdentificacionAfricaMiddleEast as Africa } from './countries/africa_middle_east';
import { ValidarIdentificacionOceania as Oceania } from './countries/oceania';

// Re-export specific country modules for direct usage
export { 
  Ecuador, Chile, Spain, Mexico, USA, Argentina, Colombia, Peru,
  Asia, Europe, Americas, Africa, Oceania
};

/**
 * Validates an identification number based on the nationality/country code.
 *
 * @param {string} id - The identification number to validate.
 * @param {string} nacionalidad - The country identifier.
 * @returns {boolean | object} - Returns validation result.
 */
export const validar = (id: string, nacionalidad: string) => {
  const country = nacionalidad.toLowerCase().trim();

  switch (country) {
    // Existing
    case 'ecuador': case 'ecuatoriano': return validarEcuador(id);
    case 'chile': case 'chileno': return Chile.validarRut(id);
    case 'spain': case 'españa': case 'espanol': return Spain.validarDniNie(id);
    case 'mexico': case 'mexicano': return Mexico.validarCurp(id) || Mexico.validarRfc(id);
    case 'usa': case 'estados unidos': case 'americano': return USA.validarSsn(id);
    case 'argentina': case 'argentino': return Argentina.validarCuit(id) || Argentina.validarDni(id);
    case 'colombia': case 'colombiano': return Colombia.validarNit(id) || Colombia.validarCedula(id);
    case 'peru': case 'peruano': return Peru.validarDni(id);

    // Asia
    case 'china': return Asia.validarChinaID(id);
    case 'india': return Asia.validarIndiaPAN(id) || Asia.validarIndiaAadhaar(id);
    case 'japan': case 'japon': return Asia.validarJapanMyNumber(id);
    case 'south korea': case 'korea': case 'corea del sur': return Asia.validarSouthKoreaRRN(id);
    case 'singapore': case 'singapur': return Asia.validarSingaporeNRIC(id);
    case 'indonesia': return Asia.validarIndonesiaNIK(id);
    case 'thailand': case 'tailandia': return Asia.validarThailandID(id);
    case 'pakistan': return Asia.validarPakistanCNIC(id);
    case 'vietnam': return Asia.validarVietnamID(id);
    case 'philippines': case 'filipinas': return Asia.validarPhilippinesID(id);
    case 'bangladesh': return Asia.validarBangladeshNID(id);
    case 'malaysia': case 'malasia': return Asia.validarMalaysiaNRIC(id);

    // Europe
    case 'uk': case 'united kingdom': case 'reino unido': return Europe.validarUKNINO(id);
    case 'france': case 'francia': return Europe.validarFranceNIR(id);
    case 'italy': case 'italia': return Europe.validarItalyCodiceFiscale(id);
    case 'germany': case 'alemania': return Europe.validarGermanySteuerID(id);
    case 'netherlands': case 'holanda': case 'paises bajos': return Europe.validarNetherlandsBSN(id);
    case 'poland': case 'polonia': return Europe.validarPolandPESEL(id);
    case 'romania': case 'rumania': return Europe.validarRomaniaCNP(id);
    case 'russia': case 'rusia': return Europe.validarRussiaPassport(id);
    case 'sweden': case 'suecia': return Europe.validarSwedenPersonnummer(id);
    case 'norway': case 'noruega': return Europe.validarNorwayFodselsnummer(id);
    case 'denmark': case 'dinamarca': return Europe.validarDenmarkCPR(id);
    case 'finland': case 'finlandia': return Europe.validarFinlandHETU(id);
    case 'portugal': return Europe.validarPortugalNIF(id);
    case 'ukraine': case 'ucrania': return Europe.validarUkrainePassport(id);
    case 'ireland': case 'irlanda': return Europe.validarIrelandPPS(id);
    case 'greece': case 'grecia': return Europe.validarGreeceAMKA(id);
    case 'czech republic': case 'republica checa': return Europe.validarCzechRC(id);
    case 'hungary': case 'hungria': return Europe.validarHungaryTAJ(id);
    case 'austria': return Europe.validarAustriaSV(id);
    case 'switzerland': case 'suiza': return Europe.validarSwitzerlandAHV(id);
    case 'belgium': case 'belgica': return Europe.validarBelgiumNN(id);

    // Americas Extended
    case 'brazil': case 'brasil': return Americas.validarBrazilCPF(id);
    case 'canada': return Americas.validarCanadaSIN(id);
    case 'uruguay': return Americas.validarUruguayCI(id);
    case 'paraguay': return Americas.validarParaguayCI(id);
    case 'venezuela': return Americas.validarVenezuelaCI(id);
    case 'costa rica': return Americas.validarCostaRicaCedula(id);
    case 'panama': return Americas.validarPanamaCedula(id);
    case 'dominican republic': case 'republica dominicana': return Americas.validarDominicanRepublicCedula(id);
    case 'guatemala': return Americas.validarGuatemalaCUI(id);
    case 'el salvador': return Americas.validarElSalvadorDUI(id);
    case 'bolivia': return Americas.validarBoliviaCI(id);

    // Africa / Middle East
    case 'south africa': case 'sudafrica': return Africa.validarSouthAfricaID(id);
    case 'israel': return Africa.validarIsraelID(id);
    case 'turkey': case 'turquia': return Africa.validarTurkeyTC(id);
    case 'egypt': case 'egipto': return Africa.validarEgyptNationalID(id);
    case 'nigeria': return Africa.validarNigeriaNIN(id);
    case 'saudi arabia': case 'arabia saudita': return Africa.validarSaudiArabiaID(id);
    case 'kenya': case 'kenia': return Africa.validarKenyaID(id);

    // Oceania
    case 'australia': return Oceania.validarAustraliaTFN(id);
    case 'new zealand': case 'nueva zelanda': return Oceania.validarNewZealandIRD(id);

    default:
      return false;
  }
};