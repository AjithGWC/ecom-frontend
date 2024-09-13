import productBg from "../images/table.jpg";

const Banner = ({title}) => {
  return (
    <div className="relative">
      <img 
        className="w-full h-60 object-cover product-image"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-3xl font-bold">{ title }</h2>
        </div>
      </div>
    </div>
  );
};

export default Banner;
