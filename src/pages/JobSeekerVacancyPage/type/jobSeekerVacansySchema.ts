

interface ISalaryResponse{
    id: number,
    salaryType: string,
    salarySum: number,
    valute: string
}
interface IImage{
    id:number,
    name:string,
    type:string,
    fileData:string[],
    jobSeekerId: number,
    path: string
}
interface IContactInformationResponse{
    idl: number,
    country: string,
    city: string,
    street_house: string
}
export interface IVacancy {
    id: number,
    creationDate: string,
    position: string,
    image:IImage,
    companyName: string,
    about_company: string,
    description: string,
    skills: string,
    contactInformationResponse:IContactInformationResponse,
    additionalInformation: string,
    respondedCount: number,
    country: string,
    city: string,
    category: string,
    typeOfEmploymentS: string,
    requiredExperience: string,
    salaryResponse:ISalaryResponse,
    industry: string,
    searchCounter:number,
    statusOfVacancy: string
}
export interface IVacancues{
    id:number,
    ownerName:string,
    vacancyResponse:IVacancy,
}

export interface JobSeekerVacancyState {
    vacancy_list: IVacancues[],
    isLoading: boolean,
    error: string,
}


