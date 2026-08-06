import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../3_redux/userSlice";

function CurrentUserComponent() {
  const dispach = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${server}/api/user/current`, {
          withCredentials: true,
        });
        dispach(setUserData(res?.data?.user));
      
      } catch (error) {
        console.log(
          "Current user error:",
          error.response?.data || error.message,
        );
      }
    };
    fetchUser();
  }, []);
}

export default CurrentUserComponent;
