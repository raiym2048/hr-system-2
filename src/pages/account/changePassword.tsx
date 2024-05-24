import registerService from '../../services/registration';
import { useForm } from 'react-hook-form';

export type TForPasswordChange = {
  email: string,
  oldPassword: string,
  newPassword: string
  confirmPassword?: string
}

const ChangePassword = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<TForPasswordChange>({ defaultValues: {} });

  const onSubmit = async (data: TForPasswordChange) => {
    const obj = {
      email: registerService.user.email as string,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    }

    const response = await registerService.changePassword(obj)
    console.log(response)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='form__sectionStart'>
        <p className='form__subtitle text text--bold'>Текущий пароль</p>
        <input 
          className='input text' 
          type="password" 
          placeholder='Введите текущий пароль'
          {...register("oldPassword", { required: true })} 
        />            
        {errors.oldPassword?.type === "required" && (
          <p className="errorMessage form__errorMessage">Пожалуйста введите текущий пароль</p>
        )}
      </div>

      <div className='form__sectionStart form__sectionStart--higher'>
        <p className='form__subtitle text text--bold'>Новый пароль</p>
        <input 
          className='input text' 
          type="password" 
          placeholder='Введите новый пароль'
          {...register("newPassword", { required: true })} 
        />            
        {errors.newPassword?.type === "required" && (
          <p className="errorMessage form__errorMessage">Пожалуйста введите новый пароль</p>
        )}
      </div>

      <div className='form__sectionStart form__sectionStart--higher'>
        <p className='form__subtitle text text--bold'>Подтвердите пароль</p>
        <input 
          className='input text' 
          type="password" 
          placeholder='Подтвердите пароль'
          {...register("confirmPassword", { required: true })} 
        />            
        {errors.confirmPassword?.type === "required" && (
          <p className="errorMessage form__errorMessage">Пожалуйста подтвердите пароль</p>
        )}
      </div>

      <div className='form__submitButtons form__submitButtons--higher' >
        <button 
          className={`button ${isValid ? 'button--submit' : 'button--disabled'}`}
          type='submit'            
          disabled={!isValid} >
            Сменить пароль
        </button>
      </div>
    </form>
  )
}
export default ChangePassword