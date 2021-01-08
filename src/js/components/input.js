import templating from '../templating';
import api from '../apiService';
import { mySuccess, myError, myAlert, myNotice } from './notifications';
import createModal from '../basicLightbox';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.loadButton')

let page;
let searchQuery = '';
let loading = null;
let perPage = 12;

const fetch = () => {

    loading = true;
    api.fetchPhotos(searchQuery, page, perPage).then(({ hits, totalHits }) => {

        if (hits.length !== 0) {
            templating(hits);
        mySuccess();
        }
        if (totalHits < page * perPage) {
               loadBtn.classList.add('hidden')
               
        if (hits.length === 0) {
                   return myAlert()
            };
        }
        
        loading = false;
    })
        .catch(error => {
        console.log(error);
        myError();
    });
};

const inputHandler = event => {
    event.preventDefault();

    gallery.innerHTML = '';
    page = 1;
    searchQuery = event.currentTarget.elements.query.value;
    form.reset();
    fetch();
    loadBtn.classList.remove('hidden');

};
const incrementPage = () => page += 1;

const hadleOpenModal = (event) => {
    if (event.target.nodeName !== 'IMG') { return }
    createModal(event.target.dataset.source);
    
};
const onScrollHandler = () => {
    const pxToBottom = document.documentElement.getBoundingClientRect().bottom;
    const clientsViewHeight = document.documentElement.clientHeight;
    if (pxToBottom < (clientsViewHeight+400) && !loading) {
        incrementPage();
        fetch();
    }
};

form.addEventListener('submit', inputHandler);
gallery.addEventListener('click', hadleOpenModal);
window.addEventListener('scroll', onScrollHandler);