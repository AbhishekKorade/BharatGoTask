import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { base_url } from '../config/base_url';
import { useParams } from 'react-router-dom';

const ViewDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  const getSingleProduct = () => {
    axios
      .get(`${base_url}/api/v1/products/${id}`)
      .then((resp) => {
        setProduct(resp.data);
        setMainImage(resp.data.images?.[0] || ""); // Set first image as main image
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <div className="mt-28 max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col md:flex-row gap-6">
      {product ? (
        <>
         
          <div className="flex flex-col md:flex-row gap-4">
      
            <div className="flex md:flex-col gap-2">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product ${index}`}
                  className="w-24 h-24 object-cover rounded-lg cursor-pointer border-2 border-gray-300 hover:border-blue-500"
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>

          
            <div className="flex-1">
              <img
                src={mainImage}
                alt="Main Product"
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

       
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-gray-600 mt-3">{product.description}</p>
            <p className="text-2xl font-semibold text-blue-600 mt-4">${product.price}</p>

           
            <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
              Add to Cart
            </button>
          </div>
        </>
      ) : (
        <p className="text-center w-full">Loading product details...</p>
      )}
    </div>
  );
};

export default ViewDetails;
