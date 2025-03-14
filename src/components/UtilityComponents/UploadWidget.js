import React, { useEffect, useRef, useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { UPLOAD_USER_IMAGE } from "../../graphql/mutations/userMutations";
import { Button, Image } from "antd";
import "./userUploadWidget.scss";
import { AuthContext } from "../../Context/AuthContext";


const UploadWidget = () => {
	const {user: {user}} = useContext(AuthContext)

	const cloudinaryRef = useRef();
	const widgetRef = useRef();

	const [uploadedImage, setUploadedImage] = useState(null);

	const [
		uploadUserImage,
		{
			data: uploadUserImageData,
			loading: uploadUserImageLoading,
			error: uploadUserImageError,
		},
	] = useMutation(UPLOAD_USER_IMAGE);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    console.log(cloudinaryRef.current);
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
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
        console.log(result?.data?.info?.files);
        if (result?.data?.info?.files && result?.data?.info?.files?.length) {
          console.log(result?.data?.info?.files[0]?.uploadInfo.secure_url);
          setUploadedImage(result?.data?.info?.files[0]?.uploadInfo.url);
          uploadUserImage({
            variables: {
              imageUrl: result?.data?.info?.files[0]?.uploadInfo.url,
            },
          });
        }
      }
    );
  }, [user]);

	useEffect(() => {
		if (user?.imageUrl) {
			setUploadedImage(user.imageUrl)
		}
	}, [user])

  if (uploadedImage) {
    return (
      <div className="uploadWidgetStyles">
        <Image width={200} src={uploadedImage} />
      </div>
    );
  } else {
    return (
      <div
        className="uploadWidgetStyles"
        onClick={() => widgetRef.current.open()}
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

export default UploadWidget;
