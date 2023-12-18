/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
/* eslint-disable no-undef */
// // globals/map.js

import { Loader } from '@googlemaps/js-api-loader';

// class Map {
//   static async loadGoogleMapsApi() {
//     const loader = new Loader({
//       apiKey: 'AIzaSyBwuxRVJSQp_F79qM0zH1rCIEY6pMzUXY0',
//       version: 'weekly',
//     });

//     return loader.load();
//   }

//   static createMap(googleMaps, mapElement, cultureData) {
//     console.log('Creating map...');
//     const map = new googleMaps.Map(mapElement, {
//       center: { lat: cultureData.latitude, lng: cultureData.longitude },
//       zoom: 8,
//     });
//     console.log('Map created:', map);

//     // Additional code to customize the map
//     // eslint-disable-next-line no-new
//     new googleMaps.Marker({
//       position: { lat: cultureData.latitude, lng: cultureData.longitude },
//       map,
//       title: cultureData.name,
//     });

//     return map;
//   }
// }

// export default Map;

// globals/map.js

class Map {
  static loadGoogleMapsApi() {
    return new Promise((resolve, reject) => {
      // Cek apakah API Google Maps sudah dimuat sebelumnya
      if (window.google && window.google.maps) {
        resolve(window.google.maps);
      } else {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBwuxRVJSQp_F79qM0zH1rCIEY6pMzUXY0&libraries=places&callback=initMap';
        script.defer = true;
        script.async = true;

        window.initMap = () => {
          // Callback ini akan dipanggil ketika API berhasil dimuat
          resolve(google.maps);
        };

        script.onerror = () => {
          // Callback ini akan dipanggil jika terjadi kesalahan saat memuat API
          reject(new Error('Failed to load Google Maps API.'));
        };

        document.head.appendChild(script);
      }
    });
  }

  static createMap(googleMaps, mapElement, cultureData) {
    const { latitude, longitude } = cultureData;

    const map = new googleMaps.Map(mapElement, {
      center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
      zoom: 8,
    });

    // Tambahkan marker ke peta
    new googleMaps.Marker({
      position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
      map,
      title: cultureData.name,
    });

    return map;
  }
}

export default Map;
