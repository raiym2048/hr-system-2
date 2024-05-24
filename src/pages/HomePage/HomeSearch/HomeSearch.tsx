import cls from './HomeSearch.module.scss'
import {classNames} from "../../../utils/lib/classNames/classNames";
import {useState} from "react";
import {AiOutlineSearch} from "react-icons/ai";
import Input from "../../../components/ui/Input/Input";
import {Button, ButtonTheme} from "../../../components/ui/Button/Button";
import {useAppDispatch} from "../../../redux/store/store";
import {fetchJobSeekerVacancySearch} from "../../JobSeekerVacancyPage/servies/fetchJobSeekerVacancy";
import {useNavigate} from "react-router-dom";


interface HomeSearchProps {
    className?: string;
}

const HomeSearch = ({className}: HomeSearchProps) => {
    const position: string[] = [
        "Автомобильный бизнес",
        "Административный персонал",
        "Безопасность",
        "Высший и средний менеджмент",
        "Добыча сырья",
        "Домашний, обслуживающий персонал",
        "Закупки",
        "Информационные технологии",
        "Искусство, развлечения, массмедиа",
        "Маркетинг, реклама, PR",
        "Медицина, фармацевтика",
        "Наука, образование",
        "Продажи, обслуживание клиентов",
        "Производство, сервисное обслуживание",
        "Рабочий персонал",
        "Розничная торговля",
        "Сельское хозяйство",
        "Спортивные клубы, фитнес, салоны красоты",
        "Стратегия, инвестиции, консалтинг",
        "Страхование",
        "Строительство, недвижимость",
        "Транспорт, логистика, перевозки",
        "Туризм, гостиницы, рестораны",
        "Управление персоналом, тренинги",
        "Финансы, бухгалтерия",
        "Юристы",
        "Другое",
    ]

    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const handleInputChange = (value: string) => {
        setInputValue(value);
        if (inputValue.length >= 2) {
            const filteredAndSortedSuggestions: string[] = position
                .filter((item) =>
                    item.toLowerCase().includes(inputValue.toLowerCase())
                )
                .sort();

            setSuggestions(filteredAndSortedSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const serchVacancy = () => {
        dispatch(fetchJobSeekerVacancySearch(inputValue)).then(()=>{
            navigate('vacancies')
        })
    }

    console.log(inputValue)
    const handleSuggestionClick = (suggestion: string) => {
        setInputValue(suggestion);
        setSuggestions([]);
    };
    return (
        <>
            <div className={classNames(cls.mainSearch, {}, [className])}>
                <div className={cls.mainSearchIcon}>
                    <AiOutlineSearch/>
                    <Input
                        placeholder={'Какую работу ищете?'}
                        className={cls.mainInput}
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </div>
                <Button
                    theme={ButtonTheme.BLUE_BTN}
                    className={cls.btn}
                    onClick={serchVacancy}
                >
                    Поиск
                </Button>
            </div>
            <div className={cls.output_search}>
                {suggestions.length > 0 && (
                    <ul>
                        {suggestions
                            .slice(0, 4)
                            .map((suggestion, index) => (
                                <div  key={index} className={cls.output_search__result}>
                                    <AiOutlineSearch/>
                                    <li

                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion}
                                    </li>
                                </div>

                            ))}
                    </ul>
                )}
            </div>

        </>
    );
};

export default HomeSearch;
