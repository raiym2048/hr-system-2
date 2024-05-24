import { Controller, Control, UseFormRegister, UseFormWatch, FieldErrors, UseFormReset } from 'react-hook-form';
import { InputFlexible } from '../../../components/reusable/inputFlexible';
import { TApplicantProfileData, TEducations, TProfessions } from './ApplicantProfileEdit';
import Select from 'react-select'
import { inputStyles } from '../../../app/style/vendors/_select';
import arrayFromNumbers from '../../../helpers/arrayFromNumbers';
import monthNumberToName from '../../../helpers/monthNumberToName';
import { useFieldArray } from 'react-hook-form';
import { useEffect } from 'react';
import { getEducations, getPositions } from '../../../redux/slice/employerSlice';
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '../../../redux/store/store';

type TUseFormProps = {
  control: Control<TApplicantProfileData>,
  reset: UseFormReset<TApplicantProfileData>,
  watch: UseFormWatch<TApplicantProfileData>,
  errors: FieldErrors<TApplicantProfileData>,
  register: UseFormRegister<TApplicantProfileData>;
  emptyEducationObject: TEducations;
  emptyProfessionObject: TProfessions;
}
 
const ProfessionalSkills = ({
  control, 
  errors, 
  register, 
  watch, 
  emptyEducationObject, 
  emptyProfessionObject}: TUseFormProps) => {

  const dispatch = useDispatch<AppDispatch>()
  const { educations, positions } = useAppSelector(state=>state.employer)
  const { 
    fields: educationFields, 
    append: educationAppend, 
    remove: educationRemove } = useFieldArray({control, name: 'educationRequests'});  
  const { 
    fields: professionFields, 
    append: professionAppend, 
    remove: professionRemove } = useFieldArray({control, name: 'professionRequests'});
  
  useEffect(() => {
    dispatch(getEducations())
    dispatch(getPositions())

    // if (location.pathname.includes('/employer/vacancy/edit/') && params.vacancyId) {
    //   setEditMode(true)
    //   dispatch(getVacancyById(params.vacancyId))
    // }
  }, [dispatch])  


  // const education = [{value: 1, label: 1}, {value: 2, label: 2}]
  // const positions = [{value: 1, label: 1}, {value: 2, label: 2}]
  const months = arrayFromNumbers(1, 12, 1).map(item => ({value: item, label: monthNumberToName(item)}))
  const years = arrayFromNumbers(new Date().getFullYear(), 2000, -1).map(item => ({value: item, label: item}))

  const educationRequests = watch('educationRequests')
  const professionRequests = watch('professionRequests')

  let cvValue = {name: 'Файл не выбран'}

  const cvArray = watch('cv')
  if (cvArray && cvArray[0]) {
    cvValue = cvArray[0]
  }

  return (
    <>
      <div className='form__sectionStart'>
        <p className='form__subtitle subtitle'>О себе</p>
        <Controller
          name="about"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <InputFlexible 
              onChange={onChange} 
              value={value}
              id='about'
            />
          )}
        />
        {errors.about?.type === "required" && (
          <p className="errorMessage form__errorMessage">Пожалуйста введите данные о себе</p>
        )}
      </div>

      { educationFields.map((item, index) => {
        return(
          <div key={item.id} className='flexReordered flexReordered--column'>    
            {educationFields.length > 1 && (
              <p onClick={() => educationRemove(index)} className='text text--hyperlinkDanger form__right flexReordered__toEnd'>
                - Удалить текущее образование
              </p>        
            )}

            <div className='flexReordered__toStart'>
              <div className='form__sectionStart'>
                <p className='form__subtitle subtitle'>Образование</p>
                <Controller
                  name={`educationRequests.${index}.education`}
                  control={control}
                  rules={{ required: true }}
                  render={({field}) => (
                    <Select 
                      {...field}
                      placeholder='-Выберите-'
                      options={educations} 
                      styles={inputStyles}
                    />          
                  )}
                />
                {errors.educationRequests?.[index]?.education?.type === "required" && (
                  <p className="errorMessage form__errorMessage">Пожалуйста выберите тип образования</p>
                )}
              </div>

              <div className='form__sectionStart'>
                <p className='form__subtitle subtitle'>Учебное заведение</p>
                <input 
                  className='input text' 
                  type="text" 
                  placeholder='Например: Асанов' 
                  {...register(`educationRequests.${index}.university`, { required: true })} 
                />            
                {errors.educationRequests?.[index]?.university?.type === "required" && (
                  <p className="errorMessage form__errorMessage">Пожалуйста введите название учебного заведения</p>
                )}
              </div>

              <div className='form__sectionStart'>
                <p className='form__subtitle subtitle'>Месяц и год окончания<span className='asterisk'>*</span></p>

                <div className='form__grid form__grid--twoEquals'>
                  <Controller
                    name={`educationRequests.${index}.endMonth`}
                    control={control}
                    rules={{ required: true }}
                    render={({field}) => (
                      <Select 
                        {...field}
                        placeholder='-Выберите-'
                        options={months} 
                        styles={inputStyles}
                        isDisabled={educationRequests[index].studying}
                      />          
                    )}
                  />
                  <Controller
                    name={`educationRequests.${index}.endYear`}
                    control={control}
                    rules={{ required: true }}
                    render={({field}) => (
                      <Select 
                        {...field}
                        placeholder='-Выберите-'
                        options={years} 
                        styles={inputStyles}
                        isDisabled={educationRequests[index].studying}
                      />          
                    )}
                  />
                </div>
                {educationRequests?.[index]?.studying !== true 
                  && (errors.educationRequests?.[index]?.endMonth?.type === "required" 
                  || errors.educationRequests?.[index]?.endYear?.type === 'required')
                  && (
                  <p className="errorMessage form__errorMessage">Пожалуйста выберите месяц и год окончания образования</p>
                )}

                <div className='checkboxGroup form__checkbox'>
                  <div 
                    className={`checkboxGroup__checkbox ${educationRequests[index].studying ? 'checkboxGroup__checkbox--checked' : ''}`}>              
                  </div>
                  <input
                    id={`educationRequests.${index}.studying`}
                    type="checkbox"
                    name={`educationRequests.${index}.studying`}
                    // {...register(`educationRequests.${index}.studying`)} 
                  />
                  <label htmlFor={`educationRequests.${index}.studying`}>По настоящее время</label>
                </div>
              </div>
            </div>
          </div>
        ) 
      })}
      
      <p onClick={() => educationAppend(emptyEducationObject, {shouldFocus: false})} className='form__elementLower text text--hyperlinkSafe form__right'>
        + Добавить еще одно образование
      </p>

      { professionFields.map((item, index) => {
        return(
          <div key={item.id} className='flexReordered flexReordered--column'>  
            {professionFields.length > 1 && (
              <p onClick={() => professionRemove(index)} className='form__elementLower text text--hyperlinkDanger form__right flexReordered__toEnd'>
                - Удалить текущую профессию
              </p>   
            )} 
  

            <div className='flexReordered__toStart'>
              <div className='form__sectionStart'>
                <p className='form__subtitle subtitle'>Позиция<span className='asterisk'>*</span></p>
                <Controller
                  name={`professionRequests.${index}.position`}
                  control={control}
                  rules={{ required: true }}
                  render={({field}) => (
                    <Select 
                      {...field}
                      placeholder='-Выберите-'
                      options={positions} 
                      styles={inputStyles}
                    />          
                  )}
                />
                {errors.professionRequests?.[index]?.position?.type === "required" && (
                  <p className="errorMessage form__errorMessage">Пожалуйста выберите позицию</p>
                )}
              </div>


              <div className='form__sectionStart'>
                <p className='form__subtitle subtitle'>Место работы</p>
                <input 
                  className='input text' 
                  type="text" 
                  {...register(`professionRequests.${index}.companyName`, { required: true })} 
                />            
                {errors.professionRequests?.[index]?.companyName?.type === "required" && (
                  <p className="errorMessage form__errorMessage">Пожалуйста введите название компании</p>
                )}
              </div>

              <div className='form__sectionStart'>
                <p className='form__subtitle subtitle'>Период работы<span className='asterisk'>*</span></p>

                <div className='form__grid form__grid--six'>
                  <p className='text text--gray'>c</p>
                  <Controller
                    name={`professionRequests.${index}.startedMonth`}
                    control={control}
                    rules={{ required: true }}
                    render={({field}) => (
                      <Select 
                        {...field}
                        placeholder='-Выберите-'
                        options={months} 
                        styles={inputStyles}
                      />          
                    )}
                  />
                  <Controller
                    name={`professionRequests.${index}.startedYear`}
                    control={control}
                    rules={{ required: true }}
                    render={({field}) => (
                      <Select 
                        {...field}
                        placeholder='-Выберите-'
                        options={years} 
                        styles={inputStyles}
                      />          
                    )}
                  />
                  <p className='text text--gray'>по</p>          
                  <Controller
                    name={`professionRequests.${index}.endMonth`}
                    control={control}
                    rules={{ required: true }}
                    render={({field}) => (
                      <Select 
                        {...field}
                        placeholder='-Выберите-'
                        options={months} 
                        styles={inputStyles}
                        isDisabled={professionRequests[index].workingNow}
                      />          
                    )}
                  />
                  <Controller
                    name={`professionRequests.${index}.endYear`}
                    control={control}
                    rules={{ required: true }}
                    render={({field}) => (
                      <Select 
                        {...field}
                        placeholder='-Выберите-'
                        options={years} 
                        styles={inputStyles}
                        isDisabled={professionRequests[index].workingNow}
                      />          
                    )}
                  />
                </div>

                <div className='checkboxGroup form__checkbox'>
                  <div 
                    className={`checkboxGroup__checkbox ${professionRequests[index].workingNow ? 'checkboxGroup__checkbox--checked' : ''}`}>              
                  </div>
                  <input
                    id={`professionRequests.${index}.workingNow`}
                    type="checkbox"
                    name={`professionRequests.${index}.workingNow`}
                    // {...register(`professionRequests.${index}.workingNow`, { required: true })} 
                  />
                  <label htmlFor={`professionRequests.${index}.workingNow`}>По настоящее время</label>
                </div>

                <div className='form__sectionStart'>
                  <p className='form__subtitle subtitle'>Навыки</p>
                  <Controller
                    name={`professionRequests.${index}.skills`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <InputFlexible 
                        onChange={onChange} 
                        value={value}
                        id={`professionRequests.${index}.skills`}
                      />
                    )}
                  />
                  {errors.professionRequests?.[index]?.skills?.type === "required" && (
                    <p className="errorMessage form__errorMessage">Пожалуйста введите данные о себе</p>
                  )}
                </div>

              </div> 

            </div>
          </div>
        )
      })}

      <p onClick={() => professionAppend(emptyProfessionObject, {shouldFocus: false})} className='form__elementLower text text--hyperlinkSafe form__right'>
        + Добавить еще одну профессию
      </p>

      <div className='form__sectionStart'>
        <p className='form__subtitle subtitle'>Загрузить файл (CV)</p>

        <input id='cv' className='hidden' type='file' accept='application/pdf' {...register("cv")} />
        <label htmlFor='cv' className='input input--file'>
          <p className='input__text'>{cvValue.name}</p>
        </label>
      </div>

    </>
  )
}
export default ProfessionalSkills