import { useEffect} from "react";
import axios from "axios";
import { server } from "../App";
import { useDispatch } from "react-redux";
import {  setMyShopData } from "../3_redux/shopSlice";

function ShopGetData() {
  const dispach = useDispatch();
  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await axios.get(`${server}/api/shop/My-Shop`, {
          withCredentials: true,
        });
        dispach(setMyShopData(res?.data?.user));
      
      } catch (error) {
        console.log(
          "Current user error:",
          error.response?.data || error.message,
        );
      }
    };
    fetchOwner();
  }, []);
}

export default ShopGetData;
