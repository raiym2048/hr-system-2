interface Image {
    id: number
    name: string
    type: string
    fileData: string[]
    jobSeekerId: number
    path: string
}

interface ContactInformationResponse {
    idl: number
    country: string
    city: string
    street_house: string
}

interface SalaryResponse {
    id: number
    salaryType: string
    salarySum: number
    valute: string
}

export interface IEmployerVacancy {
    creationDate: string
    position: string
    id: number
    image: Image
    companyName: string
    about_company: string
    description: string
    skills: string
    contactInformationResponse: ContactInformationResponse
    additionalInformation: string
    respondedCount: number
    country: string
    city: string
    category: string
    typeOfEmploymentS: string
    requiredExperience: string
    salaryResponse: SalaryResponse
    searchCounter: number
    industry: string
    statusOfVacancy: string
}


export interface IResponceCandidate {
    vacancyId: number
    id: number
    respondedCount: number
    firstname: string
    lastname: string
    position: string
    category: string
    experience: string
    country: string
    city: string
    localDate: string
    statusOfJobSeeker: string
}
