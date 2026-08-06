import { CgMenuGridO } from "react-icons/cg";
import { TbSoupFilled } from "react-icons/tb";
import { MdFreeBreakfast,MdOutlineFoodBank  } from "react-icons/md";
import { CiBowlNoodles } from "react-icons/ci";
import { GiHamburger, GiFullPizza } from "react-icons/gi";

const List =[
    {
        id:1,
        icon:<CgMenuGridO className="w-[60px] h-[60px] text-green-600 "/>,
        name:"All"
    },
    {
        id:2,
        icon:<MdFreeBreakfast className="w-[60px] h-[60px] text-green-600 "/>,
        name:"breakfast"
    },
    {
        id:3,
        icon:< TbSoupFilled className="w-[60px] h-[60px] text-green-600 "/>,
        name:"pasta"
    },
    {
        id:4,
        icon:<  CiBowlNoodles className="w-[60px] h-[60px] text-green-600 "/>,
        name:"soups"
    },
    {
        id:5,
        icon:<MdOutlineFoodBank  className="w-[60px] h-[60px] text-green-600 "/>,
        name:"main_course"
    },
    {
        id:6,
        icon:<  GiFullPizza className="w-[60px] h-[60px] text-green-600 "/>,
        name:"pizza"
    },
    {
        id:7,
        icon:<GiHamburger className="w-[60px] h-[60px] text-green-600 "/>,
        name:"burger"
    },
]

export default List



















// export default function List(){
//     return(
//         <div>
//             <div>
//                 
//             </div>
//         </div>
//     )
// }