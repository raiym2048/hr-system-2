import cls from './ResponseCandidateCard.module.scss'
import {classNames} from "../../../../utils/lib/classNames/classNames";
import {Text} from "../../../../components/ui/Text/Text";
import {IResponceCandidate} from "../../../../redux/slice/employerApi/type/type.ts";
import Accept from "../Accept/Accept.tsx";
import {useNavigate} from "react-router-dom";


interface ResponseCandidateCardProps {
    className?: string;
    data: IResponceCandidate[] | undefined
}

const ResponseCandidateCard = ({className, data}: ResponseCandidateCardProps) => {
const navigate=useNavigate()
    if (!data?.length) {
        return <p>No, please respond candidates</p>
    }
    const aplicantDetail = (id:number) => {
        navigate(`/employer/applicant/${id}`)
    }

    return (
        <>
            {
                data && data.map((item) => {
                    return (
                        <div  key={item.id} className={classNames(cls.ResponseCandidateCard, {}, [className])}>
                            <div onClick={()=>aplicantDetail(item.id)} style={{ width:"85%",display:"flex",alignItems:"start",justifyContent:"space-between",cursor:"pointer"}}>
                            <Text
                                text={'ФИО кандидата'}
                                title={`${item.firstname}`}
                                className={cls.response_candidate__text}
                                width={150}
                            />
                            <Text
                                text={'позиция'}
                                title={`${item.position}`}
                                className={cls.response_candidate__text}
                                width={200}
                            />
                            <Text
                                text={'Отрасль'}
                                title={`${item.category}`}
                                className={cls.response_candidate__text}
                                width={200}
                            />
                            <Text
                                text={'Опыт работы'}
                                title={`${item.experience}`}
                                className={cls.response_candidate__text}
                                width={150}
                            />
                            <Text
                                text={'локация'}
                                title={`${item.country}, ${item.city}`}
                                className={cls.response_candidate__text}
                                width={150}
                            />
                            <Text
                                text={'Дата заявки'}
                                title={`${item.localDate}`}
                                className={cls.response_candidate__text}
                                width={100}
                            />
                            </div>
                                <Accept item={item}/>
                        </div>
                    )
                })
            }
        </>
    );
};

export default ResponseCandidateCard;
