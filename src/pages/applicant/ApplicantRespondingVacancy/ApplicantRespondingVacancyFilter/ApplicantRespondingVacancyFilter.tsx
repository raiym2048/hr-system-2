import cls from './ApplicantRespondingVacancyFilter.module.scss'
import {classNames} from "../../../../utils/lib/classNames/classNames";
import Input from "../../../../components/ui/Input/Input";
import {Select} from "../../../../components/ui/Select/Select";
import {AiOutlineSearch} from "react-icons/ai";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../redux/store/store";
import {getCandidatesFilter, getCandidatesSearch} from "../../../../redux/slice/candidatesStatus";
import {useDebounce} from "usehooks-ts";


interface ApplicantRespondingVacancyFilterProps {
    className?: string;
}

interface ISelectFilter {
    days: string,
    statusOfJobSeeker: string
}

const ApplicantRespondingVacancyFilter = ({className}: ApplicantRespondingVacancyFilterProps) => {
    const creData = [
        {label: 'cегодня', value: 'cегодня'},
        {label: 'На этой неделе', value: 'На этой неделе'},
        {label: 'На этой месяце', value: 'На этой месяце'},
        {label: 'В этом году', value: 'В этом году'},
    ]
    const staStatus = [
        {label: 'Отправлено', value: 'отправлено'},
        {label: 'Принято', value: 'принято'},
        {label: 'Отклонено', value: 'отклонено'},
        {label: 'Рассматривается', value: 'рассматривается'},
        {label: 'Собеседование', value: 'собеседование'},
        {label: 'Предложение', value: 'предложение'},
    ]
    const [inputValue, setInputValue] = useState('')

    const [selectFilter, setSelectFilter] = useState<ISelectFilter>({
        days: '',
        statusOfJobSeeker: ''
    })
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.authSlice.user)
    const debouncedValue = useDebounce<string>(inputValue, 1000)

    useEffect(() => {
        dispatch(getCandidatesSearch({userId: user.user.id, value: inputValue}))
    }, [debouncedValue])

    useEffect(() => {
        if (selectFilter.days || selectFilter.statusOfJobSeeker) {
            dispatch(getCandidatesFilter({user: user.user.id, date: selectFilter}));
        }
    }, [selectFilter])
    return (
        <div className={classNames(cls.ApplicantRespondingVacancyFilter, {}, [className])}>
            <div className={cls.responding_filter__search}>
                <AiOutlineSearch className={cls.responding_filter__icon}/>
                <Input
                    placeholder={'Поиск'}
                    className={cls.responding_filter__input}
                    value={inputValue}
                    onChange={((value: string) => setInputValue(value))}
                />
            </div>
            <Select
                placeholder={`По дате заявки`}
                options={creData}
                className={cls.responding_filter__select}
                value={selectFilter.days}
                onChange={(value) => setSelectFilter({
                    ...selectFilter, days: value
                })}
            />
            <Select
                placeholder={`По статусу`}
                options={staStatus}
                className={cls.responding_filter__select}
                value={selectFilter.statusOfJobSeeker}
                onChange={(value: string) => setSelectFilter({
                    ...selectFilter, statusOfJobSeeker: value
                })}
            />
        </div>
    );
};

export default ApplicantRespondingVacancyFilter;
