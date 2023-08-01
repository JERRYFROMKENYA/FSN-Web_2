import React from 'react';
import { Slide } from 'react-slideshow-image';
import './slideshow.css'
import {currentCampaign} from "./SlideImages/currentCampaign.js";

const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000',
    alignSelf:'flex-end'
}

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
    backgroundSize: 'contain',
    height: '700px'
}
const slideImages = currentCampaign
const Slideshow = () => {
    return (
        <section id={'current-campaign'}>
        <div className="slide-container">
            <Slide>
                {slideImages.map((slideImage, index)=> (
                    <div key={index}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                            <span style={spanStyle}>
                                <h1 style={{color: 'var(--cop-pink)'}}>{slideImage.title}</h1>
                                {slideImage.caption}</span>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
        </section>
    )
}


export default Slideshow