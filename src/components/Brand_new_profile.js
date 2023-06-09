import React, { useState, useEffect } from "react";
import SecondHeader from "./SecondHeader";
import "../assets/css/table.css";
//icons
import { CgProfile } from "react-icons/cg";
import { BiBuildings, BiCodeCurly } from "react-icons/bi";
import { FiGithub, FiPower } from "react-icons/fi";
import { MdOutlineSecurity } from "react-icons/md";
import { RiMoneyDollarCircleLine, RiSecurePaymentLine } from "react-icons/ri";
import { AiOutlineDollarCircle, AiOutlineHome } from "react-icons/ai";
import { IoIosPersonAdd } from "react-icons/io";

import Profile_information from "./Profile_information";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Github_information from "./Github_information";

import { API } from "./Constant";
import axios from "axios";
import trustimg from "../assets/images/trust.png";
import { toast } from "react-toastify";
import { GrTransaction } from "react-icons/gr";
import { ImUserTie } from "react-icons/im";
import { FaDollarSign } from "react-icons/fa";
import { GiDiamondTrophy, GiMoneyStack } from "react-icons/gi";

const Brand_new_profile = ({ children }) => {
  const [old_password, setOld_password] = useState("");
  const [new_password, setNew_password] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  const [active, setActive] = React.useState(1);
  const [activePage, setActivePage] = useState();

  const changeActivePage = () => {
    setActivePage();
  };

  const [dataTabs, setDataTabs] = useState([
    {
      id: 1,
      tabTitle: "Profile",
      tabIcon: <CgProfile size={20} />,
      tabClass: "myCustomClass",
      tabClicked: false,
      href: "/personal-details",
    },
    {
      id: 2,
      tabTitle: "Github",
      tabIcon: <FiGithub size={20} />,
      tabClass: "myCustomClass",
      tabClicked: false,
      href: "/github-details",
    },
    {
      id: 3,
      tabTitle: "Subscriptions",
      tabIcon: <RiMoneyDollarCircleLine size={20} />,
      tabClass: "myCustomClass",
      tabClicked: false,
    },
    {
      id: 4,
      tabTitle: "Domains",
      tabIcon: <BiCodeCurly size={20} />,
      tabClass: "myCustomClass",
      tabClicked: false,
    },
    {
      id: 5,
      tabTitle: "Invoice",
      tabIcon: <RiSecurePaymentLine size={20} />,
      tabClass: "myCustomClass",
      tabClicked: false,
    },
    {
      id: 6,
      tabTitle: "Security",
      tabIcon: <MdOutlineSecurity size={20} />,
      tabClass: "myCustomClass",
      tabClicked: false,
    },
    {
      id: 7,
      tabTitle: "Logout",
      tabIcon: <MdOutlineSecurity size={20} />,
      tabClass: "myCustomClass",
      tabClicked: false,
    },
  ]);

  const navigate = useNavigate();
  // ===========for personal information page  start
  const [user, setUser] = useState("");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");

  // getting data of user profile from profile api
  // console.log(setUser.length);
  async function GetUsers() {
    try {
      const response = await axios.get(`${API}/profile`, {
        withCredentials: true,
      });
      setUser(response.data.data);
      console.log(response.data.data);
      if (response.data.status !== "success") {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }
  React.useEffect(() => {
    GetUsers();
  }, []);

  // code to get user by id
  const getUserById = async () => {
    if (user._id === undefined) return;

    await axios
      .get(`${API}/getuser/${user._id}`)
      .then((res) => {
        let info = res.data;

        setName(info.name);
        setUsername(info.username);
        setEmail(info.email);
        setPhone(info.phone);
        setAddress(info.address);
        setCountry(info.country);
      })
      .catch((err) => {
        setTimeout(() => {
          console.log(err);
        }, [5000]);
      });
  };
  useEffect(() => {
    getUserById();
  }, [user._id]);
  // ==============for personal information page end

  // code to update user password
  const updatePassword = async (e) => {
    console.log(old_password, new_password, confirm_password);
    axios
      .patch(`${API}/getuser/update/password/${user._id}`, {
        old_password: old_password,
        new_password: new_password,
        confirm_password: confirm_password,
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  // code to logout user
  const HandleLogout = async () => {
    // alert prompt to confirm logout
    const confirm = window.confirm("Are you sure you want to logout?");
    if (!confirm) return;

    try {
      const response = await axios.get(`${API}/logout`, {
        withCredentials: true,
      });
      console.log(response);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  // code to get transaction history of user
  const [transactions, setTransactions] = useState([]);
  const getTransactions = async () => {
    const F_email = user.email;
    await axios
      .get(`${API}/orders/email/${F_email}`)
      .then((res) => {
        setTransactions(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("changes");
    if (user.email === undefined) return;
    getTransactions();
  }, [user]);

 
  return (
    <div>
      <SecondHeader />
      <div className="w-full md:flex">
        <div className="w-[250px]">
          <div className="w-[250px] overflow-x:-hidden bg-[#fff] mt-16 border h-[100vh] fixed">
            <div className="w-full px-[24px] flex items-center"></div>
            <hr className="border" />
            <div className="py-[10px] ">
              <ul className="w-full ">
                <li onClick={() => setActive(1)}>
                  <div
                    className={
                      active === 1
                        ? "flex justify-start items-center my-[10px] h-[35px] px-[15px] cursor-pointer font-semibold bg-[#165461] text-white"
                        : "flex justify-start items-center my-[10px] h-[35px] px-[15px] cursor-pointer font-semibold"
                    }
                  >
                    <div className="mr-[10px]">
                      <CgProfile size={20} />
                    </div>
                    <div className="text-[18px] ">Profile</div>
                  </div>
                </li>

                <li onClick={() => setActive(2)}>
                  <div
                    className={
                      active === 2
                        ? "flex justify-start items-center my-[10px] h-[35px] px-[15px] cursor-pointer font-semibold  bg-[#165461] text-white"
                        : "flex justify-start items-center my-[10px] h-[35px] px-[15px] cursor-pointer font-semibold"
                    }
                  >
                    <div className="mr-[10px]">
                      <FiGithub size={20} />
                    </div>
                    <div className="text-[18px] ">Github</div>
                  </div>
                </li>

                <li onClick={() => setActive(3)}>
                  <div
                    className={
                      active === 3
                        ? "flex justify-start items-center my-[10px] h-[35px] px-[15px] cursor-pointer font-semibold  bg-[#165461] text-white"
                        : "flex justify-start items-center my-[10px] h-[35px] px-[15px] cursor-pointer font-semibold"
                    }
                  >
                    <div className="mr-[10px]">
                      <RiMoneyDollarCircleLine size={20} />
                    </div>
                    <div className="text-[18px] ">Subscriptions</div>
                  </div>
                </li>

                <li onClick={() => setActive(4)}>
                  <div
                    className={
                      active === 4
                        ? "flex justify-start items-center my-[10px] h-[35px] px-[15px] cursor-pointer font-semibold  bg-[#165461] text-white"
                        : "flex justify-start items-center my-[10px] h-[35px] px-[15px] cursor-pointer font-semibold"
                    }
                  >
                    <div className="mr-[10px]">
                      <BiCodeCurly size={20} />
                    </div>
                    <div className="text-[18px] ">Domains</div>
                  </div>
                </li>
                <li onClick={() => setActive(7)}>
                  <div
                    className={
                      active === 7
                        ? "flex justify-start items-center my-[10px] h-[35px] px-[15px] cursor-pointer font-semibold  bg-[#165461] text-white"
                        : "flex justify-start items-center my-[10px] h-[35px] px-[15px] cursor-pointer font-semibold"
                    }
                  >
                    <div className="mr-[10px]">
                      <GrTransaction size={20} />
                    </div>
                    <div className="text-[18px] ">Transaction</div>
                  </div>
                </li>
                <li onClick={() => setActive(5)}>
                  <div
                    className={
                      active === 5
                        ? "flex justify-start items-center my-[10px] h-[35px] px-[15px] cursor-pointer font-semibold  bg-[#165461] text-white"
                        : "flex justify-start items-center my-[10px] h-[35px] px-[15px] cursor-pointer font-semibold"
                    }
                  >
                    <div className="mr-[10px]">
                      <RiSecurePaymentLine size={20} />
                    </div>
                    <div className="text-[18px] ">Invoice</div>
                  </div>
                </li>

                <li onClick={() => setActive(6)}>
                  <div
                    className={
                      active === 6
                        ? "flex justify-start items-center my-[10px] h-[35px] px-[15px] cursor-pointer font-semibold  bg-[#165461] text-white"
                        : "flex justify-start items-center my-[10px] h-[35px] px-[15px] cursor-pointer font-semibold"
                    }
                  >
                    <div className="mr-[10px]">
                      <MdOutlineSecurity size={20} />
                    </div>
                    <div className="text-[18px] ">Security</div>
                  </div>
                </li>
                <li onClick={() => HandleLogout()}>
                  <div
                    className={
                      active === 8
                        ? "flex justify-start items-center my-[10px] h-[35px] px-[15px] cursor-pointer font-semibold  bg-[#165461] text-white"
                        : "flex justify-start items-center my-[10px] h-[35px] px-[15px] cursor-pointer font-semibold"
                    }
                  >
                    <div className="mr-[10px]">
                      <FiPower size={20} />
                    </div>
                    <div className="text-[18px] ">Logout</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={active === 1 ? "grow shrink pt-16" : "hidden"}>
          {/* =============profile information start============ */}
          <div className="p-2 sm:p-8 w-full  ">
            <div className="p-3 px-2  rounded-md">
              <div className="flex justify-between px-2 items-center w-full">
                <div className="flex w-1/2 ">
                  <div className="bg-[#28C270] w-[50px] h-[50px] flex rounded-md justify-center items-center ">
                    <ImUserTie className="text-white text-2xl" />
                  </div>
                  <div className="ml-[20px]">
                    <h1 className="text-xl font-semibold ">Profile</h1>
                    <p className="font-semibold">Data</p>
                  </div>
                </div>
                <div>
                  <button className="btn btn-sm  rounded-none">
                    Make Payment
                  </button>
                </div>
              </div>
              <hr className="my-2" />
              <div className="md:flex items-center md:mt-8 justify-between ">
                <div className="p-2 border w-[300px]  ">
                  <div className="flex items-center justify-between">
                    <div className="text-[#333] font-semibold text-[20px]">
                      Current Balance
                    </div>
                    <div>
                      <AiOutlineDollarCircle size={25} />
                    </div>
                  </div>
                  <hr className="my-2" />
                  <div>
                    <div
                      className="w-[180px]  p-2 text-[30px]  font-bold text-left  "
                      style={{
                        background:
                          "linear-gradient(to right, #b2ff42 0%, #0d8773 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      $333
                    </div>
                  </div>
                </div>
                <div className="p-2 border w-[300px]  ">
                  <div className="flex items-center justify-between">
                    <div className="text-[#333] font-semibold text-[20px]">
                      Rewards
                    </div>
                    <div>
                      <GiDiamondTrophy size={25} />
                    </div>
                  </div>
                  <hr className="my-2" />
                  <div>
                    <div
                      className="w-[180px]  p-2 text-[30px]  font-bold text-left  "
                      style={{
                        background:
                          "linear-gradient(to right, #b2ff42 0%, #0d8773 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      $100
                    </div>
                  </div>
                </div>
                <div className="p-2 border w-[300px]  ">
                  <div className="flex items-center justify-between">
                    <div className="text-[#333] font-semibold text-[20px]">
                      Last Debited
                    </div>
                    <div>
                      <GiMoneyStack size={25} />
                    </div>
                  </div>
                  <hr className="my-2" />
                  <div>
                    <div className="w-[180px]  p-2 text-[30px] text-red-600 font-bold text-left  ">
                      $14
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =========input fields start==== */}

            <div className=" md:flex mt-12 lg:flex">
              <div className="mt-4 w-full px-4">
                <div className="font-semibold">Uniquekey</div>
                <div>
                  <input
                    type="text"
                    value={user.uniqueKey}
                    className="input input-bordered w-full  border-[#5CA2D6]  rounded max-w-xl focus:outline-none  sm:p-3 md:h-[36px]"
                    readOnly
                  />
                </div>
              </div>
              <div className="mt-4 w-full px-4">
                <div className="font-semibold">Username</div>
                <div>
                  <input
                    type="text"
                    value={user.username}
                    className="input input-bordered w-full  border-[#5CA2D6]  rounded max-w-xl focus:outline-none sm:p-3 md:h-[36px]"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="md:flex lg:flex">
              <div className="mt-4 w-full px-4">
                <div className="font-semibold">Email</div>
                <div>
                  <input
                    type="text"
                    value={user.email}
                    className="input input-bordered w-full  border-[#5CA2D6]  rounded max-w-xl focus:outline-none sm:p-3 md:h-[36px]"
                    readOnly
                  />
                </div>
              </div>
              <div className="mt-4 w-full px-4">
                <div className="font-semibold">Phone</div>
                <div>
                  <input
                    type="text"
                    value={user.phone}
                    className="input input-bordered w-full  border-[#5CA2D6]  rounded max-w-xl focus:outline-none sm:p-3 md:h-[36px]"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="md:flex lg:flex">
              <div className="mt-4 w-full px-4">
                <div className="font-semibold">Country</div>
                <div>
                  <input
                    type="text"
                    value={user.country}
                    className="input input-bordered w-full  border-[#5CA2D6]  rounded max-w-xl focus:outline-none sm:p-3 md:h-[36px]"
                    readOnly
                  />
                </div>
              </div>
              <div className="mt-4 w-full px-4">
                <div className="font-semibold">Address</div>
                <div>
                  <input
                    type="text"
                    value={user.address}
                    className="input input-bordered w-full border-[#5CA2D6]  rounded max-w-xl focus:outline-none sm:p-3 md:h-[36px]"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div>{/* <SubscibedPlan /> */}</div>
          </div>
          {/* =============profile information end============ */}
        </div>

        <div className={active === 2 ? "grow shrink pt-16" : "hidden"}>
          {/* =========github information starts here========= */}
          <div className="flex flex-col md:p-32 p-8 justify-center items-center w-full   ">
            <div className="w-[150px] h-[150px]">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1409/1409819.png"
                className="w-[100%] h-[100%]"
              />
            </div>
            <div className="md:text-gray-600 font-bold md:text-[30px] text-[20px]">
              We are working on this page
            </div>
            <div className="md:text-gray-600 font-bold md:text-[27px] text-[19px]">
              This will be available soon
            </div>
            <div className="md:text-gray-600 font-bold md:text-[22px] text-[17px] md:mt-8">
              We will notify you....
            </div>
          </div>
          {/* =========github information end here========= */}
        </div>

        <div className={active == 3 ? "grow shrink pt-16" : "hidden"}>
          <section className="p-6 sm:p-10 w-full ">
            <div>
              <div className="flex">
                <div className="bg-[#28C270] w-[50px] h-[50px] flex rounded-md justify-center items-center ">
                  <AiOutlineHome className="text-white text-2xl" />
                </div>
                <div className="ml-[20px]">
                  <h1 className="text-xl font-semibold ">Taxi Ride</h1>
                  <p className="font-semibold">Summary</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-between md:justify-around lg:justify-between mt-4">
                <div className="flex justify-between w-full sm:w-[300px] md:w-[250px] xl:w-[23%] rounded-md shadow-md p-4 mt-4 border">
                  <div className="">
                    <p>Approved drivers</p>
                    <h1 className="text-lg font-bold">256</h1>
                  </div>
                  <div className="shadow-md rounded-full flex justify-center border items-center w-[50px] h-[50px] ">
                    <IoIosPersonAdd size={30} className="text-[#28C270]" />
                  </div>
                </div>
                <div className="flex justify-between w-full sm:w-[300px] md:w-[250px] xl:w-[23%] rounded-md shadow-md p-4 mt-4 border">
                  <div className="">
                    <p>Active drivers</p>
                    <h1 className="text-lg font-bold">256</h1>
                  </div>
                  <div className="shadow-md rounded-full flex justify-center border items-center w-[50px] h-[50px] ">
                    <IoIosPersonAdd size={30} className="text-[#28C270]" />
                  </div>
                </div>
                <div className="flex justify-between w-full sm:w-[300px] md:w-[250px] xl:w-[23%] rounded-md shadow-md p-4 mt-4 border">
                  <div className="">
                    <p>Unapproved drivers</p>
                    <h1 className="text-lg font-bold">256</h1>
                  </div>
                  <div className="shadow-md rounded-full flex justify-center border items-center w-[50px] h-[50px] ">
                    <IoIosPersonAdd size={30} className="text-[#28C270]" />
                  </div>
                </div>
                <div className="flex justify-between w-full sm:w-[300px] md:w-[250px] xl:w-[23%] rounded-md shadow-md p-4 mt-4 border">
                  <div className="">
                    <p>Earnings</p>
                    <h1 className="text-lg font-bold">256</h1>
                  </div>
                  <div className="shadow-md rounded-full flex justify-center border items-center w-[50px] h-[50px] ">
                    <IoIosPersonAdd size={30} className="text-[#28C270]" />
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4">
                <div className="font-semibold">
                  Last 7-Days Taxi Ride Statics
                </div>
              </div>
              <div className="flex flex-wrap justify-between md:justify-around lg:justify-between mt-3">
                <div className="flex justify-between w-full sm:w-[300px] md:w-[250px] xl:w-[23%] rounded-md shadow-md p-4 mt-3 border">
                  <div className="">
                    <p>Total Rides</p>
                    <h1 className="text-lg font-bold">256</h1>
                  </div>
                  <div className="shadow-md rounded-full flex justify-center border items-center w-[50px] h-[50px] ">
                    <IoIosPersonAdd size={30} className="text-[#28C270]" />
                  </div>
                </div>
                <div className="flex  justify-between w-full sm:w-[300px] md:w-[250px] xl:w-[23%] rounded-md shadow-md p-4 mt-3 border">
                  <div className="">
                    <p>Completed Rides</p>
                    <h1 className="text-lg font-bold">256</h1>
                  </div>
                  <div className="shadow-md rounded-full flex justify-center border items-center w-[50px] h-[50px] ">
                    <IoIosPersonAdd size={30} className="text-[#28C270]" />
                  </div>
                </div>
                <div className="flex justify-between w-full sm:w-[300px] md:w-[250px] xl:w-[23%] rounded-md shadow-md p-4 mt-3 border">
                  <div className="">
                    <p>Running Rides</p>
                    <h1 className="text-lg font-bold">256</h1>
                  </div>
                  <div className="shadow-md rounded-full flex justify-center border items-center w-[50px] h-[50px] ">
                    <IoIosPersonAdd size={30} className="text-[#28C270]" />
                  </div>
                </div>
                <div className="flex justify-between w-full sm:w-[300px] md:w-[250px] xl:w-[23%] rounded-md shadow-md p-4 mt-3 border">
                  <div className="">
                    <p>Cancelled Rides</p>
                    <h1 className="text-lg font-bold">256</h1>
                  </div>
                  <div className="shadow-md rounded-full flex justify-center border items-center w-[50px] h-[50px] ">
                    <IoIosPersonAdd size={30} className="text-[#28C270]" />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-between mt-5">
                <div className="p-4 w-full md:w-[47%] border shadow-md">
                  <div className="text-xl font-semibold border-b-2">
                    Ride status
                  </div>
                  <div></div>
                </div>
                <div className="p-4 w-full md:w-[47%] border mt-4 md:mt-0 shadow-md">
                  <div className="text-xl font-semibold border-b-2">
                    Driver statistics
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className={active == 4 ? "grow shrink pt-16" : "hidden"}>
          <section className="p-8 sm:p-10 w-full">
            <div className="w-full">
              <div className="flex ">
                <div className="bg-[#28C270] w-[50px] h-[50px] flex rounded-md justify-center items-center ">
                  <AiOutlineHome className="text-white text-2xl" />
                </div>
                <div className="ml-[20px]">
                  <h1 className="text-xl font-semibold ">
                    Manual ride booking
                  </h1>
                  <p className="font-semibold">
                    Manual ride booking of taxi ride
                  </p>
                </div>
              </div>
              <div className=" shadow-md border mt-4 p-4">
                <div className="text-xl font-bold tracking-wider">
                  Customer details
                </div>
                <div className="flex flex-wrap justify-between">
                  <div className="sm:w-full sm:flex sm:justify-between md:flex md:flex-col md:w-[400px] px-2 py-3 w-full">
                    <label
                      for="Contact number"
                      className="text-xl font-semibold py-2"
                    >
                      Contact number
                    </label>
                    <input
                      type="text"
                      placeholder="Contact number"
                      className="p-2 input input-bordered rounded-none outline-none input-info w-full  md:max-w-md h-10"
                    />
                  </div>
                  <div className="sm:w-full sm:flex sm:justify-between md:flex md:flex-col md:w-[400px] px-2 py-3 w-full">
                    <label
                      for="customer name"
                      className="text-xl font-semibold py-2"
                    >
                      customer name
                    </label>
                    <input
                      type="text"
                      placeholder="customer name"
                      className="p-2 input input-bordered rounded-none outline-none input-info w-full  md:max-w-md h-10"
                    />
                  </div>
                  <div className="sm:w-full sm:flex sm:justify-between md:flex md:flex-col md:w-[400px] px-2 py-3 w-full">
                    <label
                      for="customer email"
                      className="text-xl font-semibold py-2"
                    >
                      customer email
                    </label>
                    <input
                      type="text"
                      placeholder="customer email"
                      className="p-2 input input-bordered rounded-none outline-none input-info w-full  md:max-w-md h-10"
                    />
                  </div>
                </div>
              </div>

              <div className="shadow-md border mt-4">
                <div className="text-xl font-bold tracking-wider p-4">
                  Ride details of taxi ride
                </div>
                <div className="md:flex w-full">
                  <div className="w-full md:w-1/2 py-2">
                    <div className="sm:w-full sm:justify-between md:flex md:flex-col px-4 py-2 w-full">
                      <label
                        for="Pickup Address"
                        className="text-xl font-semibold py-2"
                      >
                        Pickup Address
                      </label>
                      <input
                        type="text"
                        placeholder=" Enter Pickup Address"
                        className="p-2 input input-bordered rounded-none outline-none input-info w-full h-10"
                      />
                    </div>
                    <div className="sm:w-full sm:justify-between md:flex md:flex-col px-4 py-2 w-full">
                      <label
                        for="Destination Address"
                        className="text-xl font-semibold py-2"
                      >
                        Destination Address
                      </label>
                      <input
                        type="text"
                        placeholder=" Enter Destination Address"
                        className="p-2 input input-bordered rounded-none outline-none input-info w-full h-10"
                      />
                    </div>
                    <div className="sm:w-full sm:justify-between md:flex md:flex-col px-4 py-2 w-full">
                      <label
                        htmlFor="pickup date"
                        className="text-xl font-semibold py-2"
                      >
                        Pickup date
                      </label>
                      <input
                        type="date"
                        className="p-2 input input-bordered rounded-none outline-none input-info w-full  h-10"
                      />
                    </div>
                    <div className="sm:w-full sm:justify-between md:flex md:flex-col px-4 py-2 w-full ">
                      <label
                        htmlFor="pickup date"
                        className="text-xl font-semibold py-2"
                      >
                        Pickup date
                      </label>
                      <input
                        type="time"
                        className="p-2 input input-bordered rounded-none outline-none input-info w-full  h-10"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 mt-4 -z-10 relative min-h-[400px]"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className={active == 5 ? "grow p-8 shrink mt-16" : "hidden"}>
          <div className="">
            {/* payment history card */}
            <div className="flex items-center">
              <div className="bg-[#28C270]  w-[50px] h-[50px] flex rounded-md justify-center items-center ">
                <AiOutlineDollarCircle className="text-white text-2xl" />
              </div>
              <div className="text-black font-semibold ml-4 text-[20px]">
                Invoice
              </div>
            </div>
            <hr className="my-2" />
            <div className="md:flex     md:mt-8 mt-4">
              <div className="md:w-[330px] w-[250px] border p-4">
                <div className="font-bold text-black text-[20px]">Premium</div>
                <div className="flex mt-2 items-center justify-between">
                  <div>Duration</div>
                  <div>1 Year</div>
                </div>
                <div className="flex mt-2 items-center justify-between">
                  <div>My Payment</div>
                  <div> $154</div>
                </div>

                <div className="flex mt-2 items-center justify-between">
                  <div>Purchase Date</div>
                  <div>14/1/2023</div>
                </div>
                <div className="flex mt-2 items-center justify-between">
                  <div>Expiry Date</div>
                  <div>14/1/2024</div>
                </div>
              </div>
              <div className="md:w-[330px] w-[250px] ml-8 border p-4">
                <div className="font-bold text-black text-[20px]">
                  My Wallet
                </div>
                <div className="flex mt-2 items-center justify-between">
                  <div>Balance</div>
                  <div>$85</div>
                </div>
                <div className="flex mt-2 items-center justify-between">
                  <div>Time Left</div>
                  <div> 5 months</div>
                </div>

                <div className="flex mt-2 items-center justify-between">
                  <div>Purchase Date</div>
                  <div>14/1/2023</div>
                </div>
                <div className="flex mt-2 items-center justify-between">
                  <div>Expiry Date</div>
                  <div>14/1/2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={active == 6 ? "grow p-8 shrink mt-16" : "hidden"}>
          <div className="">
            <div className="font-semibold text-black">Change Password</div>
            <hr className="my-2" />
          </div>
          <div className="flex mt-6 items-center">
            <div className="text-black w-[15%]">Old password</div>
            <div className="w-[85%]">
              <input
                type="password"
                className="input input-bordered w-full"
                value={old_password}
                onChange={(e) => setOld_password(e.target.value)}
              />
            </div>
          </div>
          <div className="flex mt-6 items-center">
            <div className="text-black w-[15%]">New password</div>
            <div className="w-[85%]">
              <input
                type="password"
                className="input input-bordered w-full"
                value={new_password}
                onChange={(e) => setNew_password(e.target.value)}
              />
            </div>
          </div>
          <div className="flex mt-6 items-center">
            <div className="text-black w-[15%]">Confirm password</div>
            <div className="w-[85%]">
              <input
                type="password"
                className="input input-bordered w-full"
                value={confirm_password}
                onChange={(e) => setConfirm_password(e.target.value)}
              />
            </div>
          </div>
          <div className="flex mt-6 justify-center items-center">
            <button
              className="btn bg-[#165461] "
              onClick={() => updatePassword()}
            >
              Change Password
            </button>
          </div>
        </div>
        <div className={active == 7 ? "grow p-8 shrink mt-16" : "hidden"}>
          <div className="flex items-center">
            <div className="bg-[#28C270]  w-[50px] h-[50px] flex rounded-md justify-center items-center ">
              <AiOutlineDollarCircle className="text-white text-2xl" />
            </div>
            <div className="text-black font-semibold ml-4 text-[20px]">
              Transaction History
            </div>
          </div>
          <hr className="my-2" />
          <div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-center">ID</th>
                  <th>Plan Slug</th>
                  <th>Purchase Date</th>
                  <th>Start Date</th>
                  <th>Expiry Date</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item, index) => {
                  return (
                    <>
                      <tr key={item.id}>
                        <td data-column="Plan Slug" className="text-center">
                          {/* print 1,2,3 */}
                          {index + 1}
                        </td>
                        <td data-column="Plan Slug">{item.product_slug}</td>
                        <td data-column="Purchase Date">
                          {item.date.split("T")[0]}
                        </td>
                        <td data-column="Start Date">
                          {item.plan_start_date.split("T")[0]}
                        </td>
                        <td data-column="Expiry Date">
                          {item.plan_expiry_date.split("T")[0]}
                        </td>

                        <td data-column="Twitter" className="text-center">
                          {item.product_price}
                        </td>
                        <td data-column="Twitter">
                          {item.product_price == 880
                            ? "Basic"
                            : item.product_price == 2320
                            ? "Popular"
                            : item.product_price == 9200
                            ? "Premium"
                            : null}
                        </td>
                        <td data-column="Twitter">{item.city}</td>
                        <td data-column="Twitter">
                          {item.payment_Status == "success" ? (
                            <div className="bg-green-400 text-white p-2 text-center rounded-3xl">
                              Active
                            </div>
                          ) : (
                            <div className="bg-red-400 text-white p-2 text-center rounded-3xl">
                              Un-Active
                            </div>
                          )}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand_new_profile;
