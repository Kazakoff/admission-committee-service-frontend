const GET_ABITURIENT = 'http://abitpriv.vstu.by:8080/api/adm-service/abiturient';

const PUT_ABITURIENT_PROFILE = 'http://abitpriv.vstu.by:8080/api/adm-service/abiturient/profile/';
const GET_DOC_SERIA_PROFILE = 'http://abitpriv.vstu.by:8080/api/adm-service/docseria/contains?fragment=';
const GET_DOC_TYPE_PROFILE = 'http://abitpriv.vstu.by:8080/api/adm-service/doctype/contains?fragment=';
const GET_NATIONALITY_PROFILE = 'http://abitpriv.vstu.by:8080/api/adm-service/nationality/contains?fragment=';

const PUT_ABITURIENT_ADDRESS = 'http://abitpriv.vstu.by:8080/api/adm-service/abiturient/address/';
const GET_CITY_FRAGMENT_ADDRESS = 'http://abitpriv.vstu.by:8080/api/adm-service/city/contains?fragment=';
const GET_REGION = 'http://abitpriv.vstu.by:8080/api/adm-service/district/region/';
const GET_REGION_FRAGMENT = 'http://abitpriv.vstu.by:8080/api/adm-service/region/contains?fragment=';
const POST_CITY = 'http://abitpriv.vstu.by:8080/api/adm-service/city';

const PUT_ABITURIENT_EDUCATION = 'http://abitpriv.vstu.by:8080/api/adm-service/abiturient/education/';
const GET_EDUCATIONAL_INSTITUTE_FRAGMENT_EDUCATION = 'http://abitpriv.vstu.by:8080/api/adm-service/edinst/contains?fragment=';
const GET_EDUCATIONAL_LEVEL_EDUCATION = 'http://abitpriv.vstu.by:8080/api/adm-service/edlevel/contains?fragment=';
const GET_LANGUAGE_EDUCATION = 'http://abitpriv.vstu.by:8080/api/adm-service/language/contains?fragment=';
const GET_ED_TYPE = 'http://abitpriv.vstu.by:8080/api/adm-service/edtype/contains?fragment=';
const GET_EST_CITY = 'http://abitpriv.vstu.by:8080/api/adm-service/estcity/contains?fragment=';
const POST_NEW_EDUCATION_INSITUTE = 'http://abitpriv.vstu.by:8080/api/adm-service/edinst';

const PUT_ABITURIENT_ADDITONAL_INFORMATION = 'http://abitpriv.vstu.by:8080/api/adm-service/abiturient/addinfo/';

const PUT_ABITURIENT_COMPETITION = 'http://abitpriv.vstu.by:8080/api/adm-service/abiturient/competition/';
const GET_EDUCATIONAL_DOCUMENT_TYPE_COMPETITION = 'http://abitpriv.vstu.by:8080/api/adm-service/eddoctype/contains?fragment=';
const GET_SUBJECT_COMPETITION = 'http://abitpriv.vstu.by:8080/api/adm-service/subject/contains?fragment=';
const GET_SPECIALITY = 'http://abitpriv.vstu.by:8080/api/adm-service/speciality';
const GET_FACULTIES = 'http://abitpriv.vstu.by:8080/api/adm-service/faculty/contains?fragment=';

const POST_REGISTRATION_ACCOUNT = 'http://abitpriv.vstu.by:8080/api/uaa/account';
const GET_REGISTRATION_ROLE = 'http://abitpriv.vstu.by:8080/api/uaa/role';

const GENERATE_TOKEN = 'http://abitpriv.vstu.by:8080/api/uaa/api/token/generate';

export { PUT_ABITURIENT_PROFILE, GET_ABITURIENT, GET_DOC_SERIA_PROFILE, GET_DOC_TYPE_PROFILE, GET_NATIONALITY_PROFILE,
  PUT_ABITURIENT_ADDRESS, GET_CITY_FRAGMENT_ADDRESS, GET_REGION, GET_REGION_FRAGMENT, POST_CITY,
  PUT_ABITURIENT_EDUCATION, GET_EDUCATIONAL_INSTITUTE_FRAGMENT_EDUCATION,
  GET_EDUCATIONAL_LEVEL_EDUCATION, GET_LANGUAGE_EDUCATION, GET_ED_TYPE, GET_EST_CITY, POST_NEW_EDUCATION_INSITUTE,
  PUT_ABITURIENT_ADDITONAL_INFORMATION,
  PUT_ABITURIENT_COMPETITION, GET_EDUCATIONAL_DOCUMENT_TYPE_COMPETITION, GET_SUBJECT_COMPETITION, GET_SPECIALITY, GET_FACULTIES,
  POST_REGISTRATION_ACCOUNT, GET_REGISTRATION_ROLE,
  GENERATE_TOKEN };
