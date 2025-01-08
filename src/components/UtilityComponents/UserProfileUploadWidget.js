import React, { useEffect, useRef, useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { UPLOAD_CUSTOM_USER_IMAGE } from "../../graphql/mutations/userMutations";
import { Button, Image } from "antd";
import "./userProfileUploadWidgetStyles.scss";

const UserProfileUploadWidget = (inputUser) => {
console.log("CUSTOMUSER", inputUser)
	const cloudinaryRefCustom = useRef();
	const widgetRefCustom = useRef();

	const [uploadedImage, setUploadedImage] = useState(null);

	const [
		uploadCustomUserImage,
		{
			data: uploadUserImageData,
			loading: uploadUserImageLoading,
			error: uploadUserImageError,
		},
	] = useMutation(UPLOAD_CUSTOM_USER_IMAGE);

  useEffect(() => {
    cloudinaryRefCustom.current = window.cloudinary;
    console.log(cloudinaryRefCustom.current);
    widgetRefCustom.current = cloudinaryRefCustom.current.createUploadWidget(
      {
        cloudName: "dfrmnqtwi",
        cropping: true,
        sources: ["local", "https://auctionsapp.netlify.app"],
        multiple: false,
        folder: "auctions",
        tags: ["profile_image"],
        context: { alt: "user_uploaded" },
        clientAllowedFormats: ["jpg", "jpeg", "png"],
        maxImageFileSize: 200000,
        uploadPreset: "auctions_app_preset",
      },
      (error, result) => {
          
          if (result?.data?.info?.files && result?.data?.info?.files?.length) {
            let vars = {
                userId: inputUser?.inputUser?.userId,
                imageUrl: result?.data?.info?.files[0]?.uploadInfo.url,
            }
            console.log("varsvarsvars", vars);
          console.log(result?.data?.info?.files[0]?.uploadInfo.secure_url);
          setUploadedImage(result?.data?.info?.files[0]?.uploadInfo.url);
          uploadCustomUserImage({
            variables: vars,
          });
        }
      }
    );
  }, [inputUser]);

    useEffect(() => {
        if (inputUser?.imageUrl) {
            setUploadedImage(inputUser.imageUrl)
        }
    }, [inputUser])

  if (uploadedImage) {
    return (
      <div className="uploadWidgetStyles">
        <Image width={inputUser?.width ? inputUser?.width : 50} height={inputUser?.height ? inputUser?.height : 50} src={uploadedImage} />
      </div>
    );
  } else {
    return (
      <div
        className="uploadWidgetStyles"
        onClick={() => widgetRefCustom.current.open()}
      >
        <div className="file-upload-wrapper">
          <label for="avatar" className="file-upload-label">
            <span className="file-text" style={{ color: "red" }}>
              Image File Should be less than 100 kb
            </span>
            <span className="file-icon">📁</span>
            <span className="file-text">Click to upload Profile Image</span>
          </label>
          <div id="progress-container">
            <div id="progress-bar"></div>
          </div>
        </div>
      </div>
    );
  }
};

export default UserProfileUploadWidget