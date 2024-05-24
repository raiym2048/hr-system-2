import cls from './UserDetail.module.scss'
import {classNames} from "../../../../utils/lib/classNames/classNames";
import {Text, TextStyle} from "../../../../components/ui/Text/Text";
import {Avatar} from "../../../../components/ui/Avatar/Avatar";
import {Select} from "../../../../components/ui/Select/Select";
import {Button, ButtonTheme} from "../../../../components/ui/Button/Button";
import {MdBlock} from 'react-icons/md';
import {AiFillDelete} from "react-icons/ai";
import {HiLockOpen} from "react-icons/hi"
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../redux/store/store";
import {
    fetchAdminAllUserBlocked,
    fetchAdminDetail, fetchAdminSetRoleForUser,
    fetchAdminUserBlocked,
    fetchAdminUserDelete
} from "../../services/fetchAdminUser";
import {useEffect, useState} from "react";
import {IUserDetail} from "../../type/adminSchema";
import Loader from "../../../../components/ui/Loader/Loader";
import axios from "axios";
import {baseUrl} from "../../../../services/commonVariables";


interface UserDetailProps {
    className?: string;
}

export interface IUserInput {
    viewingCompanyData: boolean,
    viewingAndSearchingForVacancies: boolean,
    viewTheStatusOfResponded: boolean,
    communicationWithEmployers: boolean,
    viewingCandidateData: boolean,
    vacancyAndHiringManagement: boolean,
    communicationWithJobSeekers: boolean
}

const UserDetail = ({className}: UserDetailProps) => {
    const user_detail: IUserDetail | null = useAppSelector(state => state.admin.user_detail)
    const dispatch = useAppDispatch()
    const loading: boolean = useAppSelector(state => state.admin.isLoading)
    const {userById}= useParams<string>();

    const navigate = useNavigate()
    const [aBoolean, setABoolean] = useState<boolean>(false)
    const [role, setRole] = useState<string>('')
    const [request, setRequest] = useState<IUserInput>({
        viewingCompanyData: false,
        viewingAndSearchingForVacancies: false,
        viewTheStatusOfResponded: false,
        communicationWithEmployers: false,
        viewingCandidateData: false,
        vacancyAndHiringManagement: false,
        communicationWithJobSeekers: false
    })

    useEffect(() => {
        if (user_detail) {
            const obj = {
                viewingCompanyData: user_detail.viewingCompanyData,
                viewingAndSearchingForVacancies: user_detail.viewingAndSearchingForVacancies,
                viewTheStatusOfResponded: user_detail.viewTheStatusOfResponded,
                communicationWithEmployers: user_detail.communicationWithEmployers,
                viewingCandidateData: user_detail.viewingCandidateData,
                vacancyAndHiringManagement: user_detail.vacancyAndHiringManagement,
                communicationWithJobSeekers: user_detail.communicationWithJobSeekers,
            }
            setRequest(obj)
            setABoolean(user_detail.blocked)
        }
    }, [user_detail])

    const getValueInput = (blockedRequestBody: IUserInput) => {
        setRequest(blockedRequestBody)
        if (userById){
            dispatch(fetchAdminUserBlocked({userById, blockedRequestBody}))
        }
    }
    const getJobSeekerBlocked = (aBoolean: boolean) => {
        setABoolean(aBoolean)
        if (userById){
            dispatch(fetchAdminAllUserBlocked({userById, aBoolean}))
        }
    }

    useEffect(() => {
        if (userById){
            dispatch(fetchAdminDetail(userById))
        }
    }, [])

    const deleteUserJobSeeker = () => {
        if (userById){
            dispatch(fetchAdminUserDelete([+userById]))
                .then(() => {
                    navigate("/admin/user");
                })
                .catch((error) => {
                    console.error("Ошибка при удалении пользователя:", error);
                });
        }
    }


    const downloadResume = () => {
        axios
            .get(`${baseUrl}/file/download/file/${userById}`)
            .then((res) => {
                console.log(res.data)
                navigate(`/user/detail/${userById}`)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(()=>{
        if (role && user_detail && user_detail.role!=role && userById){
            dispatch(fetchAdminSetRoleForUser({userId:userById,role}))
        }
    },[role])
    //
    // const getUsers = () => {
    //     axios
    //         .get(`${baseUrl}/file/resume/${userById}`)
    //         .then((res) => {
    //             console.log(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };
    // useEffect(() => {
    //     getUsers();
    // }, []);
    //


    if (loading) {
        return <Loader size={"large"}/>
    }
    return (
        <>
            {user_detail &&
            <div className={classNames(cls.UserDetail, {}, [className])}>
                <div className={cls.detail_header}>
                    <Select
                        options={
                            [
                                {
                                    label: 'Соискатель',
                                    value: 'JOB_SEEKER'
                                },
                                {
                                    label: 'Работодатель',
                                    value: 'EMPLOYER'
                                }
                            ]
                        }
                        value={role}
                        onChange={(value: string) => setRole(value)}
                        className={cls.detail_header__select}
                        placeholder={`${user_detail.role == "JOB_SEEKER" ? 'Соискатель' : 'Работодатель'}`}
                    />
                    <Button
                        theme={ButtonTheme.SQUARE}
                        className={cls.detail_header__btn}
                        onClick={() => getJobSeekerBlocked(!aBoolean)}
                    >
                        {
                            aBoolean ? (<span>Разблокировать<HiLockOpen style={{marginLeft: '10px'}}
                                                                        color={'rgba(169, 171, 173, 1)'}/></span>) :
                                (<span>Блокировать<MdBlock style={{marginLeft: '10px'}}
                                                           color={'rgba(169, 171, 173, 1)'}/></span>)
                        }
                    </Button>
                    <Button
                        theme={ButtonTheme.SQUARE}
                        className={cls.detail_header__btn}
                        onClick={() => deleteUserJobSeeker()}
                    >
                        Удалить
                        <span>   <AiFillDelete style={{marginLeft: '10px'}} color={'rgba(222, 95, 95, 1)'}/></span>

                    </Button>
                </div>
                <div className={cls.user_detail}>
                    <div className={cls.user_detail__item}>
                        {
                            user_detail.role == "EMPLOYER" ?
                                <div className={cls.user_detail__avatar}>
                                    <Avatar
                                        src={`${user_detail.fileResponse?.path}`}
                                        alt={'icon'}
                                        size={80}
                                        className={cls.avatar_square}
                                    />
                                    <Text
                                        text={`${user_detail.companyName}`}
                                        title={`${user_detail.fileResponse?.type}`}
                                        style={TextStyle.CATEGORY_TEXT}
                                    />
                                </div> :
                                <>
                                    <div className={cls.user_detail__avatar}>
                                        <Avatar
                                            src={`${user_detail?.imageResponse?.path}`}
                                            alt={'icon'}
                                            size={80}
                                            className={cls.avatar_square}
                                        />
                                        <Text
                                            text={`${user_detail.firstname} ${user_detail.lastname}`}
                                            title={user_detail.professionResponse && user_detail.professionResponse[0]?.position}
                                            style={TextStyle.CATEGORY_TEXT}
                                        />
                                    </div>
                                    <hr className={cls.user_detail__line}/>
                                    <Text
                                        className={classNames(cls.text_uppercase, {}, [cls.colorText])}
                                        text={'cv'}
                                        title={`${user_detail?.resumeResponse?.name}`}
                                        onClick={()=>downloadResume()}
                                    />
                                    <hr className={cls.user_detail__line}/>
                                    <Text
                                        className={cls.text_uppercase}
                                        text={'дата рождения'}
                                        title={`${user_detail?.birthday}`}
                                    />
                                </>
                        }

                        <hr className={cls.user_detail__line}/>
                        <Text
                            className={cls.text_uppercase}
                            text={'страна'}
                            title={`${user_detail?.country}`}
                        />
                        <hr className={cls.user_detail__line}/>
                        <Text
                            className={cls.text_uppercase}
                            text={'город'}
                            title={`${user_detail?.city}`}
                        />
                        <hr className={cls.user_detail__line}/>
                        <Text
                            className={cls.text_uppercase}
                            text={'адрес'}
                            title={`${user_detail?.address}`}
                        />
                        <hr className={cls.user_detail__line}/>
                        <Text
                            className={cls.text_uppercase}
                            text={'электронная почта'}
                            title={`${user_detail?.email}`}
                        />
                        <hr className={cls.user_detail__line}/>
                        <Text
                            className={cls.text_uppercase}
                            text={'телефон'}
                            title={`${user_detail?.phoneNumber}`}
                        />


                    </div>

                    {/*2 COLUMP*/}

                    <div className={cls.user_detail__item}>
                        {
                            user_detail.role == "EMPLOYER" ?
                                <Text
                                    className={cls.text_uppercase}
                                    text={'О себе'}
                                    title={user_detail.aboutCompany}
                                />
                                :
                                <>
                                    <Text
                                        className={cls.text_uppercase}
                                        text={'О себе'}
                                        title={`${user_detail?.about}`}
                                    />
                                    <hr className={cls.user_detail__line}/>
                                    <Text
                                        className={cls.text_uppercase}
                                        text={'Образование'}
                                        title={user_detail?.educationResponse && user_detail.educationResponse[0]?.education}
                                    />
                                    <hr className={cls.user_detail__line}/>
                                    <Text
                                        className={cls.text_uppercase}
                                        text={'Учебное заведение'}
                                        title={user_detail?.educationResponse && user_detail.educationResponse[0]?.university}/>
                                    <hr className={cls.user_detail__line}/>
                                    <Text
                                        className={cls.text_uppercase}
                                        text={'Месяц и год окончания'}
                                        title={user_detail?.educationResponse && user_detail?.educationResponse[0]?.endMonth + ' ' + user_detail.educationResponse[0]?.endYear}
                                    />
                                    <hr className={cls.user_detail__line}/>
                                    <Text
                                        className={cls.text_uppercase}
                                        text={'Позиция'}
                                        title={user_detail?.professionResponse && user_detail?.professionResponse[0]?.position}
                                    />
                                    <hr className={cls.user_detail__line}/>
                                    <Text
                                        className={cls.text_uppercase}
                                        text={'Место работы'}
                                        title={user_detail?.professionResponse && user_detail.professionResponse[0]?.companyName}
                                    />
                                    <hr className={cls.user_detail__line}/>
                                    <Text
                                        className={cls.text_uppercase}
                                        text={'Период работы'}
                                        title={`${user_detail?.professionResponse && user_detail?.professionResponse[0]?.startedMonth} , ${user_detail?.professionResponse && user_detail?.professionResponse[0]?.startedYear} - ${user_detail?.professionResponse && user_detail?.professionResponse[0]?.endMonth} , ${user_detail?.professionResponse && user_detail?.professionResponse[0]?.endYear}`}
                                    />
                                </>
                        }
                    </div>

                    {/*3 COLUMP*/}

                    <div className={cls.user_detail__item}>
                        {
                            user_detail.role == "EMPLOYER" ? <>
                                    <h3 style={{marginBottom: '20px'}}>Права доступа</h3>
                                    <div className={cls.user_detail__access}>
                                        <p className={cls.access_text}>Просмотр данных о кандидатах</p>
                                        <input
                                            type={'checkbox'}
                                            onChange={() => getValueInput({
                                                ...request,
                                                viewingCandidateData: !request.viewingCandidateData
                                            })}
                                            checked={request.viewingCandidateData}
                                        />
                                    </div>
                                    <hr className={cls.user_detail__line}/>
                                    <p className={cls.access_description}>Разрешить просматривать информацию о
                                        сотрудниках, такую
                                        как
                                        персональные данные, контактные данные, историю занятости, информацию о зарплате
                                        и другую
                                        связанную информацию.</p>

                                    <div className={cls.user_detail__access}>
                                        <p className={cls.access_text}>Управление вакансиями и наймом</p>
                                        <input
                                            type={'checkbox'}
                                            onChange={() => getValueInput({
                                                ...request,
                                                vacancyAndHiringManagement: !request.vacancyAndHiringManagement
                                            })}
                                            checked={request.vacancyAndHiringManagement}
                                        />
                                    </div>

                                    <hr className={cls.user_detail__line}/>
                                    <p className={cls.access_description}>Возможность создавать вакансии и отслеживать
                                        процесс
                                        обработки
                                        заявок. Разрешение на редактирование деталей, включая информацию о должности,
                                        требованиях и
                                        обязонностях, сроках и т.д.</p>

                                    <div className={cls.user_detail__access}>
                                        <p className={cls.access_text}>Связь с соискателями</p>
                                        <input
                                            type={'checkbox'}
                                            onChange={() => getValueInput({
                                                ...request,
                                                communicationWithJobSeekers: !request.communicationWithJobSeekers
                                            })}
                                            checked={request.communicationWithJobSeekers}
                                        />
                                    </div>
                                    <hr className={cls.user_detail__line}/>
                                    <p className={cls.access_description}>Работадатели могут видеть статус своих
                                        отправленных заявок
                                        на
                                        вакансии через HR-платформу. Это позволяет им отслеживать, находится ли заявка в
                                        проце</p>


                                </>
                                : <>
                                    <h3 style={{marginBottom: '20px'}}>Права доступа</h3>
                                    <div className={cls.user_detail__access}>
                                        <p className={cls.access_text}>Просмотр данных о компаниях</p>
                                        <input
                                            type={'checkbox'}
                                            onChange={() => getValueInput({
                                                ...request,
                                                viewingCompanyData: !request.viewingCompanyData
                                            })}
                                            checked={request.viewingCompanyData}
                                        />
                                    </div>
                                    <hr className={cls.user_detail__line}/>
                                    <p className={cls.access_description}>Разрешить просматривать информацию о компаниях,
                                        такую как
                                        о
                                        компании, контактные данные, информацию о зарплате и другую связанную
                                        информацию.</p>

                                    <div className={cls.user_detail__access}>
                                        <p className={cls.access_text}>Просмотр и поиск вакансий</p>
                                        <input
                                            type={'checkbox'}
                                            onChange={() => getValueInput({
                                                ...request,
                                                viewingAndSearchingForVacancies: !request.viewingAndSearchingForVacancies
                                            })}
                                            checked={request.viewingAndSearchingForVacancies}
                                        />
                                    </div>

                                    <hr className={cls.user_detail__line}/>
                                    <p className={cls.access_description}>Соискатели могут получить доступ к списку
                                        вакансий,
                                        опубликованных в платформе, и осуществлять поиск по различным критериям, таким как
                                        должность,
                                        местоположение, требования и т. д.</p>

                                    <div className={cls.user_detail__access}>
                                        <p className={cls.access_text}>Отслеживание статуса заявок</p>
                                        <input
                                            type={'checkbox'}
                                            onChange={() => getValueInput({
                                                ...request,
                                                viewTheStatusOfResponded: !request.viewTheStatusOfResponded
                                            })}
                                            checked={request.viewTheStatusOfResponded}
                                        />
                                    </div>

                                    <hr className={cls.user_detail__line}/>
                                    <p className={cls.access_description}>Соискатели могут получить доступ к списку
                                        вакансий,
                                        опубликованных в платформе, и осуществлять поиск по различным критериям, таким как
                                        должность,
                                        местоположение, требования и т. д.</p>

                                    <div className={cls.user_detail__access}>
                                        <p className={cls.access_text}>Связь с работодателями</p>
                                        <input
                                            type={'checkbox'}
                                            onChange={() => getValueInput({
                                                ...request,
                                                communicationWithEmployers: !request.communicationWithEmployers
                                            })}
                                            checked={request.communicationWithEmployers}
                                        />
                                    </div>

                                    <hr className={cls.user_detail__line}/>
                                    <p className={cls.access_description}>Соискатели могут видеть статус своих отправленных
                                        заявок
                                        на
                                        вакансии через HR-платформу. Это позволяет им отслеживать, находится ли заявка в
                                        процессе
                                        рассмотрения, была ли она рассмотрена или отклонена.</p>
                                </>
                        }
                    </div>
                </div>
            </div>
            }
        </>
    );
};

export default UserDetail;
