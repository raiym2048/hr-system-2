import {classNames} from '../../../../utils/lib/classNames/classNames'
import cls from './СandidatePage.module.scss'
import CandidateSelector from '../CandidateSelector/CandidateSelector'
import {useAppSelector} from '../../../../redux/store/store'
import CandidateCard from '../CandidateCard/CandidateCard'
import Navigator from '../../../../components/ui/Navigator/Navigator'
import {useEffect, useState} from 'react'
import Pagination from '../../../../components/ui/Pagination/Pagination'
import {Text, TextStyle} from "../../../../components/ui/Text/Text";


interface СandidateProps {
    className?: string
}

const CandidatePage = ({className}: СandidateProps) => {
    const {candidates} = useAppSelector((state) => state.candidates)

    const [onlyFavorite, setOnlyFavorite] = useState(false)

    const showOnlyFavorite = () => {
        setOnlyFavorite(true)
    }
    const showAll = () => {
        setOnlyFavorite(false)

    }
    const [favoriteCount, setFavoriteCount] = useState<number>(0);
    const [allCount, setAllCount] = useState<number>(0);
    const filteredCandidates = onlyFavorite
        ? candidates.filter((candidate) => candidate.red)
        : candidates;

    //pagination
    useEffect(() => {
        if (onlyFavorite) {
            setFavoriteCount(filteredCandidates.length)
        }
        else{
            setAllCount(filteredCandidates.length)
        }

    }, [filteredCandidates])

    const [currentPage, setCurrentPage] = useState(1)

    const totalItems: number = filteredCandidates.length
    const itemsPerPage = 6
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const displayedItems = filteredCandidates.slice(startIndex, endIndex)
    //pagination

    return (
        <div className={'container'}>
            <div className={classNames(cls.Сandidate, {}, [className || ''])}>
                <div className={cls.candidate_sideBar}>
                    <CandidateSelector/>
                </div>

                <div className={cls.candidate_Content}>
                    <Navigator
                        isActive={onlyFavorite}
                        onClickFirst={showAll}
                        onClickSecond={showOnlyFavorite}
                        countAll={allCount}
                        countFavorite={favoriteCount}
                        childrenFirst={'Все'}
                        childrenSecond={'Избранное'}
                    />
                    <div className={cls.candidate_card}>
                        {
                            Array.isArray(displayedItems) && displayedItems.length ? displayedItems.map((candidate, index) => {
                                    return <CandidateCard candidates={candidate} key={index}/>
                                }) :
                                <><Text
                                    className={cls.canditate_text}
                                    text={'Не найден кандидат'}
                                    style={TextStyle.CENTER_TEXT}
                                /></>
                        }
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(totalItems / itemsPerPage)}
                        onPageChange={handlePageChange}
                        isEmpty={displayedItems.length === 0 ? true : false}
                    />

                </div>

            </div>
        </div>

    )
}

export default CandidatePage
