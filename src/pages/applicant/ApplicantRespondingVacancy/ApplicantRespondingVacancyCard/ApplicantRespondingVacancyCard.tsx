import cls from './ApplicantRespondingVacancyCard.module.scss'
import {classNames} from "../../../../utils/lib/classNames/classNames";
import {Text} from "../../../../components/ui/Text/Text";
import {Button, ButtonTheme} from "../../../../components/ui/Button/Button";
import {Avatar} from "../../../../components/ui/Avatar/Avatar";
import {IRespondingVacancies} from "../../../../redux/slice/candidatesStatus";
import {useAppSelector} from "../../../../redux/store/store";
import Loader from "../../../../components/ui/Loader/Loader";
import {useNavigate} from "react-router-dom";


interface ApplicantRespondingVacancyCardProps {
    className?: string;
    respondingVacancy?: IRespondingVacancies[]
}

const ApplicantRespondingVacancyCard = ({className, respondingVacancy}: ApplicantRespondingVacancyCardProps) => {
    const isLoading = useAppSelector((state) => state.candidatesStatus.statusLoader)
    const navigate = useNavigate()
    const vacancyDetail = (id) => {
        navigate(`/applicant/vacancy/${id}`)
    }
    if (isLoading) {
        return <Loader size={"large"}/>
    }



    function getStatusButtonClassName(status) {
        switch (status) {
            case 'отправлено':
                return cls.gray__btn;
            case 'принято':
                return cls.green__btn;
            case 'отклонено':
                return cls.red__btn;
            case 'рассматривается':
                return cls.blue__btn;
            case 'собеседование':
                return cls.yello_green__btn;
            default:
                return cls.yellow__btn;
        }
    }

    return (
        <>
            {
                respondingVacancy && respondingVacancy.map((item) => {
                    return (
                        <div onClick={() => vacancyDetail(item.vacancyId)} key={item.vacancyId}
                             className={classNames(cls.ApplicantRespondingVacancyCard, {}, [className])}>
                            <Avatar
                                src={`${item.image?.path}`}
                                size={80}
                                alt={`icon`}
                            />
                            <div className={cls.responding_items}>
                                <Text
                                    text={'компания'}
                                    title={`${item.companyName}`}
                                    className={cls.responding_items__child}
                                />
                                <Text
                                    text={'позиция'}
                                    title={`${item.position}`}
                                    className={cls.responding_items__child}
                                />
                                <Text
                                    text={'отрасль'}
                                    title={`${item.category}`}
                                    className={cls.responding_items__child}
                                />
                                <Text
                                    text={'Дата заявки'}
                                    title={`${item.applicationDate}`}
                                    className={cls.responding_items__child}
                                />
                                <div className={cls.responding_items__child}>
                                    <Text
                                        text={'статус'}
                                    />
                                    <Button
                                        theme={ButtonTheme.CLEAR_BTN}
                                        className={getStatusButtonClassName(item.statusOfJobSeeker)}
                                    >
                                        {`${item.statusOfJobSeeker}`}
                                    </Button>
                                </div>

                            </div>


                        </div>
                    )
                })
            }
        </>

    );
};

export default ApplicantRespondingVacancyCard;
