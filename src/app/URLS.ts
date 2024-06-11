const GET_ABITURIENT = 'https://isit2.vstu.by:443/api/adm-service/abiturient';

const PUT_ABITURIENT_PROFILE = 'https://isit2.vstu.by:443/api/adm-service/abiturient/profile/';
const GET_DOC_SERIA_PROFILE = 'https://isit2.vstu.by:443/api/adm-service/document-seria/contains?fragment=';
const GET_DOC_TYPE_PROFILE = 'https://isit2.vstu.by:443/api/adm-service/document-type/contains?fragment=';
const GET_NATIONALITY_PROFILE = 'https://isit2.vstu.by:443/api/adm-service/nationality/contains?fragment=';

const PUT_ABITURIENT_ADDRESS = 'https://isit2.vstu.by:443/api/adm-service/abiturient/address/';
const GET_CITY_FRAGMENT_ADDRESS = 'https://isit2.vstu.by:443/api/adm-service/city/contains?fragment=';
const GET_REGION = 'https://isit2.vstu.by:443/api/adm-service/district/region/';
const GET_REGION_FRAGMENT = 'https://isit2.vstu.by:443/api/adm-service/region/contains?fragment=';
const POST_CITY = 'https://isit2.vstu.by:443/api/adm-service/city';

const PUT_ABITURIENT_EDUCATION = 'https://isit2.vstu.by:443/api/adm-service/abiturient/education/';
const GET_EDUCATIONAL_INSTITUTE_FRAGMENT_EDUCATION
  = 'https://isit2.vstu.by:443/api/adm-service/education-institution/contains?fragment=';
const GET_EDUCATIONAL_LEVEL_EDUCATION = 'https://isit2.vstu.by:443/api/adm-service/education-level/contains?fragment=';
const GET_LANGUAGE_EDUCATION = 'https://isit2.vstu.by:443/api/adm-service/language/contains?fragment=';
const GET_ED_TYPE = 'https://isit2.vstu.by:443/api/adm-service/education-type/contains?fragment=';
const GET_EST_CITY = 'https://isit2.vstu.by:443/api/adm-service/establishment-city/contains?fragment=';
const POST_NEW_EDUCATION_INSITUTE = 'https://isit2.vstu.by:443/api/adm-service/education-institution';

const PUT_ABITURIENT_ADDITONAL_INFORMATION = 'https://isit2.vstu.by:443/api/adm-service/abiturient/addinfo/';

const PUT_ABITURIENT_COMPETITION = 'https://isit2.vstu.by:443/api/adm-service/abiturient/competition/';
const GET_EDUCATIONAL_DOCUMENT_TYPE_COMPETITION = 'https://isit2.vstu.by:443/api/adm-service/education-document-type/contains?fragment=';
const GET_SUBJECT_COMPETITION = 'https://isit2.vstu.by:443/api/adm-service/subject/contains?fragment=';
const GET_SPECIALITY = 'https://isit2.vstu.by:443/api/adm-service/speciality';
const GET_FACULTIES = 'https://isit2.vstu.by:443/api/adm-service/faculty/contains?fragment=';

const POST_REGISTRATION_ACCOUNT = 'https://isit2.vstu.by:443/api/uaa/account';
const GET_REGISTRATION_ROLE = 'https://isit2.vstu.by:443/api/uaa/role';

const GENERATE_TOKEN = 'https://isit2.vstu.by:443/api/uaa/token';

const GET_STATISTICS = 'https://isit2.vstu.by:443/api/adm-service/admin/statistics/speciality';

const GET_STATUS = 'https://isit2.vstu.by:443/api/adm-service/abiturient/';

export { PUT_ABITURIENT_PROFILE, GET_ABITURIENT, GET_DOC_SERIA_PROFILE, GET_DOC_TYPE_PROFILE, GET_NATIONALITY_PROFILE,
  PUT_ABITURIENT_ADDRESS, GET_CITY_FRAGMENT_ADDRESS, GET_REGION, GET_REGION_FRAGMENT, POST_CITY,
  PUT_ABITURIENT_EDUCATION, GET_EDUCATIONAL_INSTITUTE_FRAGMENT_EDUCATION,
  GET_EDUCATIONAL_LEVEL_EDUCATION, GET_LANGUAGE_EDUCATION, GET_ED_TYPE, GET_EST_CITY, POST_NEW_EDUCATION_INSITUTE,
  PUT_ABITURIENT_ADDITONAL_INFORMATION,
  PUT_ABITURIENT_COMPETITION, GET_EDUCATIONAL_DOCUMENT_TYPE_COMPETITION, GET_SUBJECT_COMPETITION, GET_SPECIALITY, GET_FACULTIES,
  POST_REGISTRATION_ACCOUNT, GET_REGISTRATION_ROLE,
  GENERATE_TOKEN,
  GET_STATISTICS,
  GET_STATUS
};
