// import registerService from "../../services/registration"
import { useMatches, Link } from 'react-router-dom'

type TNavigationMenuParams = {
  role: 'employer' | 'applicant'
  chosenItem: number
}

const NavigationMenu = () => {
  const matches = useMatches()
  const match = matches.filter((match) => match.handle).map((match) => match.handle)[0]

  if (match && typeof match === 'object' && 'navigationMenuParams' in match) {
    const params = match.navigationMenuParams as TNavigationMenuParams
    const isEmployer = params.role === 'employer'

    const optionOne = isEmployer ? 'Мои вакансии' : 'Вакансии'
    const optionTwo = isEmployer ? 'Кандидаты' : 'Мои отклики'

    const linkOne = isEmployer ? 'employer/vacancies' : 'applicant/vacancies'
    const linkTwo = isEmployer ? 'employer/candidates' : 'applicant/response'

    return (
      <div className="navigationMenu__container">
        <div className="navigationMenu">
          <div className="navigationMenu__innerFrame">
            <div className="navigationMenu__circle"></div>
            <Link
              to={linkOne}
              className={`navigationMenu__menuItem ${
                params.chosenItem === 1 && 'navigationMenu__menuItem--active'
              }`}
            >
              {optionOne}
            </Link>
            <Link
              to={linkTwo}
              className={`navigationMenu__menuItem ${
                params.chosenItem === 2 && 'navigationMenu__menuItem--active'
              }`}
            >
              {optionTwo}
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
export default NavigationMenu
