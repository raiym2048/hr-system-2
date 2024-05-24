import { classNames } from '../../../utils/lib/classNames/classNames'
import cls from './MainIcon.module.scss'

interface MainIconProps {
  className?: string
}

const MainIcon = ({ className }: MainIconProps) => {
  return (
    <div className={classNames(cls.MainIcon, {}, [className || ''])}>
      <div className={cls.square}></div>
      <div className={cls.square}></div>
      <h2>Border</h2>
    </div>
  )
}

export default MainIcon
