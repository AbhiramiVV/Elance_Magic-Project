import React, { useState, useEffect } from "react";
import axios from "../../instance/axios";

import { useAuthContext } from "../../Hooks/useAuthContext";
import { ResponsiveBar } from '@nivo/bar'
import { toast } from "react-toastify";
import { ResponsivePie } from "@nivo/pie";
import Adminsidebar from '../../Component/Adminsidebar'



function Dashboard() {
  const { admin } = useAuthContext();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDash();
  }, []);

  const getDash = async () => {
    try {
      const response = await axios.get("/vendor/getall", {
        headers: {
          Authorization: `${admin.token}`,
        },
      });

      setDashboardData(response.data);
 
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };


  const BarChart = () => {
    const data = [
      {
        day:"MakeUp",
        degress:dashboardData?.makecount
      },
      {
        day: "Catering",
        degress: dashboardData?.catercount
      },
      {
        day: "Venue",
        degress: dashboardData?.venuecount
      },
      {
        day: "Decor",
        degress: dashboardData?.Decorcount
      },
      {
        day: "Photographer",
        degress: dashboardData?.photocount
      },
      {
        day: "Total Managers",
        degress: dashboardData?.admin
      },
     
      
    ];
  
    return (
      <div>
        <h3 className="text-3xl font-bold dark:text-white">Analysis chart</h3>
        <div style={{ height: "400px" }}>
          <ResponsiveBar
            data={data}
            keys={["degress"]}
            indexBy="day"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.4}
            valueScale={{ type: "linear" }}
            colors="#3182CE"
            animate={true}
            enableLabel={false}
            axisTop={null}
            axisRight={null}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "degrees",
              legendPosition: "middle",
              legendOffset: -40
            }}
          />
        </div>
      </div>
    );
  };
  
  const PieChart = () => {
    const data = [
    
      {
        id: "photo",
        label: "Photographer",
        value: dashboardData?.photoBookings,
        color: "hsl(90, 70%, 50%)",
      },
      {
        id: "Decor",
        label: "Decor",
        value: dashboardData?.DecorBookings,
        color: "hsl(56, 70%, 50%)",
      },
      {
        id: "Venue",
        label: "Venue",
        value: dashboardData?.VenueBookings,
        color: "hsl(103, 70%, 50%)",
      },
      {
        id: "cater",
        label: "cater",
        value: dashboardData?.CaterBookings,
        color: "hsl(103, 70%, 50%)",
      },
      {
        id: "make",
        label: "make",
        value: dashboardData?.MakeBookings,
        color: "hsl(80, 70%, 50%)",
      },

    ];
  
    return (
      <div>
        <h3 className="text-3xl font-bold dark:text-white">Total Revenue chart</h3>
        <div style={{ height: "400px" }}>
          <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          />
        </div>
      </div>
    );
  };
   return (
    <>
      <div className="flex gap-10">
       <Adminsidebar/>
        <div className="w-full h-full bg-white">
          <div className="grid grid-rows-3 gap-4 w-full h-screen mx-auto bg-white">
            <div className="bg-white mr-20 ">
              <div className="py-2">
                <section className=" py-1 bg-blueGray-50 ">
                  <div className="w-full lg:w-full px-4 mx-auto mt-6">
                    <div class="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
                      
                      <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div class="p-4 bg-blue-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-12 w-12 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                            ></path>
                          </svg>
                        </div>
                        <div class="px-4 text-gray-700">
                          <h3 class="text-md text-black  tracking-wider">Total Manager</h3>
                          <p class="text-3xl">{dashboardData?.admin}</p>
                        </div>
                      </div>
                      <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div class="p-4 bg-indigo-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-12 w-12 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                            ></path>
                          </svg>
                        </div>
                        <div class="px-4 text-gray-700">
                          <h3 class="text-md text-black  tracking-wider">Total Revenue</h3>
                          <p class="text-3xl">{dashboardData?.TotalRevenue}</p>
                        </div>
                      </div>
             
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div className="bg-white mr-20">

            <div class="grid grid-cols-2 gap-4">
    <div><PieChart /></div>
    <div><BarChart /></div>
</div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard