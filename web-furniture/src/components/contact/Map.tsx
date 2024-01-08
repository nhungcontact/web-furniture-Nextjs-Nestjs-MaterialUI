// components/LeafletMap.js
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function LeafletMap() {
  const t = useTranslations("MainPage");
  useEffect(() => {
    // Initialize and configure your Leaflet map here
    const map = L.map("map").setView([10.036245628338143, 105.7698135236992], 13);

    const tileLayerUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    L.tileLayer(tileLayerUrl, {
      attribution: "Map data © OpenStreetMap contributors",
    }).addTo(map);

    // Use a custom marker icon
    const customIcon = new L.Icon({
      iconUrl: "/images/location.png",
      iconSize: [32, 32],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
    // Add a marker to the map at the specified coordinates
    const marker = L.marker([10.036245628338143, 105.7698135236992], {
      icon: customIcon,
    }).addTo(map);
    marker
      .bindPopup(t("Dormitory A, Can Tho University, Xuan Khanh, Ninh Kieu, Can Tho"))
      .openPopup();
  }, []);

  const mapStyle = `
    #map {
      height: 1000px;
      z-index: 1;
    }

    @media (max-width: 768px) {
      #map {
        height: 600px;
      }
    }

    @media (max-width: 480px) {
      #map {
        height: 400px;
      }
    }
  `;

  return (
    <div style={{ position: "sticky", top: 0 }}>
      <style>{mapStyle}</style>
      <div id="map"></div>
    </div>
  );
}
