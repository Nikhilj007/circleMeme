import { useEffect, useState } from "react";
import Profile from "./Profile";


function ForYou() {
    const [users,setUsers]=useState([
        {
          "id": 55,
          "unique_id": 7343301245,
          "username": "youknowme",
          "workplaceCollage": "St. Joseph's college ",
          "cityTown": "Darjeeling",
          "num_likes": 3,
          "profile_image": "https://circle.net.in/upload/64b55e138cb94.jpg",
          "like": true
        },
        {
          "id": 88,
          "unique_id": 7599142646,
          "username": "Snehith",
          "workplaceCollage": "The Nex News",
          "cityTown": "Bangalore",
          "num_likes": 0,
          "profile_image": "https://circle.net.in/upload/6487e7b6892dd.jpg",
          "like": false
        },
        {
          "id": 23,
          "unique_id": 4589251563,
          "username": "Niharika Rai",
          "workplaceCollage": "St. Joseph's college, Darjeeling",
          "cityTown": "Kolkata",
          "num_likes": 5,
          "profile_image": "https://circle.net.in/upload/647c7322c4841.jpg",
          "like": true
        },
        {
          "id": 50,
          "unique_id": 9896907851,
          "username": "BISWAJIT ACHARYA",
          "workplaceCollage": "Siliguri institute of technology ",
          "cityTown": "Kalimpong ",
          "num_likes": 7,
          "profile_image": "https://circle.net.in/upload/defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 20,
          "unique_id": 3596275283,
          "username": "Avishika Chhetri",
          "workplaceCollage": "St. Joseph college ",
          "cityTown": "Darjeeling ",
          "num_likes": 9,
          "profile_image": "https://circle.net.in/upload/defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 28,
          "unique_id": 8346807052,
          "username": "Stephen Tamang",
          "workplaceCollage": "St Joseph's College",
          "cityTown": "Darjeeling",
          "num_likes": 3,
          "profile_image": "https://circle.net.in/upload/defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 82,
          "unique_id": 7279426947,
          "username": "Bfung Hangma Limbu",
          "workplaceCollage": "St. Joseph's College, Darjeeling",
          "cityTown": "Darjeeling ",
          "num_likes": 1,
          "profile_image": "https://circle.net.in/upload/defaultProfileImg.jpg",
          "like": false
        },
        {
          "id": 19,
          "unique_id": 8168486333,
          "username": "Sardish Lepcha",
          "workplaceCollage": "City College",
          "cityTown": "Kalimpong",
          "num_likes": 6,
          "profile_image": "https://circle.net.in/upload/defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 16,
          "unique_id": 6484529848,
          "username": "Nitesh Gupta ",
          "workplaceCollage": "St. Joseph's College ",
          "cityTown": "Darjeeling",
          "num_likes": 9,
          "profile_image": "647c64c9a7b69.jpg",
          "like": true
        },
        {
          "id": 68,
          "unique_id": 9629141092,
          "username": "Sinister Mister",
          "workplaceCollage": "Xaviers",
          "cityTown": "Siliguri ",
          "num_likes": 2,
          "profile_image": "6484156a6266c.jpg",
          "like": true
        },
        {
          "id": 3,
          "unique_id": 3928844304,
          "username": "Devdip",
          "workplaceCollage": "St Joseph's College Darjeeling ",
          "cityTown": "Kolkata",
          "num_likes": 8,
          "profile_image": "647c4ee89dfd5.jpg",
          "like": true
        },
        {
          "id": 75,
          "unique_id": 6816728170,
          "username": "Pooja Sharma",
          "workplaceCollage": "St. Joseph's College",
          "cityTown": "Darjeeling",
          "num_likes": 2,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 10,
          "unique_id": 4617452324,
          "username": "Pratik Sharma",
          "workplaceCollage": "St Joseph's College, Darjeeling ",
          "cityTown": "Darjeeling ",
          "num_likes": 14,
          "profile_image": "64d4e62f4a302.jpg",
          "like": true
        },
        {
          "id": 39,
          "unique_id": 4931889730,
          "username": "Sangeet Sing",
          "workplaceCollage": "North Bengal St. Xavier's College",
          "cityTown": "Siliguri",
          "num_likes": 3,
          "profile_image": "647c968072818.jpg",
          "like": true
        },
        {
          "id": 22,
          "unique_id": 5736950574,
          "username": "Rushnik Chatterjee",
          "workplaceCollage": "St. Joseph’s College, Darjeeling ",
          "cityTown": "Kolkata ",
          "num_likes": 6,
          "profile_image": "647c6c20a8150.jpg",
          "like": true
        },
        {
          "id": 15,
          "unique_id": 8686427233,
          "username": "Pankaj Sah ",
          "workplaceCollage": "St. Joseph's College ",
          "cityTown": "Darjeeling ",
          "num_likes": 6,
          "profile_image": "647c6618baae9.jpg",
          "like": true
        },
        {
          "id": 7,
          "unique_id": 6222395523,
          "username": "Rishabh Baptish",
          "workplaceCollage": "St. Joseph's College ",
          "cityTown": "New Delhi",
          "num_likes": 17,
          "profile_image": "647c56b8e34d4.jpg",
          "like": true
        },
        {
          "id": 9,
          "unique_id": 6587533989,
          "username": "Manisha ",
          "workplaceCollage": "St Joseph's College ",
          "cityTown": "Darjeeling ",
          "num_likes": 7,
          "profile_image": "647c5c05a9c1a.jpg",
          "like": true
        },
        {
          "id": 67,
          "unique_id": 6650044812,
          "username": "Anugrah Tete",
          "workplaceCollage": "St. Joseph's College , Darjeeling ",
          "cityTown": "PATNA",
          "num_likes": 3,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 51,
          "unique_id": 4818901182,
          "username": "Random user",
          "workplaceCollage": "Random school ",
          "cityTown": "Random city ",
          "num_likes": 3,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 57,
          "unique_id": 7425802597,
          "username": "Sonali Gupta",
          "workplaceCollage": "St. Joseph's college, Darjeeling",
          "cityTown": "Darjeeling",
          "num_likes": 2,
          "profile_image": "647cd2d72696e.jpg",
          "like": true
        },
        {
          "id": 63,
          "unique_id": 6245722397,
          "username": "Md. Tauqir Alam",
          "workplaceCollage": "St. Joseph's College, Darjeeling ",
          "cityTown": "Darjeeling",
          "num_likes": 3,
          "profile_image": "647d8a0fafdf9.jpg",
          "like": true
        },
        {
          "id": 34,
          "unique_id": 3462009571,
          "username": "Ermit ",
          "workplaceCollage": "CON , North Bengal medical college ",
          "cityTown": "SILIGURI",
          "num_likes": 6,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 41,
          "unique_id": 3781859836,
          "username": "Aashish Chhetri",
          "workplaceCollage": "S.U.M.I.",
          "cityTown": "Kalimpong",
          "num_likes": 8,
          "profile_image": "647ca17e4df6f.jpg",
          "like": true
        },
        {
          "id": 87,
          "unique_id": 8419941636,
          "username": "Param Dubey",
          "workplaceCollage": "IIM Rohtak",
          "cityTown": "Surat",
          "num_likes": 1,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 24,
          "unique_id": 3125554044,
          "username": "Aakriti giri",
          "workplaceCollage": "Kalimpong college ",
          "cityTown": "kalimpong",
          "num_likes": 3,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 53,
          "unique_id": 9803290987,
          "username": "youknowme",
          "workplaceCollage": "St. Joseph's college ",
          "cityTown": "Darjeeling",
          "num_likes": 2,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 13,
          "unique_id": 8371395362,
          "username": "Anisikha",
          "workplaceCollage": "oxford",
          "cityTown": "siliguri",
          "num_likes": 3,
          "profile_image": "647c6075a24ef.jpg",
          "like": true
        },
        {
          "id": 61,
          "unique_id": 8192462548,
          "username": "Sahil",
          "workplaceCollage": "St Joseph's College, ",
          "cityTown": "Darjeeling",
          "num_likes": 2,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 12,
          "unique_id": 9236841380,
          "username": "Rincy ",
          "workplaceCollage": "Chandigarh University ",
          "cityTown": "Punjab ",
          "num_likes": 4,
          "profile_image": "647c5e6594c39.jpg",
          "like": true
        },
        {
          "id": 32,
          "unique_id": 5174092887,
          "username": "Muskan",
          "workplaceCollage": "St Joseph's College ",
          "cityTown": "Darjeeling",
          "num_likes": 3,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 73,
          "unique_id": 8003334914,
          "username": "Wilson Minj",
          "workplaceCollage": "Loyola college chennai ",
          "cityTown": "Ranchi",
          "num_likes": 2,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 8,
          "unique_id": 5468497183,
          "username": "Anshita Chettri",
          "workplaceCollage": "Work",
          "cityTown": "Kalimpong ",
          "num_likes": 5,
          "profile_image": "647c57f06d07f.jpg",
          "like": true
        },
        {
          "id": 70,
          "unique_id": 3468878744,
          "username": "Rohan Shrestha",
          "workplaceCollage": "Freelancer/Environmentalist",
          "cityTown": "Kathmandu",
          "num_likes": 4,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 40,
          "unique_id": 6372402461,
          "username": "Archana Sharma",
          "workplaceCollage": "",
          "cityTown": "",
          "num_likes": 6,
          "profile_image": "647ca6d3a867a.jpg",
          "like": true
        },
        {
          "id": 45,
          "unique_id": 6532059593,
          "username": "Abhi",
          "workplaceCollage": "Govt collage nassrulahganj",
          "cityTown": "Bhopal",
          "num_likes": 5,
          "profile_image": "647caa9f32888.jpg",
          "like": true
        },
        {
          "id": 72,
          "unique_id": 9919231646,
          "username": "Akangsha Pradhan",
          "workplaceCollage": "St.Joseph’s College",
          "cityTown": "Darjeeling",
          "num_likes": 3,
          "profile_image": "6487e7b6892dd.jpg",
          "like": true
        },
        {
          "id": 25,
          "unique_id": 9564947806,
          "username": "Anindita Chatterjee ",
          "workplaceCollage": "St Joseph's College ",
          "cityTown": "Darjeeling ",
          "num_likes": 5,
          "profile_image": "647ca903e96e5.jpg",
          "like": true
        },
        {
          "id": 56,
          "unique_id": 6716124913,
          "username": "Ritaprava Saha",
          "workplaceCollage": "THK JAIN COLLEGE",
          "cityTown": "KALYANI",
          "num_likes": 2,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 66,
          "unique_id": 1971802573,
          "username": "Rajeev ",
          "workplaceCollage": "St Joseph college ",
          "cityTown": "Darjeeling ",
          "num_likes": 3,
          "profile_image": "647d8d735d829.jpg",
          "like": true
        },
        {
          "id": 31,
          "unique_id": 7203298134,
          "username": "Sambridha Bomjan",
          "workplaceCollage": "St joseph college ",
          "cityTown": "Darjeeling",
          "num_likes": 4,
          "profile_image": "647d993d70612.jpg",
          "like": true
        },
        {
          "id": 78,
          "unique_id": 2406162542,
          "username": "Pankaj Singha",
          "workplaceCollage": "Uiet",
          "cityTown": "Siliguri ",
          "num_likes": 2,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 36,
          "unique_id": 9690800595,
          "username": "Dona Singha",
          "workplaceCollage": "Test of Knowledge",
          "cityTown": "Siliguri",
          "num_likes": 3,
          "profile_image": "647c8e2328784.jpg",
          "like": true
        },
        {
          "id": 33,
          "unique_id": 9242605864,
          "username": "Apsara lepcha ",
          "workplaceCollage": "North Bengal St Xavier's College Rajganj Jalpaiguri ",
          "cityTown": "KALIMPONG",
          "num_likes": 7,
          "profile_image": "647c84753ec4b.jpg",
          "like": true
        },
        {
          "id": 43,
          "unique_id": 4144216200,
          "username": "Namrota Paul",
          "workplaceCollage": "St. Joseph College ",
          "cityTown": "Darjeeling",
          "num_likes": 6,
          "profile_image": "647cb02c56640.jpg",
          "like": true
        },
        {
          "id": 49,
          "unique_id": 9906385858,
          "username": "Attiti Chettri",
          "workplaceCollage": "St. Joseph's College",
          "cityTown": "Town",
          "num_likes": 2,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 65,
          "unique_id": 7095568720,
          "username": "JAIJEET ORAON ",
          "workplaceCollage": "St Joseph's College ",
          "cityTown": "Ranchi ",
          "num_likes": 3,
          "profile_image": "647d8c558f7dc.jpg",
          "like": true
        },
        {
          "id": 69,
          "unique_id": 9031547814,
          "username": "Bishnu Lal Tirkey",
          "workplaceCollage": "St.marys school,morena",
          "cityTown": "Morena",
          "num_likes": 2,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 30,
          "unique_id": 5560066582,
          "username": "S",
          "workplaceCollage": "St. Joseph's college ",
          "cityTown": "Darjeeling ",
          "num_likes": 3,
          "profile_image": "647c7fef95bd9.jpg",
          "like": true
        },
        {
          "id": 6,
          "unique_id": 9109119235,
          "username": "Pritika Mishra",
          "workplaceCollage": "St. Joseph's College",
          "cityTown": "Darjeeling",
          "num_likes": 23,
          "profile_image": "647c5453a74dc.jpg",
          "like": true
        },
        {
          "id": 14,
          "unique_id": 5919780045,
          "username": "Arpana Ethel Hembrom",
          "workplaceCollage": "Home",
          "cityTown": "Barharwa",
          "num_likes": 6,
          "profile_image": "647c604081f31.jpg",
          "like": true
        },
        {
          "id": 17,
          "unique_id": 2522027578,
          "username": "Nima Thendup Dukpa",
          "workplaceCollage": "Saint Joseph collage ",
          "cityTown": "Darjeeling ",
          "num_likes": 5,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 77,
          "unique_id": 8427201718,
          "username": "Aswini Chhetri",
          "workplaceCollage": "St Joseph's College North Point ",
          "cityTown": "Darjeeling",
          "num_likes": 4,
          "profile_image": "64b55e138cb94.jpg",
          "like": true
        },
        {
          "id": 58,
          "unique_id": 1539181964,
          "username": "Dhiraj",
          "workplaceCollage": "Siliguri Colloge",
          "cityTown": "Siliguri",
          "num_likes": 3,
          "profile_image": "647cd4d798bbf.jpg",
          "like": true
        },
        {
          "id": 64,
          "unique_id": 8175204118,
          "username": "Akansha",
          "workplaceCollage": "Selesian ",
          "cityTown": "Silguri",
          "num_likes": 2,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 46,
          "unique_id": 6045668061,
          "username": "Shiwana Sharma",
          "workplaceCollage": "Koshys College of Nursing",
          "cityTown": "Bengaluru",
          "num_likes": 5,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 86,
          "unique_id": 2338389453,
          "username": "Sundararajan Sampath",
          "workplaceCollage": "",
          "cityTown": "Hyderabad",
          "num_likes": 0,
          "profile_image": "defaultProfileImg.jpg",
          "like": false
        },
        {
          "id": 47,
          "unique_id": 1292216110,
          "username": "Luma",
          "workplaceCollage": "St.Josephs College ",
          "cityTown": "Darjeeling",
          "num_likes": 1,
          "profile_image": "defaultProfileImg.jpg",
          "like": false
        },
        {
          "id": 83,
          "unique_id": 9942021560,
          "username": "Amayra ",
          "workplaceCollage": "St. Joseph's College, Darjeeling",
          "cityTown": "Siliguri",
          "num_likes": 2,
          "profile_image": "654bc0b712292.jpg",
          "like": true
        },
        {
          "id": 42,
          "unique_id": 4490121429,
          "username": "Sumit Bhowmik ",
          "workplaceCollage": "North Bengal St Xavier's College ",
          "cityTown": "JALPAIGURI",
          "num_likes": 3,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 27,
          "unique_id": 8481650371,
          "username": "Rahul kandulna",
          "workplaceCollage": "St. Joseph's College ",
          "cityTown": "Jharkhand ",
          "num_likes": 5,
          "profile_image": "647c7cfc0fc78.jpg",
          "like": true
        },
        {
          "id": 29,
          "unique_id": 2311443323,
          "username": "Sumit",
          "workplaceCollage": "School",
          "cityTown": "Dumka",
          "num_likes": 2,
          "profile_image": "647c7fa1dc990.jpg",
          "like": true
        },
        {
          "id": 54,
          "unique_id": 4017398778,
          "username": "Salini ",
          "workplaceCollage": "St. Joseph’s College",
          "cityTown": "Kalyani ",
          "num_likes": 3,
          "profile_image": "647cc5caacf15.jpg",
          "like": true
        },
        {
          "id": 79,
          "unique_id": 3618207062,
          "username": "Nikhil Jha",
          "workplaceCollage": "Panjab University Swami Sarvanand Giri Regional Centre",
          "cityTown": "Hoshiyarput",
          "num_likes": 2,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 89,
          "unique_id": 9256666050,
          "username": "Varunesh Kumar Vishwakarma",
          "workplaceCollage": "IIM Lucknow",
          "cityTown": "Gorakhpur",
          "num_likes": 0,
          "profile_image": "defaultProfileImg.jpg",
          "like": false
        },
        {
          "id": 60,
          "unique_id": 6143694343,
          "username": "Arion",
          "workplaceCollage": "St , Joseph college north point Darjeeling ",
          "cityTown": "Darjeeling ",
          "num_likes": 2,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        },
        {
          "id": 59,
          "unique_id": 7230745020,
          "username": "Riyashree Tamang",
          "workplaceCollage": "St Joseph's College ",
          "cityTown": "Town",
          "num_likes": 3,
          "profile_image": "647cd61d50f4b.jpg",
          "like": true
        },
        {
          "id": 52,
          "unique_id": 6171331121,
          "username": "wabisabi",
          "workplaceCollage": "St.Josephs College ",
          "cityTown": "Darjeeling ",
          "num_likes": 2,
          "profile_image": "defaultProfileImg.jpg",
          "like": true
        }
      ])
    // const fetchdata=async()=>{
    //     const res=await fetch('https://circle-backend-hw6e.onrender.com/api/users/2').catch((err)=>console.log(err))
    //     const data=await res.json()
    //     console.log(data)
    //     setUsers(data)
    // }
    // useEffect(()=>{
    //     console.log("hello")
    //     fetchdata()
    // },[])
    return ( 
        <div className="flex relative pb-10 flex-col items-center mt-16  p-0">
            {users.map((user,idx)=>(<Profile key={idx} user={user}/>) )}
        </div>
     );
}

export default ForYou;