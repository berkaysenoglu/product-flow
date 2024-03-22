import React from "react";
import { useSpring, animated } from "react-spring";

const WaveSVG = () => {
  // Y ve genişlik değerlerini animasyonla değiştirmek için useSpring hook'unu kullanın
  const { y } = useSpring({
    from: { y: 0, width: 0 },
    to: async (next) => {
      // Animasyonun başlangıç değerleri
      await next({ y: 50, width: 1440 });
    },
    loop: { reverse: true }, // Animasyonun tersine dönmesini sağlayın
    config: { duration: 1000 }, // Animasyon süresi
  });

  return (
    <svg
      style={{ position: "fixed", bottom: "0" }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 195"
    >
      {/* Dalganın animasyonlu olarak çizilmesi */}
      <animated.path
        fill="#032154"
        fillOpacity="0.9"
        d={y.to((y) => {
          // Sinüs fonksiyonu kullanarak dalgalı yol oluşturun
          let d = `M0,64`;
          const step = 10; // Yol adım büyüklüğü
          const waveHeight = 45; // Dalga yüksekliği
          const waveLength = 1440; // Dalga uzunluğu
          for (let i = 0; i <= waveLength; i += step) {
            const waveY =
              waveHeight * Math.sin((i / waveLength) * Math.PI * 2.1);
            d += `L${i},${64 + waveY}`;
          }
          d += `L1440,320L0,320Z`;
          return d;
        })}
      />
    </svg>
  );
};

export default WaveSVG;
