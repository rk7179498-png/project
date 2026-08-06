import { useSelector } from "react-redux";

import UserHomeTab from "../5_role.user.jsx/userHomeTab";
import Owner from "../5_role.user.jsx/owner";
import DeliveryBoyTab from "../5_role.user.jsx/deliveryBoyTab";

function Home() {
  const { userData } = useSelector((state) => state.user);
  console.log(userData)
  

  return (
    <div className="min-h-screen w-full items-center">
      {userData?.role=="user" && <UserHomeTab />}
      {userData?.role=="owner" && <Owner />}
      {userData?.role=="deliveryBoy" && <DeliveryBoyTab />}
    </div>
  );
}

export default Home;