import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { ErrorComponent } from '../components/ErrorComponent'
import { HandleEmployer } from '../pages/employer/handleEmployer'
import LoginPage from '../pages/auth/loginPage/LoginPage'
import ForgotPasswordPage from '../pages/auth/forgotPasswordPage/ForgotPasswordPage'
import CreatePassword from '../pages/auth/сreatePassword/CreatePassword'
import ChoiceUser from '../pages/auth/choiceUser/ChoiceUser'
import ConfirmationCode from '../pages/auth/confirmationCode/ConfirmationCode'
import { VacancyId } from '../pages/employer/vacancyId'
import { VacancyForm } from '../pages/employer/vacancyForm'
import HomePage from '../pages/HomePage/HomePage'
import Account from '../pages/account/account'
// import Chat from '../pages/chat/chat'
import HandleApplicant from '../pages/applicant/handleApplicant'
import ApplicantProfile from '../pages/applicant/ApplicantProfile'
import ApplicantProfileEdit from '../pages/applicant/ApplicantProfileEdit/ApplicantProfileEdit'
import { EmployerProfile } from '../pages/employer/employerProfile'
import { EmployerProfileEdit } from '../pages/employer/employerProfileEdit'
import Registration from '../pages/auth/registrationPage/Registration'
import ApplicantId from '../pages/applicant/ApplicantProfileEdit/ApplicantId'
import JobSeekerVacancyPage from '../pages/JobSeekerVacancyPage/ui/JobSeekerVacancy/JobSeekerVacancyPage/JobSeekerVacancyPage'
import VacancyDetailsAsApplicant from '../pages/applicant/VacancyDetailsAsApplicant/VacancyDetailsAsApplicant'
import ApplicantDetailsAsEmployer from '../pages/employer/ApplicantDetailsAsEmployer'
import Admin from '../pages/Admin/Admin'
import AdminUser from '../pages/Admin/AdminUser/AdminUser'
import AdminVacancy from '../pages/Admin/AdminVacancy/AdminVacancy'
import UserDetail from "../pages/Admin/AdminUser/UserDetail/UserDetail";
import AdminRequest from "../pages/Admin/AdminRequest/AdminRequest";
import CandidatePage from '../pages/СandidatePage/ui/СandidatePage/СandidatePage'
import ApplicantRespondingVacancy from "../pages/applicant/ApplicantRespondingVacancy/ApplicantRespondingVacancy";
import ResponseCandidate from "../pages/employer/ResponseCandidate/ResponseCandidate";
import EmployersVacancies from "../pages/employer/EmployersVacancies/EmployersVacancies";
import Chat from '../pages/chat/chat.tsx'



    export const router = createBrowserRouter([
  {
    path: '/',
    element: <App errorOutlet={undefined} />,
    errorElement: <App errorOutlet={<ErrorComponent />} />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'registration',
        element: <Registration />,
      },
      {
        path: 'forgotPassword',
        element: <ForgotPasswordPage />,
      },
      {
        path: 'createPassword',
        element: <CreatePassword />,
      },
      {
        path: 'choice',
        element: <ChoiceUser />,
      },
      {
        path: 'confirmationCode',
        element: <ConfirmationCode />,
      },
      {
        path: 'vacancies',
        element: <JobSeekerVacancyPage />,
      },
      {
        path: 'vacancy/:vacancyId',
        element: <VacancyDetailsAsApplicant />,
      },
      {
        path: '',
        element: <HandleEmployer />,
        children: [
          {
            path: 'employer',
            element: <EmployerProfile />,
            handle: { navigationMenuParams: { role: 'employer', chosenItem: 0 } }, // for NavigationMenu
          },
          {
            path: 'employer/account',
            element: <Account />,
          },
          {
            path: 'employer/edit',
            element: <EmployerProfileEdit />,
            handle: { navigationMenuParams: { role: 'employer', chosenItem: 0 } }, // for NavigationMenu
          },
          {
            path: 'employer/vacancy/form',
            element: <VacancyForm />,
            handle: { navigationMenuParams: { role: 'employer', chosenItem: 0 } }, // for NavigationMenu
          },
          {
            path: 'employer/vacancy/edit/:vacancyId',
            element: <VacancyForm />,
          },
          {
            path: 'employer/vacancy/:vacancyId',
            element: <VacancyId />,
            handle: { navigationMenuParams: { role: 'employer', chosenItem: 0 } }, // for NavigationMenu
          },
          {
            path: 'employer/applicant/:applicantId',
            element: <ApplicantDetailsAsEmployer />,
            handle: { navigationMenuParams: { role: 'employer', chosenItem: 1 } }, // for NavigationMenu
          },
          {
            path: 'employer/vacancies',
            element: <EmployersVacancies />,
            handle: { navigationMenuParams: { role: 'employer', chosenItem: 1 } }, // for NavigationMenu
          },
          {
            path: 'employer/candidates',
            element: <CandidatePage />,
            handle: { navigationMenuParams: { role: 'employer', chosenItem: 2 } }, // for NavigationMenu
          },
          {
            path: 'employer/response/candidate/:responseCandidateId',
            element: <ResponseCandidate />,
            handle: { navigationMenuParams: { role: 'employer', chosenItem: 0 } }, // for NavigationMenu
          },
          {
            path: 'employer/chat',
            element: <Chat />,
            handle: { navigationMenuParams: { role: 'employer', chosenItem: 0 } }, // for NavigationMenu
          },
          {
            path: 'employer/chat/with/:partnerId',
            element: <Chat />,
            handle: { navigationMenuParams: { role: 'employer', chosenItem: 0 } }, // for NavigationMenu
          },
        ],
      },
      {
        path: '',
        element: <HandleApplicant />,
        children: [
          {
            path: 'applicant',
            element: <ApplicantProfile />,
          },
          {
            path: 'applicant/account',
            element: <Account />,
          },
          // {
          //   path: 'applicant/chat',
          //   element: <Chat />,
          // },
          {
            path: 'applicant/edit',
            element: <ApplicantProfileEdit />,
          },
          {
            path: 'applicant/vacancies',
            element: <JobSeekerVacancyPage />,
            handle: { navigationMenuParams: { role: 'applicant', chosenItem: 1 } },
          },
          {
            path: 'applicant/response',
            element: <ApplicantRespondingVacancy/>,
            handle: { navigationMenuParams: { role: 'applicant', chosenItem: 2 } },
          },
          {
            path: 'applicant/vacancy/:vacancyId',
            element: <VacancyDetailsAsApplicant />,
          },
          {
            path: 'applicant/:id',
            element: <ApplicantId />,
          },
        ],
      },
      {
        path: '',
        element: <Admin />,
        children: [
          {
            path: 'admin/user',
            element: <AdminUser/>,
          },
          {
            path: 'admin/vacancy',
            element: <AdminVacancy/>,
          },
          {
            path: "admin/request",
            element: <AdminRequest/>,
          },
          {
            path: "user/detail/:userById",
            element: <UserDetail/>
          }
        ],
      }
    ],
  },
])
