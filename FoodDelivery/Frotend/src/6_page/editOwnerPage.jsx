import React, { useState, useEffect } from "react";
import { PiForkKnifeFill } from "react-icons/pi";
import { FaBackward } from "react-icons/fa6";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../App";

function EditOwnerPage() {
  const { myShopData } = useSelector((state) => state.owner);
  const { myCity, myState, myAddress } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    Address: "",
  });

  const [backendImg, setBackendImg] = useState(null);
  const [frontendImg, setFrontendImg] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sync state when Redux loads data
  useEffect(() => {
    setFormData({
      name: myShopData?.name || "",
      city: myShopData?.city || myCity || "",
      state: myShopData?.state || myState || "",
      Address: myShopData?.Address || myAddress || "",
    });
    if (myShopData?.image) {
      setFrontendImg(myShopData.image);
    }
  }, [myShopData, myCity, myState, myAddress]);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (frontendImg && frontendImg.startsWith("blob:")) {
        URL.revokeObjectURL(frontendImg);
      }
    };
  }, [frontendImg]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBackendImg(file);
    setFrontendImg(URL.createObjectURL(file));
  };

  const handleForm = async (e) => {
    e.preventDefault();

    // Check if image is present when creating a new shop
    if (!myShopData?._id && !backendImg) {
      alert("Please upload a shop image!");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("state", formData.state);
      data.append("city", formData.city);
      data.append("Address", formData.Address);

      if (backendImg) {
        data.append("image", backendImg);
      }

      let response;
      if (myShopData?._id) {
        // Edit Existing Shop
        response = await axios.put(
          `${server}/api/shop/update_shop/${myShopData._id}`,
          data,
          { withCredentials: true }
        );
      } else {
        // Create New Shop
        response = await axios.post(`${server}/api/shop/creat_shop`, data, {
          withCredentials: true,
        });
      }

      console.log("Success Response:", response.data);
      alert(
        myShopData?._id
          ? "Shop updated successfully!"
          : "Shop created successfully!"
      );
    } catch (error) {
      console.error("Upload Error Details:", error);
      alert(
        error.response?.data?.message ||
          "Image upload or shop save failed. Please check backend logs."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-200 min-h-screen">
      <div className="text-red-500 p-4 cursor-pointer">
        <FaBackward size={30} />
      </div>

      <div className="max-w-lg w-full mt-8 rounded-2xl bg-white flex shadow-2xl flex-col justify-center m-auto">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-100 p-2 rounded-full mt-5">
            <PiForkKnifeFill className="w-16 h-16" />
          </div>
          <div className="font-medium text-2xl mt-2">
            {myShopData?._id ? "Edit Shop" : "Add Shop"}
          </div>
        </div>

        <form className="px-6 pb-6" onSubmit={handleForm}>
          <div>
            <label className="flex font-medium text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter shop name"
              className="w-full border-2 px-3 h-10 rounded-[10px]"
              onChange={handleInput}
              value={formData.name}
              required
            />
          </div>

          <div className="pt-3">
            <label className="flex font-medium text-sm mb-1">Shop Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border-2 px-3 py-1 rounded-[10px]"
              onChange={handleImage}
            />
            {frontendImg && (
              <div className="mt-4">
                <img
                  src={frontendImg}
                  alt="Shop Preview"
                  className="w-full h-36 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          <div className="pt-3 flex gap-3">
            <div className="w-1/2">
              <label className="flex font-medium text-sm mb-1">City</label>
              <input
                type="text"
                name="city"
                placeholder="Enter city"
                className="w-full border-2 px-3 h-10 rounded-[10px]"
                onChange={handleInput}
                value={formData.city}
                required
              />
            </div>
            <div className="w-1/2">
              <label className="flex font-medium text-sm mb-1">State</label>
              <input
                type="text"
                name="state"
                placeholder="Enter state"
                className="w-full border-2 px-3 h-10 rounded-[10px]"
                onChange={handleInput}
                value={formData.state}
                required
              />
            </div>
          </div>

          <div className="pt-3">
            <label className="flex font-medium text-sm mb-1">Address</label>
            <input
              type="text"
              name="Address"
              placeholder="Enter address"
              className="w-full border-2 px-3 h-10 rounded-[10px]"
              onChange={handleInput}
              value={formData.Address}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#ff4d2d] text-white px-6 py-2.5 font-bold mt-7 rounded-2xl transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#e63e1e]"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditOwnerPage;