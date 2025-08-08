import { el, setChildren } from 'redom';
import { initMap } from '../../utils/yandexMaps';

const ATMs = async () => {
  const page = el('div.container.atms.py-5');
  const title = el('h2.atms__title.title.mb-4', 'Карта банкоматов');
  const mapContainer = el('div#atms-map.atms__map', {
    style: {
      height: '700px',
      width: '100%',
    },
  });

  setChildren(page, [title, mapContainer]);

  initMap('atms-map');

  return page;
};

export default ATMs;
