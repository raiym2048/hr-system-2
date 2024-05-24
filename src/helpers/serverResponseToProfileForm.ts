import dayjs from "dayjs"
import { TEducationResponse, TProfessionResponse, TProfile } from "../pages/applicant/ApplicantProfileEdit/ApplicantId"
import monthNumberToName from "./monthNumberToName"

const serverResponseToProfileForm = (data: TProfile) => {
  const educationRequestsConverter = (item: TEducationResponse) => {
    return {
      education: {value: item.education, label: item.education},
      university: item.university,
      endMonth: {value: item.endMonth, label: monthNumberToName(Number(item.endMonth))},
      endYear: {value: item.endYear, label: item.endYear},
      studying: item.studying,
    }
  }
  const professionResponseConverter = (item: TProfessionResponse) => {
    return {
      position: {value: item.position, label: item.position},
      companyName: item.companyName,
      startedMonth: {value: item.startedMonth, label: monthNumberToName(Number(item.startedMonth))},
      startedYear: {value: item.startedYear, label: item.startedYear},
      endMonth: {value: item.endMonth, label: monthNumberToName(Number(item.endMonth))},
      endYear: {value: item.endYear, label: item.endYear},
      skills: item.skills,
    }
  }
  const newObj = {
    firstname: data.firstname,
    lastname: data.lastname,
    birthday: dayjs(data.birthday),
    country: {label: data.country, value: data.country},
    city: data.city,
    address: data.address,
    phoneNumber: data.phoneNumber,
    about: data.about,
    educationRequests: data.educationResponse.map(item => educationRequestsConverter(item)),
    professionRequests: data.professionResponse.map(item => professionResponseConverter(item)),
    position: data.position,
    // graduationDate: Date,
  }
  return newObj
}
export default serverResponseToProfileForm