import React from 'react';
import './Loader.scss';

interface LoaderProps {
    size?: 'small' | 'medium' | 'large';
}

const Loader: React.FC<LoaderProps> = ({ size = 'medium' }) => {
    return (
        <div className="centered-loader">
            <div className={`loader loader-${size}`}></div>
        </div>
    );
};

export default Loader;
