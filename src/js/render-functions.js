export default function createGalleryMarkup(data) {
  return data
    .map(
      ({
        webformatURL,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
        tags,
      }) =>
        `
   <div class="gallery-item">
  <a href="${largeImageURL}" class="gallery-link">
    <img src="${webformatURL}" class="gallery-image" alt="${tags}"/>
  </a>
  <div class="gallery-info">
    <div class="info-container">
 <h4 class="info-title">Likes:</h4>
    <p class="info-p">${likes}</p>
    </div>
       <div class="info-container">
 <h4 class="info-title">Views:</h4>
    <p class="info-p">${views}</p>
    </div>
       <div class="info-container">
 <h4 class="info-title">Comments:</h4>
    <p class="info-p">${comments}</p>
    </div>
       <div class="info-container">
 <h4 class="info-title">Downloads:</h4>
    <p class="info-p">${downloads}</p>
    </div>
  </div>
</div>
        `
    )
    .join('');
}
