import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_url } from "../config/base_url";
import { useNavigate } from "react-router-dom";

const Furniture = () => {
  const [furniture, setFurniture] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate()
  const getAllPeoduct = () => {
    axios
      .get(`${base_url}/api/v1/products/?categoryId=3`)
      .then((resp) => {
        console.log(resp.data);
        setFurniture(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterProduct = () => {
    axios
      .get(`${base_url}/api/v1/products/?categoryId=3&title=${search}`)
      .then((resp) => {
        console.log(resp.data);
        setFurniture(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllPeoduct();
  }, []);

  useEffect(() => {
    filterProduct();
  }, [search]);

  return (
    <div className="mt-20 px-5">
      <div className=" flex justify-start">
        <input
          type="text"
          placeholder="Search..."
          className=" border border-gray-300 mb-4 outline-none rounded-sm  p-1 "
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
        {furniture.map((item, i) => {
          let parsedImages = [];

          try {
            if (Array.isArray(item.images) && item.images.length > 0) {
              if (
                typeof item.images[0] === "string" &&
                item.images[0].startsWith("[")
              ) {
                parsedImages = JSON.parse(item.images[0]);
              } else {
                parsedImages = item.images;
              }
            }
          } catch (error) {
            console.error("JSON Parsing Error:", error, item.images);
          }

          return (
            <div key={i} className="relative bg-white rounded-lg shadow-lg cursor-pointer" onClick={()=>navigate(`/viewdetails/${item.id}`)}>
              <button className="absolute flex justify-center items-center top-2 right-2 bg-gray-200 p-1 h-6 w-6 rounded-full hover:bg-gray-300">
                <span className="text-xl font-bold">+</span>
              </button>

              {parsedImages.length > 0 ? (
                <img
                  src={parsedImages[0]}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg"
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <p className="text-center text-gray-500">No Image Available</p>
              )}

              {item.category && (
                <span className="absolute bottom-18 left-2 bg-gray-300 text-black text-xs px-2 py-1 rounded-full">
                  {item.category.name}
                </span>
              )}

              <div className=" flex justify-between items-center px-3 mt-3">
                <p className=" text-sm font-semibold text-center">
                  {item.title}
                </p>

                <p className="text-sm font-bold text-right mt-1">
                  ${item.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Furniture;
