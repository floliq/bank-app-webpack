import { getBanks } from '../api/Banks';

export const loadYandexMaps = () => {
  if (window.ymaps && typeof window.ymaps.ready === 'function') {
    return Promise.resolve(window.ymaps);
  }

  if (window.__ymapsLoadingPromise) return window.__ymapsLoadingPromise;

  window.__ymapsLoadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    // eslint-disable-next-line no-undef
    const apiKey = process.env.YMAPS_API_KEY;
    const base = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.src = apiKey ? `${base}&apikey=${apiKey}` : base;
    script.async = true;
    script.onload = () => {
      if (window.ymaps) {
        window.ymaps.ready(() => resolve(window.ymaps));
      } else {
        reject(new Error('Yandex Maps not available after load'));
      }
    };
    script.onerror = () =>
      reject(new Error('Failed to load Yandex Maps script'));
    document.head.appendChild(script);
  });

  return window.__ymapsLoadingPromise;
};

export const waitForElementInDOM = (id, timeoutMs = 3000) =>
  new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      const el = document.getElementById(id);
      if (el && document.body.contains(el)) return resolve(el);
      if (Date.now() - start > timeoutMs)
        return reject(new Error('Timeout waiting for map container'));
      requestAnimationFrame(check);
    };
    check();
  });

export const initMap = async (containerId) => {
  try {
    await waitForElementInDOM(containerId);
    const ymaps = await loadYandexMaps();
    const response = await getBanks();
    const banks = response.payload;

     
    const banksCoords = banks.map((item) => [item.lat, item.lon]);

    const map = new ymaps.Map(containerId, {
      center: [55.751244, 37.618423],
      zoom: 10,
      controls: ['zoomControl', 'geolocationControl'],
    });

    banksCoords.forEach((coord) => {
       
      const myPlacemark = new ymaps.Placemark([coord[0], coord[1]]);

      map.geoObjects.add(myPlacemark);
    });

    return map;
  } catch (error) {
    console.error(error);
    return null;
  }
};
