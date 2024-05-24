export interface IAdminUser {
    userId: number,
    userName: string,
    userRole: string,
    userEmail: string,
    lastVisit: string
}

export interface IAdminVacancy{
    vacancyId: number,
    companyName: string,
    position: string,
    applicationDate: string

}

interface ImageResponse {
    id: number;
    name: string;
    type: string;
    fileData: string[];
    jobSeekerId: number;
    path: string;
}

interface ResumeResponse {
    id: number;
    name: string;
    type: string;
    fileData: string[];
    jobSeekerId: number;
    path: string;
}

interface EducationResponse {
    id: number;
    education: string;
    university: string;
    endMonth: string;
    endYear: string;
    studying: boolean;
}

interface ProfessionResponse {
    id: number;
    position: string;
    companyName: string;
    startedMonth: string;
    startedYear: string;
    endMonth: string;
    endYear: string;
    skills: string;
    workingNow: boolean;
}
interface FileResponse {
    id: number;
    name: string;
    type: string | null;
    fileData: string;
    jobSeekerId: number | null;
    path: string;
}

export interface IUserDetail {
    id: number;
    imageResponse: ImageResponse;
    firstname: string;
    lastname: string;
    about: string;
    companyName: string;
    aboutCompany: string;
    resumeResponse: ResumeResponse;
    birthday: string;
    country: string;
    city: string;
    address: string;
    email: string;
    phoneNumber: string;
    role: string;
    statusOfJobSeeker: string;
    educationResponse: EducationResponse[];
    professionResponse: ProfessionResponse[];
    fileResponse: FileResponse;
    viewingCompanyData: boolean,
    viewingAndSearchingForVacancies: boolean,
    viewTheStatusOfResponded: boolean,
    communicationWithEmployers: boolean,
    viewingCandidateData: boolean,
    vacancyAndHiringManagement: boolean,
    communicationWithJobSeekers: boolean,
    blocked: boolean,
    online: boolean;
}
export interface IAdminSupport{
    id: number,
    personName: string,
    personEmail: string,
    personPhoneNumber: number,
    massage: string,
    dateSent: string
}

export interface AdminUserState {
    admin_user: IAdminUser[],
    user_detail:IUserDetail | null,
    admin_vacancy:IAdminVacancy[],
    adminSupport:IAdminSupport[],
    selectedUserIds:number[],
    allVacancyIds:number[],
    isLoading: boolean,
    error: string,
}
