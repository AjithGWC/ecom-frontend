import React from "react";

const HomeFooter = () => {
  return (
    <footer className="bg-[#0f3460] py-20 text-white">
  <div className="container mx-auto">
    <div className="flex flex-wrap justify-center">
      <div className="md:w-1/4 sm:w-1/2 p-5">
        <div className="flex items-center gap-2 mb-5">
          <ion-icon name="bag"></ion-icon>
          <h1 className="text-2xl font-extrabold">Multimart</h1>
        </div>
        <p className="text-base opacity-50 mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.
        </p>
      </div>

      <div className="md:w-1/4 sm:w-1/2 p-5">
        <h2 className="text-xl mb-5">About Us</h2>
        <ul className="space-y-2">
          <li className="opacity-50">Careers</li>
          <li className="opacity-50">Our Stores</li>
          <li className="opacity-50">Our Cares</li>
          <li className="opacity-50">Terms & Conditions</li>
          <li className="opacity-50">Privacy Policy</li>
        </ul>
      </div>

      <div className="md:w-1/4 sm:w-1/2 p-5">
        <h2 className="text-xl mb-5">Customer Care</h2>
        <ul className="space-y-2">
          <li className="opacity-50">Help Center</li>
          <li className="opacity-50">How to Buy</li>
          <li className="opacity-50">Track Your Order</li>
          <li className="opacity-50">Corporate & Bulk Purchasing</li>
          <li className="opacity-50">Returns & Refunds</li>
        </ul>
      </div>

      <div className="md:w-1/4 sm:w-1/2 p-5">
        <h2 className="text-xl mb-5">Contact Us</h2>
        <ul className="space-y-2">
          <li className="opacity-50">70 Washington Square South, New York, NY 10012, United States</li>
          <li className="opacity-50">Email: uilib.help@gmail.com</li>
          <li className="opacity-50">Phone: +1 1123 456 780</li>
        </ul>
      </div>
    </div>
  </div>
</footer>

  );
};

export default HomeFooter;
