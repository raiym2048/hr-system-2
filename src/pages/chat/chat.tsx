import { ChangeEvent, useEffect, useState } from 'react'
import { socket } from '../../services/socket'
import search from '../../assets/search.svg'
import attachment from '../../assets/attachment.svg'
import defaultIcon from '../../assets/icon.jpg'
import close from '../../assets/close.svg'
import read from '../../assets/read2.svg'
import unread from '../../assets/unread2.svg'
import { InputFlexible } from '../../components/reusable/inputFlexible'
import ReactDOM from 'react-dom'
import { useAppDispatch, useAppSelector } from '../../redux/store/store'
import { TInterlocutor, getChatHistory, postStatusUpdate } from '../../redux/slice/chatSlice'
import employerService from '../../services/employerService'
import { TFetchedEmployerProfileInfo } from '../../exportedTypes/fetchedEmployerProfileInfo'
import fileService from '../../services/fileService'
import { useParams } from 'react-router-dom'
import chatService from '../../services/chatService'
import registerService from '../../services/registration'

const Chat = () => {
  const [searchInput, setSearchInput] = useState('')
  const [chosenFilter, setChosenFilter] = useState(0) // 0 = Все, 1 = Непрочитанные
  const [partnerIdFromUrl, setPartnerIdFromUrl] = useState<number | null>(null)
  const [partnerIdFromClick, setPartnerIdFromClick] = useState<number | null>(null)
  const [partnerEmailFromClick, setPartnerEmailFromClick] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState<string>('')
  const [newFiles, setNewFiles] = useState<FileList | null>(null)
  const [filesName, setFilesName] = useState<string[] | null>(null)
  const [filesQuantity, setFilesQuantity] = useState(0)
  const [tooltip, setTooltip] = useState(false)
  const dispatch = useAppDispatch()
  const interlocutors = useAppSelector((state) => state.chatInformation.allChatMessages)
  const [myProfileInfo, setMyProfileInfo] = useState<TFetchedEmployerProfileInfo | null>(null)
  const [paramsPartner, setParamsPartner] = useState(null)
  const params = useParams()

  useEffect(() => {
    ;(async () => {
      const response = await employerService.getProfile()
      setMyProfileInfo(response)

      if (params.partnerId) {
        const partnerId = Number(params.partnerId)
        setPartnerIdFromUrl(partnerId)
        const result = await chatService.getSinglePartner(partnerId)
        setParamsPartner(result)
      }

    })()
    dispatch(getChatHistory())
  }, [dispatch, params.partnerId])

  console.log('allChatMessages', interlocutors)

  type TMessage = {
    amIAuthor: boolean
    sender: string
    recipient: string
    read: boolean
    id: number
    content: string
    sentTime: string
    fileResponse: string | undefined
  }
  type TChatResponse = {
    item: TMessage
    index: number
    array: TMessage[]
    partnerIcon: string | undefined
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('ru', {
      day: 'numeric',
      month: 'long',
    })
  }
  const ChatResponse = ({ item, index, array, partnerIcon }: TChatResponse) => {
    const isFirstMessageEver = array.length === index + 1 // need this to avoid error when trying to access non-existing value in 'index + 1'
    const isFirstMessageOfAnotherDay =
      !isFirstMessageEver &&
      new Date(item.sentTime).getDay() !== new Date(array[index + 1]?.sentTime).getDay()
    const dateShoudBeShown = isFirstMessageEver || isFirstMessageOfAnotherDay

    const timeFormated = new Date(item.sentTime).toLocaleTimeString('ru', {
      hour: '2-digit',
      minute: '2-digit',
    })

    const isFirstMessageOfAPerson = !isFirstMessageEver && item.sender !== array[index + 1].sender
    const iconShouldBeShown =
      isFirstMessageEver || isFirstMessageOfAnotherDay || isFirstMessageOfAPerson
    const isNewAuthor = isFirstMessageOfAPerson && !isFirstMessageOfAnotherDay

    return (
      <div className="main__singlePost">
        {dateShoudBeShown && <p className="main__date">{formatDate(item.sentTime)}</p>}
        <div
          className={`main__iconAndMessage ${item.amIAuthor && 'main__iconAndMessage--self'} ${
            isNewAuthor && 'main__iconAndMessage--newAuthor'
          }`}
        >
          <div className="main__iconPlace">
            {iconShouldBeShown && (
              <img
                className="sidebar__icon main__icon"
                src={
                  item.amIAuthor
                    ? myProfileInfo?.fileResponse.path || defaultIcon
                    : partnerIcon || defaultIcon
                }
              />
            )}
          </div>

          <div className="main__messageTimeStatus">
            <p className="main__message">{item.content}</p>
            <div className="main__timeAndStatus">
              <p className="main__time">{timeFormated}</p>
              {item.amIAuthor && <img className="main__read" src={item.read ? read : unread}></img>}
            </div>
          </div>
        </div>
      </div>
    )
  }
  const clearFiles = () => {
    setNewFiles(null)
    setFilesName(null)
    setFilesQuantity(0)
  }
  const sendMessage = async () => {
    const filesArray = []
    if (newFiles) {
      for (let i = 0; i < newFiles.length; i++) {
        const filesFormData = new FormData()
        filesFormData.append('file', newFiles[i])
        const fileResponse = await fileService.postFileForChat(filesFormData)
        filesArray.push(fileResponse.id)
      }
    }
    socket.send(
      JSON.stringify({
        sender: registerService.user.email,
        recipient: partnerEmailFromClick,
        content: newMessage,
        fileIds: filesArray,
      })
    )
    setNewMessage('')
    clearFiles()
  }
  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files?.length) {
      setFilesQuantity(files.length)
      const name = Array.from(files).map((item) => item.name)
      setNewFiles(files)
      setFilesName(name)
    }
  }
  const setUser = (item: TInterlocutor) => {
    setPartnerIdFromClick(item.userId)
    const email = item.messageResponses[0].amIAuthor
      ? item.messageResponses[0].recipient
      : item.messageResponses[0].sender
    setPartnerEmailFromClick(email)
    dispatch(postStatusUpdate({ email, id: item.userId }))
  }

  const filesPickerElement = document.getElementById('filesPickerElement') as HTMLElement
  if (filesPickerElement) {
    filesPickerElement.addEventListener('mouseover', () => setTooltip(true), false)
    filesPickerElement.addEventListener('mouseout', () => setTooltip(false), false)
  }

  const chosenPartnerId = partnerIdFromClick || partnerIdFromUrl

  const modifiedInterlocutors = [...interlocutors]

  if (
    paramsPartner &&
    !partnerIdFromClick &&
    !modifiedInterlocutors.some((item) => item.userId === partnerIdFromUrl)
  ) {
    modifiedInterlocutors.unshift(paramsPartner)
  }

  if (chosenFilter === 1) modifiedInterlocutors.filter((item) => item.unreadCount > 0)

  if (searchInput !== '') {
    const searchInputLowerCase = searchInput.toLowerCase()
    modifiedInterlocutors.filter(
      (item) =>
        item.firstname?.toLowerCase().includes(searchInputLowerCase) ||
        item.lastname?.toLowerCase().includes(searchInputLowerCase) ||
        item.companyName?.toLowerCase().includes(searchInputLowerCase)
    )
  }

  const chosenInterlocutor = modifiedInterlocutors.find((item) => item.userId === chosenPartnerId)

  return (
    <div className="container">
      <div className="chat__parent" id="chatContainer">
        <div className="chat">
          <div className="chat__sidebar">
            <div className="sidebar__header">Мои сообщения</div>
            <div className="sidebar__search">
              <input
                placeholder="Поиск"
                className={`sidebar__input ${searchInput !== '' && 'sidebar__input--lessPadding'}`}
                type="text"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              />
              {searchInput === '' && <img className="sidebar__searchIcon" src={search}></img>}

              <div>
                <div className="sidebar__filterMenu">
                  <span
                    onClick={() => setChosenFilter(0)}
                    className={`sidebar__filterItem ${
                      chosenFilter === 0 && 'sidebar__filterItem--chosen'
                    }`}
                  >
                    Все
                  </span>
                  <span
                    onClick={() => setChosenFilter(1)}
                    className={`sidebar__filterItem ${
                      chosenFilter === 1 && 'sidebar__filterItem--chosen'
                    }`}
                  >
                    Непрочитанные
                  </span>
                </div>
                <hr className="sidebar__line" />
              </div>
            </div>

            <div className="sidebar__list">
              {modifiedInterlocutors.map((item) => (
                <div
                  key={item.userId}
                  className={`sidebar__listItem ${
                    chosenPartnerId === item.userId ? 'sidebar__listItem--chosen' : ''
                  }`}
                  onClick={() => setUser(item)}
                >
                  <img className="sidebar__icon" src={item.fileResponse}></img>
                  <div className="sidebar__nameAndDate">
                    <span className="sidebar__name">
                      {item.companyName || item.firstname + ' ' + item.lastname}
                    </span>
                    <span className="sidebar__date">
                      {formatDate(item.messageResponses[0].sentTime)}
                    </span>
                  </div>
                  <div className="sidebar__messageAndUnread">
                    <p className="sidebar__message">
                      {item.messageResponses[0].amIAuthor
                        ? 'Я'
                        : item.companyName || item.firstname}
                      : {item.messageResponses[0].content}
                    </p>
                    {item.unreadCount > 0 && (
                      <div className="sidebar__unread">
                        <p className="sidebar__unreadNumber">{item.unreadCount}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {chosenPartnerId ? (
            <div className="chat__main chat__main--chosen">
              <div className="main__header">
                <p>
                  <span className="main__headerName">
                    {chosenInterlocutor?.companyName ||
                      chosenInterlocutor?.firstname + ' ' + chosenInterlocutor?.lastname}
                  </span>
                </p>
                <p className="main__headerPosition"> {chosenInterlocutor?.position}</p>
              </div>
              <div className="main__chatBody">
                {chosenInterlocutor?.messageResponses.map((item, index, array) => (
                  <ChatResponse
                    key={index}
                    item={item}
                    index={index}
                    array={array}
                    partnerIcon={chosenInterlocutor.fileResponse}
                  />
                ))}
              </div>
              <div className="main__input">
                <div className="main__fileChoiceElement" id="filesPickerElement">
                  <input
                    id="cv"
                    multiple
                    className="hidden"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFiles}
                  />
                  <label htmlFor="cv" className="main__counterContainer">
                    <img src={attachment} className="buttonClean"></img>
                    {filesQuantity > 0 && <div className="main__fileChosen">{filesQuantity}</div>}
                  </label>
                  {filesName &&
                    tooltip &&
                    ReactDOM.createPortal(
                      <div className="chat__tooltip">
                        {filesName.map((item) => (
                          <p key={item}>{item}</p>
                        ))}
                      </div>,
                      document.getElementById('chatContainer') as HTMLElement
                    )}
                  {filesQuantity > 0 && (
                    <img src={close} className="buttonClean" onClick={clearFiles}></img>
                  )}
                </div>
                <InputFlexible
                  className="main__inputField"
                  placeholder="Написать сообщение..."
                  id="chatInput"
                  value={newMessage}
                  onChange={(event) => setNewMessage(event.target.value)}
                />
                <div onClick={sendMessage} className="main__inputButton button button--submit">
                  Отправить
                </div>
              </div>
            </div>
          ) : (
            <div className="chat__main chat__main--notChosen">
              <p className="main__notChosen">Выберите кому вы хотели бы написать</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Chat
