import React, { useState, useEffect } from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImagePreview = async () => {
      try {
        if (featuredImage) {
          const preview = await appwriteService.getFilePreview(featuredImage);
          console.log("Image preview URL:", preview.toString());
          setImageUrl(preview.toString());
        }
      } catch (error) {
        console.error("Error fetching image preview:", error);
      }
    };

    fetchImagePreview();
  }, [featuredImage]);

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4 mb-6'>
        <div className='w-full flex justify-center mb-4'>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className='rounded-xl max-h-52 object-cover w-full sm:w-80 md:w-96 lg:w-80 xl:w-96'
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/fallback.jpg';
              }}
            />
          ) : (
            <div className="text-sm text-gray-500">Loading image...</div>
          )}
        </div>
        <h2 className='text-xl font-bold text-center text-gray-900'>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
