import registerService from '../../services/registration';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export type TToDeleteAccount = {
  email: string,
  password: string,
}

const DeleteAccount = () => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<TToDeleteAccount>({ defaultValues: {} });


  const onSubmit = async (data: TToDeleteAccount) => {
    const obj = {
      email: registerService.user.email as string,
      password: data.password,
    }

    const response = await registerService.deleteAccount(obj)
    console.log(response)
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='detailsMain__sectionStart'>
        <p className="subtitle text">Вы уверены?</p>
        <p className="detailsMain__bodyOfText text">Если у вас возникли проблемы при использовании сервиса, не торопитесь удалять профиль, <span className='text--hyperlink'>свяжитесь с нами</span>, мы постараемся вам помочь.</p>
      </div>

      <div className='form__sectionStart form__sectionStart'>
        <p className='form__subtitle text text--bold'>Подтвердите пароль</p>
        <input 
          className='input text' 
          type="password" 
          placeholder='Подтвердите пароль'
          {...register("password", { required: true })} 
        />            
        {errors.password?.type === "required" && (
          <p className="errorMessage form__errorMessage">Пожалуйста подтвердите пароль</p>
        )}
      </div>

      <div className='form__submitButtons form__submitButtons--higher' >
        <button 
          className={`button ${isValid ? 'button--submit' : 'button--disabled'}`}
          type='submit'            
          disabled={!isValid} >
            Удалить профиль
        </button>
      </div>
    </form>
  )
}
export default DeleteAccount