
const mapContainer = document.getElementById("yandex-map");


const script = document.createElement("script");
script.type = "text/javascript";
script.charset = "utf-8";
script.async = true;


script.src =
  "https://api-maps.yandex.ru/services/constructor/1.0/js/?" +
  "um=constructor%3A0a4eed94756388a7e406e43d37bc5c7d2d944fcc06b1769dd79cc45650780b18" +
  "&width=100%" +
  "&height=300" +
  "&lang=ru_RU" +
  "&scroll=true";


mapContainer.appendChild(script);