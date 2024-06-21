import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselComponent = ({ items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <Slider {...settings}>
      {items.map((item) => (
        <div key={item.id} style={{ padding: "0 1rem" }}>
          <img
            src={item.image}
            alt={item.title}
            style={{ width: "100%", borderRadius: "10px" }}
          />
          <h3>{item.title}</h3>
        </div>
      ))}
    </Slider>
  );
};

export default CarouselComponent;
