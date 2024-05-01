import Jimp from "jimp";

export const updateImageSize = (imgPath) => {
    return Jimp.read(imgPath)
        .then((image) => {
          image.resize(250,250).writeAsync(imgPath)
          // Do stuff with the image.
        })
        .catch((err) => {
          // it should throw an error to handle it the parent component (in functions of controllers or services)
          console.log(err)
          // Handle an exception.
        });
};
