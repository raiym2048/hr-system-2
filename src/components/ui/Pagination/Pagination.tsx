import {FC} from 'react';
import './Pagination.scss';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isEmpty?:boolean;
}

const Pagination: FC<PaginationProps> = ({currentPage, totalPages, onPageChange,isEmpty}) => {
    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };
    const handlePrevClick = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = getPageNumbers();
        if (isEmpty) {
            return null;
        }

        if (pageNumbers.length <= 3) {
            return pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
                    onClick={() => onPageChange(pageNumber)}
                >
                    {pageNumber}
                </button>
            ));
        } else {
            const visiblePages = pageNumbers.slice(currentPage - 1, currentPage + 2);
            return (
                <>
                    {visiblePages.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    ))}
                    {currentPage + 2 < totalPages && <span className="ellipsis">...</span>}
                    {currentPage + 1 < totalPages && currentPage + 2 !== totalPages && (
                        <button
                            key={totalPages}
                            className={`pagination-button ${currentPage === totalPages ? 'active' : ''}`}
                            onClick={() => onPageChange(totalPages)}
                        >
                            {totalPages}
                        </button>
                    )}
                </>
            );
        }
    };
    return (
        <div className="pagination">
            <button className="page-button" onClick={handlePrevClick} disabled={currentPage === 1}>
                Пред
            </button>
            {
                renderPageNumbers()
            }
            <button className="page-button" onClick={handleNextClick} disabled={currentPage === totalPages}>
                След
            </button>

        </div>
    );
};

export default Pagination;
