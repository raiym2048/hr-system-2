import cls from './ResponseCandidate.module.scss'
import {classNames} from "../../../utils/lib/classNames/classNames";
import ResponseCandidateCard from "./ResponseCandidateCard/ResponseCandidateCard";
import Search from "../../../components/ui/Search/Search.tsx";
import {Select} from "../../../components/ui/Select/Select.tsx";
import {Button, ButtonTheme} from "../../../components/ui/Button/Button.tsx";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {
    useRespondingCandidateSearchQuery
} from "../../../redux/slice/employerApi/employerVacancyApi/employerResponceCandidateApi.ts";
import {useDounsed} from "../../../utils/hook/debounsed.ts";


interface ResponseCandidateProps {
    className?: string;
}

export interface IFilter {
    statusOfJobSeeker: string,
    experience: string,
    localDate: string
}

const ResponseCandidate = ({className}: ResponseCandidateProps) => {


    const experienceData = [
        {label: 'нет опыта работы', value: 'нет опыта работы'},
        {label: 'до 1 года', value: 'до 1 года '},
        {label: 'от 1 - 3 лет', value: 'от 1 - 3 лет'},
        {label: 'от 3 - 6 лет', value: 'от 3 - 6 лет'},
        {label: 'от 6 лет ', value: 'от 6 лет'},
    ]
    const statusData = [
        {label: 'Отправлено', value: 'отправлено'},
        {label: 'Принято', value: 'принято'},
        {label: 'Отклонено', value: 'отклонено'},
        {label: 'Рассматривается', value: 'рассматривается'},
        {label: 'Собеседование', value: 'собеседование'},
        {label: 'Предложение', value: 'предложение'},

    ]
    const applicationDate = [
        {label: 'Cегодня', value: 'сегодня'},
        {label: 'На этой неделе', value: 'на_этой_неделе'},
        {label: 'В этом месяце', value: 'в_этом_месяце'},
        {label: 'В этом году', value: 'в_этом_году'},
    ]
    const [inputValue, setInputValue] = useState<string>('')
    const debounced: string = useDounsed(inputValue)
    const {responseCandidateId} = useParams()
    const decodedresponseCandidateId = JSON.parse(decodeURIComponent(responseCandidateId?responseCandidateId:''));
    const [selectValue, setSelectValue] = useState<IFilter>({
        statusOfJobSeeker: '',
        experience: '',
        localDate: ''
    })

    const resetFilter=()=>{
        setSelectValue({
            statusOfJobSeeker:'',
            experience:'',
            localDate:''
        })
    }
    const {data} = useRespondingCandidateSearchQuery({
        vacanciesId: decodedresponseCandidateId.id,
        names: debounced,
        filterDate: selectValue
    })

    return (
        <div className={'container'}>
            <p className={cls.name_position}>{`Мои вакансии / Отклики на вакансию “${decodedresponseCandidateId.position}”`}</p>
            <div className={classNames(cls.ResponseCandidateFilter, {}, [className])}>

                <Search
                    value={inputValue}
                    onChange={(value: string) => setInputValue(value)}
                    className={cls.responseCandidateFilter_search}
                />
                <Select
                    placeholder={'По опыт работы'}
                    options={experienceData}
                    className={cls.select_bg}
                    value={selectValue.experience}
                    onChange={(value: string) => setSelectValue({
                        ...selectValue, experience: value
                    })}
                />
                <Select
                    placeholder={'По статусу'}
                    options={statusData}
                    className={cls.select_bg}

                    value={selectValue.statusOfJobSeeker}
                    onChange={(value: string) => setSelectValue({
                        ...selectValue, statusOfJobSeeker: value
                    })}
                />
                <Select
                    placeholder={'По дате заявки'}
                    options={applicationDate}
                    className={cls.select_bg}
                    value={selectValue.localDate}
                    onChange={(value: string) => setSelectValue({
                        ...selectValue, localDate: value
                    })}
                />
                <Button
                    theme={ButtonTheme.SQUARE}
                    padding={"10px 15px"}
                    onClick={resetFilter}
                >
                    Сбросить
                </Button>
            </div>

            <ResponseCandidateCard data={data}/>
        </div>
    );
};

export default ResponseCandidate;
