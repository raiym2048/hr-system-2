import './Navigator.scss'
interface NavigatorProps {
    isActive?: boolean;
    countAll?: number
    countFavorite?:number
    childrenFirst?: string
    childrenSecond?:string
    onClickFirst?:()=>void
    onClickSecond?:()=>void
}

const Navigator = (props: NavigatorProps) => {
    const {
        isActive,
        countAll,
        countFavorite,
        childrenFirst,
        childrenSecond,
        onClickFirst,
        onClickSecond
    } = props


    return (
        <div className="menuEmployer">
            <div className="employerTopMenu">
                <p onClick={onClickFirst} className={`employerTopMenu__menuItem ${isActive===false?'employerTopMenu__menuItem--active':''}`}>
                    {childrenFirst}
                </p>
                {
                    countAll?<span className={`count ${isActive===false?'count--active':''}`}>{countAll}</span>:''
                }

                <p onClick={onClickSecond} className={`employerTopMenu__menuItem ${isActive===true?'employerTopMenu__menuItem--active count--active':''}`}>
                    {childrenSecond}
                </p>
                {
                    countFavorite?<span className={`count ${isActive===true?'count--active':''}`}>{countFavorite}</span>:''
                }
            </div>
        </div>
    );
};

export default Navigator;
