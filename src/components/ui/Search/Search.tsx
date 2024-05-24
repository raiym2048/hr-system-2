import cls from './Search.module.scss'
import {AiOutlineSearch} from "react-icons/ai";
import Input from "../Input/Input";
import {classNames} from "../../../utils/lib/classNames/classNames";


interface SearchProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
}

const Search = ({className, value, onChange}: SearchProps) => {

    return (
        <div className={classNames(cls.Search, {}, [className])}>
                <span>
                    <AiOutlineSearch/>
                </span>
            <Input
                placeholder={'Поиск'}
                type={'text'}
                className={cls.SearchInput}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default Search;
