import { useState } from "react";

function Carousel({ children: slides }) {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((current) => (current - 1 + slides.length) % slides.length);
  };

    const next = () => {
        setCurrent((current) => (current + 1) % slides.length);
    };

  return (
    <div className="overflow-hidden w-full relative">
      <div className="flex transition-transform ease-out duration-500 w-full"
       style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides}
      </div>
      <div className="flex justify-between p-3">
        <button className="bg-gray-600 text-white px-2 py-1 rounded-full">
            <span onClick={prev}>&lt;</span>
        </button>
        <button className="bg-gray-600 text-white px-2 py-1 rounded-full">
            <span onClick={next}>&gt;</span>
        </button>
      </div>
      <div>
        {slides.map((_, index) => (
          <button key={index} onClick={() => setCurrent(index)}>
            {index === current ? "●" : "○"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
