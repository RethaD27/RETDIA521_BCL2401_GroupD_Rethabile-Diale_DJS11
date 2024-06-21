import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./CarouselComponent.css"; // Import custom CSS for styling

const CarouselComponent = ({ items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className="carousel-item">
            <Link to={`/show/${item.id}`}>
              <img
                src={item.image}
                alt={item.title}
                className="carousel-image"
              />
            </Link>
            <h3 className="carousel-title">{item.title}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

CarouselComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CarouselComponent;
