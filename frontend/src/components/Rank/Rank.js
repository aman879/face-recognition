import React from 'react';

const Rank = ({name, entries}) => {
    return(
        <div>
            <div className='black f3'>
                <p>Hello</p>
                {`${name}, Your current rank is...`}
            </div>
            <div className='black f3'>
                {entries}
            </div>
        </div>
    )
}

export default Rank;