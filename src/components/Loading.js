import React from 'react';
import '../styles/loading.css';

const Loading = () => {
    return (
        <div className="flex-center position-ref full-height">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default Loading;
