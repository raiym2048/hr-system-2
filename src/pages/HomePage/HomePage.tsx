import {classNames} from '../../utils/lib/classNames/classNames'
import cls from './HomePage.module.scss'
import mainPuc from '../../utils/assets/Main-pucture.png'
import applicant from '../../utils/assets/applicant.png'
import {IoIosArrowForward} from "react-icons/io"
import employee from "../../utils/assets/employee.png";
import PopularPosition from "./PopularPosition/PopularPosition";
import {Text, TextStyle} from "../../components/ui/Text/Text";
import {Button, ButtonTheme} from "../../components/ui/Button/Button";
import Footer from "../../components/layout/Footer/Footer";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from '../../redux/store/store'
import {getPopularPositions} from '../../redux/slice/employerSlice'
import HomeVacancy from './HomeVacancy/HomeVacancy'
import HomeSearch from "./HomeSearch/HomeSearch";
import PopularCategory from "./PopularCategory/PopularCategory";
import {baseUrl} from "../../services/commonVariables";
import {
    fetchJobSeekerVacancySearch
} from "../JobSeekerVacancyPage/servies/fetchJobSeekerVacancy";
import {useNavigate} from "react-router-dom";

export interface IPopularPosition {
    categoryName: string,
    counterVacancy: number
}


interface homePageProps {
    className?: string;
}

const HomePage = ({className}: homePageProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {vacancy_list} = useAppSelector(state => state.vacancyJobSeeker)
    useEffect(() => {
        dispatch(getPopularPositions())
    }, [])

    const [date, setDate] = useState<IPopularPosition[]>([]);

    useEffect(() => {
        (
            async function () {
                try {
                    const response = await fetch(`${baseUrl}/main/get/list/popular/position`);
                    const data = await response.json();
                    setDate(data)
                } catch (error) {
                    console.error(error);
                }
            }()
        )
        dispatch(fetchJobSeekerVacancySearch(''));
    }, [])

    return (
        <section className={cls.main}>
            <div className={'container'}>
                <div className={classNames(cls.HomePage, {}, [className || ''])}>
                    <div className={cls.main_title}>
                        <h1 className={cls.big_text}>Поиск работы по всему Кыргызстану</h1>
                        <HomeSearch/>
                        <PopularPosition date={date}/>
                    </div>
                    <div className={cls.main_pucture}>
                        <img src={mainPuc} alt={'image'}/>
                    </div>
                </div>

                <div className={cls.job_category}>
                    <Text
                        text={'Последние вакансии'}
                        title={'Найдите работу, которая соответствует вашим требованиям'}
                        style={TextStyle.MAIN_TITLE}
                    />
                    <HomeVacancy date={vacancy_list}/>

                    <div className={cls.btn_vacancy}>
                        <Button
                            theme={ButtonTheme.BLUE_BTN}
                            className={cls.btn}
                            onClick={() => navigate('vacancies')}
                        >
                            Посмотреть все вакансии
                            <div className={cls.arroy}><IoIosArrowForward/></div>
                        </Button>
                    </div>
                </div>
            </div>


            <div className={cls.section_category}>
                <div className={'container'}>
                    <PopularCategory date={date}/>
                </div>
            </div>


            <div className={cls.section_card}>
                <div className={"container"}>
                    <div className={cls.card}>
                        <div className={cls.col_6}>
                            <div className={classNames(cls.pucture, {}, [cls.firstPuctire])}>
                                <div className={cls.title}>
                                    <h4>Работодатель</h4>
                                    <p>
                                        Ищете в свою команду <br/> новых людей?
                                    </p>
                                    <Button theme={ButtonTheme.GRAY_BTN}>
                                        Зарегистрироваться
                                    </Button>
                                </div>
                                <div className={cls.employee}>
                                    <img src={employee}/>
                                </div>
                            </div>
                        </div>
                        <div className={cls.col_6}>
                            <div className={classNames(cls.pucture, {}, [cls.secondPuctire])}>
                                <div className={cls.title}>
                                    <h4>Работодатель</h4>
                                    <p>
                                        Ищете в свою команду <br/> новых людей?
                                    </p>
                                    <Button theme={ButtonTheme.GRAY_BTN}>
                                        Зарегистрироваться
                                    </Button>
                                </div>

                                <div className={cls.applicant}>
                                    <img src={applicant}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id={"footer"}>
                <Footer/>
            </div>

        </section>
    );
};

export default HomePage
