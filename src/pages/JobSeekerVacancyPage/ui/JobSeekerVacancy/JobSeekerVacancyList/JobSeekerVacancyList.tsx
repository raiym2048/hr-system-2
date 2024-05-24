import {classNames} from '../../../../../utils/lib/classNames/classNames'
import cls from './JobSeekerVacancyList.module.scss'
import {Avatar} from '../../../../../components/ui/Avatar/Avatar'
import {IVacancues} from '../../../type/jobSeekerVacansySchema'
import {Text, TextStyle} from '../../../../../components/ui/Text/Text'
import {CiLocationOn} from 'react-icons/ci'
import {MdWorkOutline} from 'react-icons/md'
import {useNavigate} from 'react-router-dom'

interface JobSeekerVacancyListProps {
    className?: string
    vacancy?: IVacancues
}

const JobSeekerVacancyList = (props: JobSeekerVacancyListProps) => {
    const {className, vacancy} = props
    const navigate = useNavigate()
    const vacancyDetail = () => {
        navigate(`/applicant/vacancy/${vacancy?.id}`)
    }

    const position =
        vacancy?.vacancyResponse?.position &&
        vacancy?.vacancyResponse?.position?.length > 25 &&
        vacancy?.vacancyResponse?.position ? vacancy?.vacancyResponse?.position.slice(0, 25) + "..." :
        vacancy?.vacancyResponse?.position

    return (
        <div
            className={classNames(cls.JobSeekerVacancyList, {}, [className || ''])}
            onClick={vacancyDetail}
        >
            <Avatar
                src={vacancy?.vacancyResponse?.image?.path}
                size={80}
                className={cls.vacancy_list__avatar}
                alt={'icon'}
            />

            <div className={cls.vacancy_list__item}>
                <div className={cls.vacancy_list__text}>
                    <Text
                        text={'компания'}
                        title={`${vacancy?.ownerName}`}
                        style={TextStyle.TEXT_JOB_SEEKER_VACANCY}
                    />
                    <div className={cls.vacancy_list__child}>
            <span>
              <CiLocationOn/>
            </span>
                        <Text
                            text={`${vacancy?.vacancyResponse?.country}, ${vacancy?.vacancyResponse?.city}`}
                            className={cls.text}
                        />
                    </div>
                </div>

                <div className={cls.vacancy_list__text}>
                    <Text
                        text={'Позиция'}
                        title={`${position}`}
                        style={TextStyle.TEXT_JOB_SEEKER_VACANCY}
                    />
                    <div className={cls.vacancy_list__child}>
            <span>
              <MdWorkOutline/>
            </span>
                        <Text text={vacancy?.vacancyResponse.industry} className={cls.text}/>
                    </div>
                </div>

                <div className={cls.vacancy_list__text}>
                    <Text
                        text={'оклад'}
                        title={`${vacancy?.vacancyResponse?.salaryResponse?.salarySum} ${vacancy?.vacancyResponse?.salaryResponse.valute}`}
                        style={TextStyle.TEXT_JOB_SEEKER_VACANCY}
                    />
                    <div className={cls.vacancy_list__child}>
            <span>
              <MdWorkOutline/>
            </span>
                        <Text text={vacancy?.vacancyResponse.typeOfEmploymentS} className={cls.text}/>
                    </div>
                </div>

                <Text
                    text={'Опыт работы'}
                    title={vacancy?.vacancyResponse?.requiredExperience}
                    style={TextStyle.TEXT_JOB_SEEKER_VACANCY}
                    className={cls.vacancy_list__text}
                />
            </div>
        </div>
    )
}

export default JobSeekerVacancyList
