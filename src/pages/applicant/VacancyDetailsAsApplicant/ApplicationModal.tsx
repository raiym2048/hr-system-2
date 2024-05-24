import {useState} from 'react'
import Popup from 'reactjs-popup'
import {InputFlexible} from '../../../components/reusable/inputFlexible'
import close from '../../../assets/close.svg'
import {createPortal} from 'react-dom'
import applicantService from '../../../services/applicantService'
import {useDispatch} from 'react-redux'
import {getVacancyById} from '../../../redux/slice/vacancyByIdSlice'
import {AppDispatch} from '../../../redux/store/store'
import {getUserAppliedToVacancy} from '../../../redux/slice/userAppliedToVacancySlice'

type TApplicationModal = {
    openApply: boolean
    handleOpenModal: (arg0: boolean) => void
    vacancyId: string
    status: string
    applicantInfo: {
        firstname: string
        lastname: string
        email: string
    } | null
}

const ApplicationModal = ({
                              openApply,
                              handleOpenModal,
                              vacancyId,
                              applicantInfo,
                              status,
                          }: TApplicationModal) => {
    const [coverLetter, setCoverLetter] = useState('')
    const dispatch = useDispatch<AppDispatch>()

    const handleApply = async () => {
        await applicantService.putApplicationForAVacancy(vacancyId)
        dispatch(getVacancyById(vacancyId))
        dispatch(getUserAppliedToVacancy(vacancyId))
        handleOpenModal(false)
    }

    return createPortal(
        <Popup onClose={() => handleOpenModal(false)} modal open={openApply} className="popupModal">
            <p className="bigText">Подать заявку на эту вакансию</p>

            {
                status === "Открыто" ? (<>
                        <div className="popupModal__form">
                            <input
                                className="input input--disabled text"
                                type="text"
                                disabled={true}
                                value={`${applicantInfo?.firstname || 'name'}, ${applicantInfo?.lastname || 'lastname'}`}
                            />
                            <input
                                className="input input--disabled text"
                                type="text"
                                disabled={true}
                                value={applicantInfo?.email || 'email'}
                            />
                            <input autoFocus={true} className="hidden"/>{' '}
                            {/* I need the aboe line only to prevent autofocus on 'coverLetter' */}
                            <InputFlexible
                                onChange={(event) => setCoverLetter(event.target.value)}
                                value={coverLetter}
                                id="coverLetter"
                                placeholder="Напишите Coverletter..."
                            />
                            <input
                                className="hidden"
                                id="pdfForApplication"
                                type="file"
                                accept="application/pdf"
                            ></input>
                            <label htmlFor="pdfForApplication" className="input input--fileBig">
                                <p className="input__text input__text--blue">Загрузить резюме (doc, pdf)</p>
                            </label>
                            <button
                                className="button button--submit button--fullWidth popupModal__button"
                                onClick={handleApply}
                            >
                                Подать заявку
                            </button>
                        </div>

                        <button className="popupModal__cross buttonClean" onClick={() => handleOpenModal(false)}>
                            <img className="smallIcon" src={close}></img>
                        </button>
                    </>)
                    : (<p>{`this vacancy ${status}`}</p>)
            }


        </Popup>,
        document.body
    )
}
export default ApplicationModal
