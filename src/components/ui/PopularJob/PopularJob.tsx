import {classNames} from "../../../utils/lib/classNames/classNames";
import cls from './PopularJob.module.scss'
import {Button, ButtonTheme} from "../Button/Button";

interface PopularJobProps {
    className?: string;
}

const job = ['Информационные технологии', 'Бухгалтерия', 'Искусство, развлечение ', 'Маркетинг и PR ', 'Административный персонал']
const PopularJob = ({className}: PopularJobProps) => {
    const randomColor = (): string => {
        let result = '';
        for (let i = 0; i < 6; ++i) {
            const value = Math.floor(16 * Math.random());
            result += value.toString(16);
        }
        return '#' + result;
    };

    return (
        <div className={classNames(cls.PopularJob, {}, [className || ''])}>
            <p className={cls.text}>Часто ищут:</p>
            <div className={cls.output_job}>
                {
                    job.map((item, key) => {
                        return (
                            <div key={key}>
                                <Button
                                    theme={ButtonTheme.CLEAR_BTN}
                                    className={cls.size_Btn}
                                    color={randomColor()}
                                >
                                    {item}
                                </Button>
                            </div>


                        )

                    })
                }
            </div>


        </div>
    );
};

export default PopularJob;
