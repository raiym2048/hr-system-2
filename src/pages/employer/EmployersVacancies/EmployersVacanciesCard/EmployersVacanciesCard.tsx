import cls from './EmployersVacanciesCard.module.scss'
import {classNames} from "../../../../utils/lib/classNames/classNames";
import {Text, TextStyle} from "../../../../components/ui/Text/Text";
import {Button, ButtonTheme} from "../../../../components/ui/Button/Button";
import {PiDotsThreeOutlineFill} from 'react-icons/pi'
import {RiAccountCircleFill} from 'react-icons/ri'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Loader from "../../../../components/ui/Loader/Loader";
import {IEmployerVacancy} from "../../../../redux/slice/employerApi/type/type";
import {
    useDeleteVacancyMutation,
    useUpdateVacancyStatusMutation
} from "../../../../redux/slice/employerApi/employerVacancyApi/employerVacancyApi.ts";

interface EmployersVacanciesCardProps {
    className?: string;
    isLoader?: boolean;
    myVacancy: IEmployerVacancy[] | undefined
}

const EmployersVacanciesCard = ({className, isLoader, myVacancy}: EmployersVacanciesCardProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [chosenId, setChosenId] = useState<number>(0)
    const [mutate] = useUpdateVacancyStatusMutation()
    const [deleteVacancy]=useDeleteVacancyMutation()

    const navigate = useNavigate()

    const status = [
        {name: 'open', rusName: 'Открыто'},
        {name: 'archive', rusName: 'В архиве'},
        {name: 'closed', rusName: 'Закрыто'},
    ]


    function getStatusButtonClassName(status: string) {
        switch (status) {
            case 'Открыто':
                return cls.green__btn;
            case 'Закрыто':
                return cls.red__btn;
            default:
                return cls.gray__btn;
        }
    }

    const clickStatus = (id: number) => {
        setIsModalVisible(true)
        setChosenId((prev) => {
            return prev ? 0 : id
        })
    }


    const clickNewStatus = async (item: string) => {
        await mutate({newStatus: item, chosenId: chosenId})
            .then(()=>{
                setIsModalVisible(false)
                setChosenId(0)
            })
    }

        const deletevacancyId = async (vacancyId: number) => {
            await deleteVacancy(vacancyId)
        }
        const clickEdit = (id: number) => {
            navigate(`/employer/vacancy/edit/${id}`)
        }
        if (isLoader) {
            return <Loader size={"large"}/>
        }
        return (
            <>
                {
                    myVacancy && myVacancy.map((item) => {
                        return (
                            <div key={item.id} className={classNames(cls.EmployersVacanciesCard, {}, [className])}>
                                <Text
                                    text={'позиция'}
                                    title={`${item.position}`}
                                    style={TextStyle.TEXT_JOB_SEEKER_VACANCY}
                                    width={250}
                                />

                                <Text
                                    text={'Вид Занятости'}
                                    title={`${item.typeOfEmploymentS}`}
                                    style={TextStyle.TEXT_JOB_SEEKER_VACANCY}
                                    width={230}
                                />
                                <Text
                                    text={'Оклад'}
                                    title={`${item.salaryResponse?.salarySum}`}
                                    style={TextStyle.TEXT_JOB_SEEKER_VACANCY}
                                    width={100}
                                />
                                <Text
                                    text={'опыт работы'}
                                    title={`${item.requiredExperience}`}
                                    style={TextStyle.TEXT_JOB_SEEKER_VACANCY}
                                    width={150}
                                />

                                <div
                                    onClick={() => navigate(`/employer/response/candidate/${encodeURIComponent(JSON.stringify({id:item.id,position:item.position}))}`)}
                                    className={cls.response}>
                                    <Text
                                        text={'Отклики'}
                                        style={TextStyle.TEXT_JOB_SEEKER_VACANCY}
                                    />
                                    <Button
                                        theme={ButtonTheme.CLEAR}
                                        className={cls.response_btn}
                                    >
                                        <span className={cls.response_btn__icon}><RiAccountCircleFill/></span>
                                        <span>{`${item.respondedCount}`}</span>
                                    </Button>
                                </div>
                                <Text
                                    text={'Создано'}
                                    title={`${item.creationDate}`}
                                    style={TextStyle.TEXT_JOB_SEEKER_VACANCY}
                                    width={140}
                                />

                                <div style={{width: '130px'}}>
                                    <Text
                                        text={'статус'}
                                        style={TextStyle.TEXT_JOB_SEEKER_VACANCY}
                                    />
                                    <Button
                                        theme={ButtonTheme.CLEAR}
                                        className={getStatusButtonClassName(item.statusOfVacancy)}
                                    >
                                        {item.statusOfVacancy}
                                    </Button>
                                </div>

                                <div onClick={() => clickStatus(item.id)}
                                     className={cls.three_outline}>
                                    <PiDotsThreeOutlineFill
                                        className={cls.three_outline__icon}
                                    />

                                    {chosenId === item.id && isModalVisible ? (
                                        <div key={item.id} className={cls.modal}>
                                            <div className={cls.modalContent}>
                                                <div
                                                    onClick={() => clickEdit(item.id)}
                                                    className={cls.modalOption}
                                                >
                                                    Редактировать
                                                </div>
                                                <div
                                                    onClick={()=>deletevacancyId(item.id)}
                                                    className={cls.modalOption}
                                                >
                                                    Удалить
                                                </div>
                                                {
                                                    status.map((statusItem) => (
                                                        item.statusOfVacancy !== statusItem.rusName ? (
                                                            <div key={statusItem.rusName}
                                                                 onClick={() => clickNewStatus(statusItem.name)}
                                                                 className={cls.modalOption}>
                                                                {statusItem.rusName}
                                                            </div>
                                                        ) : null
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        )
                    })
                }

            </>

        );
    };

    export default EmployersVacanciesCard;
