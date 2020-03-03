let productRequest = new XMLHttpRequest();
let activeProductImage = document.querySelector('.active-image');
let productHolder = document.querySelector('.json-holder');

let leftArrow = document.querySelector('#left_arrow');
let rightArrow = document.querySelector('#right_arrow');

let contactUs = document.querySelector('#contact-us');
let contactForm = document.querySelector('.contact-form');
let contactBars = document.querySelector('.contact-bars');
let contactBarLines = document.querySelectorAll('.bar');
let submitBtn = document.querySelector('.submit');
let formSectionToHide = document.querySelector('.form-to-be-hidden');

let visitorName = document.querySelector('.name');
let queryMessage = document.querySelector('textarea');

productRequest.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
        let products = JSON.parse(this.responseText);
        let myProducts = products.products;
        populateProducts(myProducts);
    }
}

productRequest.open('GET', './product.json', true);
productRequest.send();

function populateProducts(myProducts) {
    myProducts.forEach(({
        title,
        price,
        description,
        link
    }) => {
        let productInfoContainer = document.createElement('div');

        productInfoContainer.classList.add('product-description-container');

        let productTitle = document.createElement('h4');
        productTitle.innerHTML = title;
        productTitle.classList.add('product-title');

        let productPrice = document.createElement('div');
        productPrice.innerHTML = price;
        productPrice.classList.add('pricing')

        let productDescription = document.createElement('p');
        productDescription.innerHTML = description;
        productDescription.classList.add('product-description');

        let productImage = document.createElement('img');
        productImage.setAttribute('src', link);
        productImage.classList.add('active-image');
        productImage.classList.add('inactive-image');

        productInfoContainer.appendChild(productTitle);
        productInfoContainer.appendChild(productPrice);
        productInfoContainer.appendChild(productDescription);

        productInfoContainer.classList.add('inactive-product-info');

        productHolder.appendChild(productInfoContainer);
        activeProductImage.appendChild(productImage);
    });
};

rightArrow.addEventListener('click', e => {
    let activeProduct = document.querySelector('.active-image-js');
    let nextProduct = activeProduct.nextElementSibling;

    let infoContainer = document.querySelectorAll('.product-description-container');

    let currentContainer = Array.from(infoContainer);
    let activeInfoContainer = currentContainer.filter(e => {
        return e.classList.contains('inactive-product-info') === false;
    })[0];

    let nextProductContainer = activeInfoContainer.nextElementSibling;

    if (nextProduct === null) {
        rightArrow.classList.add('hide-arrow');
        return;
    } else {
        activeProduct.classList.remove('active-image-js');
        activeProduct.classList.add('inactive-image');

        nextProduct.classList.remove('inactive-image');
        nextProduct.classList.add('active-image-js');

        activeInfoContainer.classList.add('inactive-product-info');
        nextProductContainer.classList.remove('inactive-product-info');

        if (leftArrow.classList.contains('hide-arrow')) {
            leftArrow.classList.remove('hide-arrow');
        } else {
            return;
        }
    }
});

leftArrow.addEventListener('click', e => {
    let activeProduct = document.querySelector('.active-image-js');
    let previousProduct = activeProduct.previousElementSibling;

    let infoContainer = document.querySelectorAll('.product-description-container');

    let currentContainer = Array.from(infoContainer);
    let activeInfoContainer = currentContainer.filter(e => {
        return e.classList.contains('inactive-product-info') === false;
    })[0];

    let previousProductContainer = activeInfoContainer.previousElementSibling;

    if (previousProduct === null) {
        leftArrow.classList.add('hide-arrow');
        return;
    } else {
        activeProduct.classList.remove('active-image-js');
        activeProduct.classList.add('inactive-image');

        previousProduct.classList.remove('inactive-image');
        previousProduct.classList.add('active-image-js');

        activeInfoContainer.classList.add('inactive-product-info');
        previousProductContainer.classList.remove('inactive-product-info');

        if (rightArrow.classList.contains('hide-arrow')) {
            rightArrow.classList.remove('hide-arrow');
        } else {
            return;
        }
    }
});

contactUs.addEventListener('click', e => {
    e.preventDefault();
    contactForm.classList.remove('contact-form-hide');
    contactForm.classList.add('contact-form-show');
    contactBarLines[0].classList.add('bar-top');
    contactBarLines[1].classList.add('bar-bottom');

    clearForms();

    formSectionToHide.classList.remove('.contact-form-hide');
});

contactBars.addEventListener('click', () => {
    contactForm.classList.remove('contact-form-show');
    contactForm.classList.add('contact-form-hide');

    contactBarLines[0].classList.remove('bar-top');
    contactBarLines[1].classList.remove('bar-bottom');
});

submitBtn.addEventListener('click', e => {
    console.log('i work');
    formSectionToHide.classList.add('contact-form-hide');
});

function clearForms() {
    visitorName.value = '';
    queryMessage.value = '';
}