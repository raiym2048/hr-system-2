import cls from './Accept.module.scss'
import {classNames} from "../../../../utils/lib/classNames/classNames.tsx";
import {Button, ButtonTheme} from "../../../../components/ui/Button/Button.tsx";
import {FaCheck} from "react-icons/fa6";
import {IoCloseSharp} from "react-icons/io5";
import {useState} from "react";
import {IResponceCandidate} from "../../../../redux/slice/employerApi/type/type.ts";
import {
    useSetStatusOfJobSeekerMutation
} from "../../../../redux/slice/employerApi/employerVacancyApi/employerResponceCandidateApi.ts";
import {Modal} from "../../../../components/ui/Modal/Modal.tsx";

interface AcceptProps {
    className?: string;
    item: IResponceCandidate
}

const Accept = ({className, item}: AcceptProps) => {
    const [choseId, setChosenId] = useState<number>(0)
    const [show, setShow] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isAccept, setIsAccept] = useState<boolean>(false)

    const [mutate] = useSetStatusOfJobSeekerMutation()
    const status = item.statusOfJobSeeker
    const statusOfJobSeekerColor: Record<string, string> = {
        "принято": "accepted",
        "рассматривается": "under_consideration",
        "собеседование": "interview",
        "предложение": "offer",
        "отклонено": "rejected"
    }

    const statusOfJobSeeker = [
        {status: "Пригласить", value: "предложение"},
        {status: "Отклонить", value: "отклонено"},
        {status: "Принять на работу", value: "принято"},
        {status: "В рассмотрении", value: "рассматривается"},
    ]

    const btnReject = async (status: string) => {
        await mutate({vacancyId: item.vacancyId, userId: item.id, status: status})
        setIsOpen(false)
    }
    const acceptStatus = async (status: string) => {
        await mutate({vacancyId: item.vacancyId, userId: item.id, status: status})
        setIsAccept(false)
    }

    const clickStatus = (id: number) => {
        setShow(true)
        setChosenId((prev) => {
            return prev ? 0 : id
        })

    }
    const setNewStatus = async (vacancyId: number, id: number, status: string) => {
        await mutate({vacancyId: vacancyId, userId: id, status: status})
            .then(() => {
                setShow(false)
                setChosenId(0)
            })

    }
    let colorBtn: string = ''
    if (status) {
        colorBtn = statusOfJobSeekerColor[status]
    }

    if (status == null) {
        return (
            <div className={classNames(cls.accept_btns, {}, [className])}>
                <Button
                    theme={ButtonTheme.CLEAR_BTN}
                    className={cls.check}
                    onClick={() => setIsAccept(true)}
                >
                    Принять
                    <FaCheck style={{marginLeft: "5px"}}/>
                </Button>

                <Modal isOpen={isAccept} onClose={() => setIsAccept(!isAccept)}>
                    <div className={cls.modal_content}>
                        <h2 className={cls.modal_content__text}>Принять</h2>
                        <p className={cls.modal_content__title}>Вы уверены, что хотите принять этого пользователя?</p>
                        <div className={cls.modal_content__btns}>
                            <Button
                                className={cls.btns__accept}
                                onClick={() => acceptStatus(statusOfJobSeeker[3].value)}
                            >
                                Принять
                            </Button>
                            <Button
                                className={cls.btns__cancellation}
                                onClick={() => setIsAccept(false)}
                            >
                                Отмена
                            </Button>
                        </div>
                    </div>

                </Modal>

                <Button
                    theme={ButtonTheme.CLEAR_BTN}
                    className={cls.close}
                    onClick={() => setIsOpen(true)}

                >
                    Отклонить
                    <IoCloseSharp style={{marginLeft: "5px"}}/>
                </Button>
                <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
                    <div className={cls.modal_content}>
                        <h2 className={cls.modal_content__text}>Отклонить заявку</h2>
                        <p className={cls.modal_content__title}>Вы уверены что хотите отклонить заявку? Дальнейшие
                            действия по этой заявке будут недоступны.</p>
                        <div className={cls.modal_content__btns}>
                            <Button
                                className={cls.btns__reject}
                                onClick={() => btnReject(statusOfJobSeeker[1].value)}
                            >
                                Отклонить
                            </Button>
                            <Button
                                className={cls.btns__cancellation}
                                onClick={() => setIsOpen(false)}
                            >
                                Отмена
                            </Button>
                        </div>
                    </div>

                </Modal>
            </div>
        )
    }


    return (
        <div className={classNames(cls.status, {}, [className])}>
            <div className={cls.status_item}>
                <p className={cls.status_text}>Статус</p>
                <Button
                    theme={ButtonTheme.CLEAR_BTN}
                    className={cls[colorBtn]}
                    onClick={() => clickStatus(item.id)}
                >
                    {status}
                </Button>
            </div>

            {choseId === item.id && show ? (
                <div key={item.id} className={cls.modal}>
                    <div className={cls.modalContent}>
                        {
                            statusOfJobSeeker.map((statusItem) => (
                                status !== statusItem.value ? (
                                    <div key={statusItem.value}
                                         onClick={() => setNewStatus(item.vacancyId, item.id, statusItem.value)}
                                         className={cls.modalOption}>
                                        {statusItem.status}
                                    </div>
                                ) : null
                            ))
                        }
                    </div>
                </div>
            ) : null}

        </div>
    );
};

export default Accept;
