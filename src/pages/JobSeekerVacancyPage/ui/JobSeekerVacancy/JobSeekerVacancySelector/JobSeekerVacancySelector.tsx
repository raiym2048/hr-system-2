import {classNames} from "../../../../../utils/lib/classNames/classNames";
import cls from './JobSeekerVacancySelector.module.scss'
import {Text} from "../../../../../components/ui/Text/Text";
import {AiOutlineSearch} from "react-icons/ai";
import Input from "../../../../../components/ui/Input/Input";
import {Select} from "../../../../../components/ui/Select/Select";
import {Button, ButtonTheme} from "../../../../../components/ui/Button/Button";
import {useEffect, useState} from "react";
import {getCategory, getEmploymentType, getExperience, getPositions,} from "../../../../../redux/slice/employerSlice";
import {getCountries} from "../../../../../redux/slice/countrySlice";
import {useAppDispatch, useAppSelector} from "../../../../../redux/store/store";
import Checkbox from "../../../../../components/ui/Checkbox/Checkbox";
import {
    fetchJobSeekerVacancyFilter,
    fetchJobSeekerVacancySearch
} from "../../../servies/fetchJobSeekerVacancy";
import {useDebounce} from "usehooks-ts";
import {options} from "../../../../../app/api/CityData/city";


interface JobSeekerVacancySelectorProps {
    className?: string;
}
export interface ISelector{
    category:string,
    position:string,
    country:string,
    city:string,
    typeOfEmployments:string,
    experience:string,
    salary:boolean | null,
    date:boolean | null,
}

const JobSeekerVacancySelector = ({className}: JobSeekerVacancySelectorProps) => {
    const dispatch = useAppDispatch()
    const [inputValue, setInputValue] = useState('');
    const [categoryvalue, setCategoryValue] = useState('');
    const [position, setPosition] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [typeOfEmployments, setEmployment] = useState('')
    const [experience, setExperience] = useState('');
    const [isCheckedSalaryFirst, setIsCheckedSalaryFirst] = useState<boolean>(false);
    const [isCheckedSalarySecond, setIsCheckedSalarySecond] = useState<boolean>(false);
    const [isCheckedDateFirst, setIsCheckedDateFirst] = useState<boolean>(false);
    const [isCheckedDateSecond, setIsCheckedDateSecond] = useState<boolean>(false);
    const [salary, setSalary] = useState<null | boolean>(null)
    const [date, setDate] = useState<null | boolean>(null)
    const resetFilter = () => {
        setInputValue('')
        setCategoryValue('')
        setPosition('')
        setCountry('')
        setCity('')
        setEmployment('')
        setExperience('')
        setIsCheckedSalaryFirst(false)
        setIsCheckedSalarySecond(false)
        setIsCheckedDateFirst(false)
        setIsCheckedDateSecond(false)
        setSalary(null)
        setDate(null)
    }

    const handleCheckboxChangeSalaryFirst = (newState: boolean) => {
        setIsCheckedSalaryFirst(newState);
        if (newState) {
            setIsCheckedSalarySecond(false);
            setSalary(true)
        } else if (!newState && !isCheckedSalarySecond) {
            setSalary(null);
        }
    };

    const handleCheckboxChangeSalarySecond = (newState: boolean) => {
        setIsCheckedSalarySecond(newState);
        if (newState) {
            setIsCheckedSalaryFirst(false);
            setSalary(false)
        } else if (!newState && !isCheckedSalaryFirst) {
            setSalary(null);
        }
    };

    const handleCheckboxChangeDateFirst = (newState: boolean) => {
        setIsCheckedDateFirst(newState);
        if (newState) {
            setIsCheckedDateSecond(false);
            setDate(true)
        } else if (!newState && !isCheckedDateSecond) {
            setDate(null);
        }
    };

    const handleCheckboxChangeDateSecond = (newState: boolean) => {
        setIsCheckedDateSecond(newState);
        if (newState) {
            setIsCheckedDateFirst(false);
            setDate(false)
        } else if (!newState && !isCheckedDateFirst) {
            setDate(null);
        }
    };


    const {positions, experiences, category} = useAppSelector(state => state.employer)
    const {countries} = useAppSelector(state => state.countries)
    useEffect(() => {
        dispatch(getPositions())
        dispatch(getCountries())
        dispatch(getExperience())
        dispatch(getCategory())
        dispatch(getEmploymentType())
    }, [dispatch])

    const debouncedValue = useDebounce<string>(inputValue, 500)

    const filter:Record<string, string> = {
        category:categoryvalue,
        position,
        country,
        city,
        typeOfEmployments,
        experience,
    };
    if (salary!==null){
        filter.salary=salary.toString()
    }
    if (date!==null){
        filter.date=date.toString()
    }
    useEffect(() => {
        const hasFilterValues = Object.values(filter).some((value) => value !== '');
        if (hasFilterValues) {
            dispatch(fetchJobSeekerVacancyFilter(filter));
        } else {
            dispatch(fetchJobSeekerVacancySearch(inputValue));
        }
    }, [categoryvalue, position, country, city, typeOfEmployments, experience, salary, date]);

    useEffect(() => {
            dispatch(fetchJobSeekerVacancySearch(inputValue))
    }, [debouncedValue])

    return (
        <div className={classNames(cls.JobSeekerVacancySelector, {}, [className || ''])}>
            <div className={cls.candidate_selector__box}>
                <Text
                    text={'Поиск вакансий'}
                    className={cls.candidate_text}
                />
                <div className={cls.SearchCandidate}>
                <span>
                    <AiOutlineSearch/>
                </span>
                    <Input
                        placeholder={'Поиск'}
                        type={'text'}
                        className={cls.SearchInput}
                        value={inputValue}
                        onChange={(value) => setInputValue(value)}

                    />
                </div>
            </div>


            <div className={cls.candidate_selector__box}>
                <Text text={'Отрасль'}
                      className={cls.candidate_text}
                />
                <Select
                    placeholder={'-Выберите-'}
                    options={category}
                    value={categoryvalue}
                    onChange={(value) => setCategoryValue(value)}
                />
            </div>


            <div className={cls.candidate_selector__box}>
                <Text text={'Позиция'}
                      className={cls.candidate_text}
                />
                <Select
                    placeholder={'-Выберите-'}
                    options={positions}
                    value={position}
                    onChange={(value) => setPosition(value)}
                />
            </div>

            <div className={cls.candidate_selector__box}>
                <Text text={'Страна'}
                      className={cls.candidate_text}
                />
                <Select
                    placeholder={'-Выберите-'}
                    options={countries}
                    value={country}
                    onChange={(value) => setCountry(value)}
                />
            </div>
            <div className={cls.candidate_selector__box}>
                <Text text={'Город'}
                      className={cls.candidate_text}
                />
                <Select
                    placeholder={'-Выберите-'}
                    options={options}
                    value={city}
                    onChange={(value) => setCity(value)}
                />
            </div>
            <div className={cls.candidate_selector__box}>
                <Text text={'Опыт работы'}
                      className={cls.candidate_text}
                />
                <Select
                    placeholder={'-Выберите-'}
                    options={experiences}
                    value={experience}
                    onChange={(value) => setExperience(value)}
                />
            </div>


            <div className={cls.candidate_selector__box}>
                <Text text={'Вид занятости'}
                      className={cls.candidate_text}
                />
                <Select
                    placeholder={'-Выберите-'}
                    options={[
                        {
                            label: 'полный рабочий день',
                            value: 'полный_рабочий_день'
                        },
                        {
                            label: 'неполный рабочий день',
                            value: 'неполный_рабочий_день'
                        },
                        {
                            label: 'удаленная работа',
                            value: 'удаленная_работа'
                        }
                    ]}
                    value={typeOfEmployments}
                    onChange={(value) => setEmployment(value)}
                />
            </div>


            <div className={cls.candidate_selector__box}>
                <Text text={'Заработная плата '}
                      className={cls.candidate_text}
                />
                <Checkbox
                    isChecked={isCheckedSalaryFirst}
                    onChange={handleCheckboxChangeSalaryFirst}
                    label={'По убыванию'}
                />
                <Checkbox
                    isChecked={isCheckedSalarySecond}
                    onChange={handleCheckboxChangeSalarySecond}
                    label={'По возрастанию'}
                />
            </div>


            <div className={cls.candidate_selector__box}>
                <Text text={'Дата публикации'}
                      className={cls.candidate_text}
                />

                <Checkbox
                    isChecked={isCheckedDateFirst}
                    onChange={handleCheckboxChangeDateFirst}
                    label={'По убыванию'}
                />
                <Checkbox
                    isChecked={isCheckedDateSecond}
                    onChange={handleCheckboxChangeDateSecond}
                    label={'По возрастанию'}
                />

            </div>

            <div className={cls.candidate_selector__btn}>
                <Button
                    theme={ButtonTheme.CLEAR_BTN}
                    onClick={resetFilter}
                    className={cls.selector__btn}
                >
                    Сбросить
                </Button>
            </div>


        </div>
    );
};

export default JobSeekerVacancySelector;
