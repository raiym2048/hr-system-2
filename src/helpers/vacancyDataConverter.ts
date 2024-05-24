import { TData } from "../pages/employer/vacancyForm";
import { ReceivedData } from "../redux/slice/vacancyByIdSlice";

export const prepareForForm = (data: ReceivedData) => {
  const formCompatibleData: TData = {
    about_company: data.about_company,
    position: { value: data.position, label: data.position },
    industry: { value: data.industry, label: data.industry },
    description: data.description,
    skills: data.skills,
    salaryType: { value: data.salaryResponse.salaryType, label: data.salaryResponse.salaryType },
    salarySum: data.salaryResponse.salarySum as string,
    salaryCurrency: { value: data.salaryResponse.valute, label: data.salaryResponse.valute },
    employmentType: { value: data.typeOfEmploymentS, label: data.typeOfEmploymentS },
    experience: data.requiredExperience,
    country: { value: data.contactInformationResponse.country, label: data.contactInformationResponse.country },
    city: data.contactInformationResponse.city,
    street_house: data.contactInformationResponse.street_house,
    additionalInformation: data.additionalInformation
  }
  
  return formCompatibleData
}

