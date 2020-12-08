const BASE_URL = 'https://tzfrontend.herokuapp.com';

export const getImagesList = () => {
  return fetch(`${BASE_URL}/images/`)
    .then(response => response.json())
}

export const getImage = (imageId) => {
  return fetch(`${BASE_URL}/images/${imageId}`)
    .then(response => response.json())
}


export const getComments = (imageId) => {
  return fetch(`${BASE_URL}/comments/${imageId}`)
    .then(response => response.json())
}

export function addComment(name, description, imageId) {
  return fetch(`${BASE_URL}/comments/add`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      description,
      image_id: imageId
    }),
  });
}