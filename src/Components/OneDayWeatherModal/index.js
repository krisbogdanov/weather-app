import { Modal, Backdrop } from '@mui/material'
import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import Slider from "react-slick";
import WeatherCard from '../WeatherCard';
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  
};
const styles = (theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backDrop: {
    backdropFilter: 'blur(8px)'
  },
  modalContainer: {
    position: 'relative',
    outline: 'none',
    width: '900px',
    background: 'white',
    boxShadow: '0px 10px 30px #00000029',
    borderRadius: '10px',
    '& .slider': {
      width: '800px',
      margin: 'auto',
      '& .slick-prev::before, .slick-next::before': {
        color: '#000'
      }
    },
    '& .heading': {
      fontSize: '18px',
      margin: '10px auto',
      textAlign: 'center'
    }
  },

 
});

class OneDayWeatherModal extends Component {
  render() {
    const { modalData, close, classes } = this.props;
    if (!modalData) return null
    return (
      <Modal
        BackdropComponent={Backdrop}
        className={classes.modal}
        BackdropProps={{
          classes: { root: classes.backDrop }
        }}
        open={!!modalData}
        onBackdropClick={close}>
        <div className={classes.modalContainer}>
          <div className='heading'>Forcast for {modalData[0].dt_txt.split(' ')[0]}</div>
          <div className='slider'>
            <Slider {...settings}>
              {modalData.map(weather => (
                <div key={weather.dt}>
                  <WeatherCard key={weather.dt} info={weather} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </Modal >
    )
  }
}

export default withStyles(styles)(OneDayWeatherModal)