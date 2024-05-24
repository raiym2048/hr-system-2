import cls from './PopularCategory.module.scss'
import {classNames} from "../../../utils/lib/classNames/classNames";
import {Text, TextStyle} from "../../../components/ui/Text/Text";
import Pagination from "../../../components/ui/Pagination/Pagination";
import {useState} from "react";
import {IPopularPosition} from "../HomePage";

import Автомобильный from '../../../assets/icons/Автомобильный бизнес.png'
import Административный from '../../../assets/icons/Административный персонал.png'
import Безопасность from '../../../assets/icons/Безопасность.png'
import Высший from '../../../assets/icons/Высший и средний менеджмент.png'
import Добыча from '../../../assets/icons/Добыча сырья.png'
import Домашний from '../../../assets/icons/Домашний, обслуживающий персонал.png'
import Другое from '../../../assets/icons/Другое.png'
import Закупки from '../../../assets/icons/Закупки.png'
import Информационные from '../../../assets/icons/Информационные технологии.png'
import Искусство from '../../../assets/icons/Искусство, развлечения, массмедиа.png'
import Маркетинг from '../../../assets/icons/Маркетинг, реклама, PR.png'
import Медицина from '../../../assets/icons/Медицина, фармацевтика.png'
import Наука from '../../../assets/icons/Наука, образование.png'
import Продажи from '../../../assets/icons/Продажи, обслуживание клиентов.png'
import Производство from '../../../assets/icons/Производство, сервисное обслуживание.png'
import Рабочий from '../../../assets/icons/Рабочий персонал.png'
import Розничная from '../../../assets/icons/Розничная торговля.png'
import Сельское from '../../../assets/icons/Сельское хозяйство.png'
import Спортивные from '../../../assets/icons/Спортивные клубы, фитнес, салоны красоты.png'
import Стратегия from '../../../assets/icons/Стратегия, инвестиции, консалтинг.png'
import Страхование from '../../../assets/icons/Страхование.png'
import Строительство from '../../../assets/icons/Строительство, недвижимость.png'
import Транспорт from '../../../assets/icons/Транспорт, логистика, перевозки.png'
import Туризм from '../../../assets/icons/Туризм, гостиницы, рестораны.png'
import Управление from '../../../assets/icons/Управление персоналом, тренинги.png'
import Финансы from '../../../assets/icons/Финансы, бухгалтерия.png'
import Юристы from '../../../assets/icons/Юристы.png'


interface PopularCategoryProps {
    className?: string;
    date: IPopularPosition[],
}

const PopularCategory = ({className, date}: PopularCategoryProps) => {
    const images: { [key: string]: Record<string, string> } = {
        "Автомобильныйбизнес": {src:Автомобильный,color:'rgba(156, 34, 176, 1)'},
        "Административныйперсонал": {src:Административный,color:'rgba(46, 185, 255, 1)'},
        "Безопасность":{src:Безопасность,color:'rgba(74, 109, 255, 1)'} ,
        "Высшийисреднийменеджмент":{src:Высший,color:'rgba(255, 204, 0, 1)'} ,
        "Добычасырья":{src:Добыча,color:'rgba(38, 175, 96, 1)'} ,
        "Домашний,обслуживающийперсонал":{src:Домашний,color:'rgba(170, 170, 170, 1)'},
        "Другое":{src:Другое,color:'rgba(184, 99, 0, 1)'} ,
        "Закупки":{src:Закупки,color:'rgba(46, 185, 255, 1)'} ,
        "Информационныетехнологии":{src:Информационные,color:'rgba(74, 109, 255, 1)'}  ,
        "Искусство,развлечения,массмедиа":{src:Искусство,color:'rgba(156, 34, 176, 1)'},
        "Маркетинг,реклама,PR":{src:Маркетинг,color:'rgba(255, 204, 0, 1)'},
        "Медицина,фармацевтика":{src:Медицина,color:'rgba(240, 55, 55, 1)'} ,
        "Наука,образование":{src:Наука,color:'rgba(38, 175, 96, 1)'} ,
        "Продажи,обслуживаниеклиентов":{src:Продажи,color:'rgba(240, 55, 55, 1)'} ,
        "Производство,сервисноеобслуживание":{src:Производство,color:'rgba(0, 174, 205, 1)'} ,
        "Рабочийперсонал": {src:Рабочий,color:'rgba(184, 99, 0, 1)'} ,
        "Розничнаяторговля":{src:Розничная,color:'rgba(156, 34, 176, 1)'}  ,
        "Сельскоехозяйство":{src:Сельское,color:'rgba(74, 109, 255, 1)'}  ,
        "Спортивныеклубы,фитнес,салоныкрасоты":{src:Спортивные,color:'rgba(255, 204, 0, 1)'}  ,
        "Стратегия,инвестиции,консалтинг":{src:Стратегия,color:'rgba(0, 174, 205, 1)'}  ,
        "Страхование":{src:Страхование,color:'rgba(38, 175, 96, 1)'}  ,
        "Строительство,недвижимость": {src:Строительство,color:'rgba(170, 170, 170, 1)'} ,
        "Транспорт,логистика,перевозки": {src:Транспорт,color:'rgba(184, 99, 0, 1)'} ,
        "Туризм,гостиницы,рестораны": {src:Туризм,color:'rgba(46, 185, 255, 1)'} ,
        "Управлениеперсоналом,тренинги": {src:Управление,color:'rgba(240, 55, 55, 1)'} ,
        "Финансы,бухгалтерия": {src:Финансы,color:'rgba(170, 170, 170, 1)'} ,
        "Юристы": {src:Юристы,color:'rgba(0, 174, 205, 1)'} ,
    }
    const [currentPage, setCurrentPage] = useState(1)
    const totalItems: number = date.length
    const itemsPerPage: number = 9
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex: number = (currentPage - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;
    const displayedItems: IPopularPosition[] = date && date.slice(startIndex, endIndex);

    return (
        <div className={classNames(cls.category_task, {}, [className])}>
            <Text
                text={'Популярные категории'}
                style={TextStyle.MAIN_TITLE}
            />
            <div className={cls.col_4}>
                {displayedItems.map((item, key) => {
                    if (images[item.categoryName.split(' ').join('')]){
                        return (
                            <div key={key} className={classNames(cls.Category, {}, [className || ''])}>
                                <div className={cls.avatar} style={{background:`${images[item.categoryName.split(' ').join('')].color}`}} >
                                    <img className={cls.img} src={images[item.categoryName.split(' ').join('')].src}/>
                                </div>
                                <Text
                                    text={item.categoryName.length > 25 ? item.categoryName.slice(0, 25) + '...' : item.categoryName}
                                    title={`${item.counterVacancy}`}
                                    style={TextStyle.CATEGORY_TEXT}
                                />

                            </div>
                        );
                    }
                })}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalItems / itemsPerPage)}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default PopularCategory;
