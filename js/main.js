import { formControl } from './form-control.js';
import { formValidation } from './ad-form-validation.js';
import { createMarkersGroup, initMap, saveAdsData} from './map.js';
import { getData } from './api.js';
import { errorPopup, showPopup, successPopup, dataError } from './popup.js';
import { setFilterFormChange } from './filters.js';
const { disableForms, enableAdForm, enableFilterForm, onAdFormSubmit } = formControl;
const {initAdFormValidation} = formValidation;

disableForms();

const getSimilarAds =() => {
  getData((adsList) => {
    saveAdsData(adsList);
    createMarkersGroup(adsList);
    enableFilterForm();
    setFilterFormChange(()=>createMarkersGroup(adsList));
  }, showPopup(dataError));
};

initMap()
  .then(getSimilarAds)
  .then(enableAdForm)
  .then(initAdFormValidation)
  .then(() => {onAdFormSubmit(showPopup(successPopup), showPopup(errorPopup));})
  .catch(showPopup(dataError));
