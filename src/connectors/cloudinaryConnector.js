import {Cloudinary} from "@cloudinary/url-gen";

const cloudinaryInstance = new Cloudinary({
    cloud: {
      cloudName: 'dfrmnqtwi'
    }
  });

  export default cloudinaryInstance