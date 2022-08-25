const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooserElement = document.querySelector('.ad-form-header__input');
const avatarPrewiewElement = document.querySelector('.ad-form-header__preview img');
const photoChooserElement = document.querySelector('.ad-form__input');
const photoPrewiewElement = document.querySelector('.ad-form__photo');

const photoImg = document.createElement('img');
photoImg.alt = 'Фотогроафия жилья';
photoImg.style.width = '70px';
photoImg.style.height = '70px';
photoPrewiewElement.append(photoImg);

const loadPhoto = (file, prewiew) => {
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    prewiew.src = URL.createObjectURL(file);
  }
};

const onAvatarLoad = () => {
  const avatarFile = avatarChooserElement.files[0];
  loadPhoto(avatarFile, avatarPrewiewElement);
};


const onPhotoLoad = () => {
  const photoFile = photoChooserElement.files[0];
  loadPhoto(photoFile, photoImg);
};

avatarChooserElement.addEventListener('change', onAvatarLoad);
photoChooserElement.addEventListener('change', onPhotoLoad);

console.log(photoPrewiewElement);
