export interface IMyVacanciesData {
  creationDate: string,
  position: string,
  id: number,
  image: {
    id: number,
    name: string,
    type: string,
    fileData: [
      string
    ],
    jobSeekerId: number,
    path: string
  },
  companyName: string,
  about_company: string,
  description: string,
  skills: string,
  contactInformationResponse: {
    idl: number,
    country: string,
    city: string,
    street_house: string
  },
  additionalInformation: string,
  respondedCount: number,
  country: string,
  city: string,
  category: string,
  typeOfEmploymentS: string,
  requiredExperience: string,
  salaryResponse: {
    id: number,
    alaryType: string,
    salarySum: number,
    valute: string
  },
  searchCounter: number,
  industry: string,
  statusOfVacancy: string
}
