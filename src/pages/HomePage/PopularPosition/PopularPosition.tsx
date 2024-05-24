import {classNames} from "../../../utils/lib/classNames/classNames";
import cls from './PopularPosition.module.scss'
import {Button, ButtonTheme} from "../../../components/ui/Button/Button";
import {IPopularPosition} from "../HomePage";

interface PopularJobProps {
    className?: string;
    date:IPopularPosition[],
}

const PopularPosition = (props: PopularJobProps) => {
    const {
        date,
        className
    }=props
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
                   date && date.slice(0,5).map((item, key) => {
                        return (
                            <div key={key}>
                                <Button
                                    theme={ButtonTheme.CLEAR_BTN}
                                    className={cls.size_Btn}
                                    color={randomColor()}
                                >
                                    {item.categoryName}
                                </Button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default PopularPosition;
