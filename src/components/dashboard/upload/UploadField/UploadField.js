'use client';
import { UserAuth } from '@/context/AuthProvider';
import { baseUrl } from '@/utils/functions/baseUrl';
import axios from 'axios';

import { useEffect, useState } from 'react';
import { BsUpload } from 'react-icons/bs';

const UploadField = ({
  uploadedImages,
  setUploadedImages,
  orderId,
  setOrderId,
  setUploadProgress,
  setSelectedImages,
  setUploading,
  setTotalFileSize,
}) => {
  useEffect(() => {
    if (orderId === '') {
      const randomNum = Math.floor(Math.random() * 100000000);
      const randomString = String(randomNum).padStart(8, '0');
      setOrderId(randomString);
    }
  }, []);

  const { user } = UserAuth();
  const generateOrderId = async () => {
    const randomNum = Math.floor(Math.random() * 100000000);
    const randomString = String(randomNum).padStart(8, '0');
    return randomString;
  };

  // handle image upload
  const handleImageUpload = async (e) => {
    setUploading(true);
    // generate order id

    const selectedFiles = e.target.files;

    // store selected images
    const selectedFileArray = Array.from(selectedFiles);
    // calculate total size

    const totalSize = selectedFileArray.reduce(
      (acc, file) => acc + file.size,
      0
    );

    setTotalFileSize(parseFloat(totalSize / 1000000).toFixed(2));

    // generate blob urls
    const selectedImagesGeneratedUrl = selectedFileArray.map((file) =>
      URL.createObjectURL(file)
    );
    // set urls for show blob
    setSelectedImages(selectedImagesGeneratedUrl);
    // create form data
    const formData = new FormData();

    selectedFileArray.forEach((file) => formData.append('files', file));

    // get progress
    const config = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      },
    };

    // upload image to server
    try {
      const res = await axios.post(
        `${baseUrl}/image?folderName=${orderId}&bucketName=${process.env.NEXT_PUBLIC_USER_UPLOAD_IMAGE_BUCKET}`,
        formData,
        config
      );

      const data = await res.data;
      const newUploadedImages = [...uploadedImages, ...data.urls];
      setUploadedImages(newUploadedImages || []);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }

    e.target.value = '';
  };

  return (
    <div className=' '>
      <label
        htmlFor='uploadField'
        className='flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 '
      >
        <div className='flex flex-col items-center justify-center pb-6 pt-5'>
          <span className='mb-3 text-2xl'>
            <BsUpload />
          </span>
          <p className='dark:text-gray-400 mb-2 text-sm text-gray-500'>
            <span className='font-semibold'>
              Click to upload file from you computer.
            </span>
          </p>
          <p className='dark:text-gray-400 text-xs text-gray-500'>
            SVG, PNG, JPG or GIF
          </p>
        </div>
        <input
          onChange={handleImageUpload}
          id='uploadField'
          type='file'
          name='images'
          multiple
          accept='image/*'
          className='hidden'
        />
      </label>
    </div>
  );
};

export default UploadField;
