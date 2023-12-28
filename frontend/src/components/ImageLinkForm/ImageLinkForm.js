import React from 'react';
import Tilt from 'react-parallax-tilt';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return(
        <div>
            <p className='f3 black'>
                {'Spiderman will detect your face with spidey sence'}
            </p>
            <div className='center'>
                <Tilt>
                    <div className='form center pa4 br3 shadow-5'>
                        <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                        <button className='detect w-30 grow f4 link ph3 pv2 dib white' onClick={onSubmit}>DETECT</button>
                    </div>
                </Tilt>
            </div>
        </div>
    )
}

export default ImageLinkForm;