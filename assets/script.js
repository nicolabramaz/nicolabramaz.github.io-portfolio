// Sélectionner les éléments du DOM
const menuItems = document.querySelectorAll('.menu li');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const pagination = document.querySelector('.pagination');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu a');
const imageInfoDivs = document.querySelectorAll('.image-info');

// Constantes
const itemsPerPage = 4;
let currentPage = 1;
const totalPages = Math.ceil(menuItems.length / itemsPerPage);

// Fonctions
function updateMenuDisplay() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const menuHeight = menuItems[0].offsetHeight * itemsPerPage;

  menuItems.forEach((item, index) => {
    item.style.display = (index >= startIndex && index < endIndex) ? 'block' : 'none';
  });

  const scrollPosition = startIndex * menuItems[0].offsetHeight;
  menu.style.transform = `translateY(-${scrollPosition}px)`;

  const paginationItems = pagination.querySelectorAll('span');
  paginationItems.forEach((item, index) => {
    item.classList.toggle('active', index === currentPage - 1);
  });
}

function createPaginationItems() {
  for (let i = 0; i < totalPages; i++) {
    const paginationItem = document.createElement('span');
    paginationItem.addEventListener('click', () => {
      currentPage = i + 1;
      updateMenuDisplay();
    });
    pagination.appendChild(paginationItem);
  }
}

function handlePrevClick() {
  if (currentPage > 1) {
    currentPage--;
    updateMenuDisplay();
  }
}

function handleNextClick() {
  if (currentPage < totalPages) {
    currentPage++;
    updateMenuDisplay();
  }
}

function handleWheelEvent(event) {
  if (event.deltaY > 0 && currentPage < totalPages) {
    currentPage++;
    updateMenuDisplay();
  } else if (event.deltaY < 0 && currentPage > 1) {
    currentPage--;
    updateMenuDisplay();
  }
}

function showDiv(divId) {
  imageInfoDivs.forEach(div => {
    div.style.display = (div.id === divId) ? 'flex' : 'none';
    if (div.id === divId) {
      div.style.flexDirection = 'column';
      div.style.justifyContent = 'center';
      div.style.alignItems = 'center';
      div.style.height = '100vh';
      const coverImage = div.querySelector('.cover-image');
      coverImage.style.width = '100%';
      coverImage.style.height = 'auto';
      coverImage.style.maxHeight = '80vh';
    }
  });

  menuLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${divId}`);
  });
}

function handleMenuLinkClick(event) {
  event.preventDefault();
  const divId = event.target.getAttribute('href').substring(1);
  showDiv(divId);
}

// Événements
prevBtn.addEventListener('click', handlePrevClick);
nextBtn.addEventListener('click', handleNextClick);
document.addEventListener('wheel', handleWheelEvent);
createPaginationItems();
updateMenuDisplay();

menuLinks.forEach(link => {
  link.addEventListener('click', handleMenuLinkClick);
});

showDiv('FirstImg');

document.addEventListener("DOMContentLoaded", function () {
  // Lightbox
  var lightbox = document.getElementById("lightbox");
  var ouvrirLightbox = document.getElementById("ouvrirLightbox");
  var fermerLightbox = document.getElementsByClassName("fermer")[0];

  ouvrirLightbox.onclick = function () {
    lightbox.style.display = "block";
  };

  fermerLightbox.onclick = function () {
    lightbox.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == lightbox) {
      lightbox.style.display = "none";
    }
  };
});