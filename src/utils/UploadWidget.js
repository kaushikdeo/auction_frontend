import React, {useEffect, useRef} from 'react'
import { useMutation} from '@apollo/client';
import { UPLOAD_USER_IMAGE } from '../graphql/mutations/userMutations';

const UploadWidget = () => {
    const [uploadUserImage, { data: uploadUserImageData, loading: uploadUserImageLoading, error: uploadUserImageError }] = useMutation(UPLOAD_USER_IMAGE);
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        console.log(cloudinaryRef.current)
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dfrmnqtwi",
            uploadPreset: "auctions_app_preset"
        }, (error, result) => {
            console.log(result?.data?.info?.files)
            if (result?.data?.info?.files && result?.data?.info?.files?.length) {
                console.log(result?.data?.info?.files[0]?.uploadInfo.url)
                uploadUserImage({ variables: {imageUrl: result?.data?.info?.files[0]?.uploadInfo.url} })
            }
        })
    }, [])
    return (
        <button onClick={() => widgetRef.current.open()}>Upload Image</button>
    )
}

export default UploadWidget