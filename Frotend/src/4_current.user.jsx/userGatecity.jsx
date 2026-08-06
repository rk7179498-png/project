import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMyAddress, setMyCity, setMyState } from "../3_redux/userSlice";


function UserGatecity() {
  const { userData } = useSelector((state) => state.user);
  console.log("hello city bro")
  const dispach = useDispatch();
  const geoApi = import.meta.env.VITE_GEOAPIKEY;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(longitude,latitude)
     

      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${geoApi}`,
      );
      
      console.log(result)
      dispach(setMyCity(result?.data?.results[0].city));
      dispach(
        setMyAddress(result?.data?.results[0].address_line2 || address_line1),
      );
      dispach(setMyState(result?.data?.results[0].state));
    });
  }, []);
}

export default UserGatecity;




// function UserGatecity() {
//   const { userData } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const geoApi = import.meta.env.VITE_GEOAPIKEY;

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       console.log("Geolocation is not supported.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         try {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;

//           console.log("Latitude:", latitude);
//           console.log("Longitude:", longitude);
//           console.log("User:", userData);

//           const result = await axios.get(
//             `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${geoApi}`
//           );

//           console.log(result.data);

//           const location = result.data.results[0];

//           dispatch(setMyCity(location.city || ""));
//           dispatch(
//             setMyAddress(location.address_line2 || location.address_line1 || "")
//           );
//           dispatch(setMyState(location.state || ""));
//         } catch (error) {
//           console.log("Geo API Error:", error);
//         }
//       },
//       (error) => {
//         console.log("Location Error:", error.message);
//       }
//     );
//   }, [dispatch, geoApi, userData]);

//   return null;
// }

// export default UserGatecity;