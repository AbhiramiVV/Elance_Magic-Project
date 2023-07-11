import React, { useState, useEffect } from "react";
import axios from "../../instance/axios";
import Superadminbar from "../../Component/Superadminbar";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { ResponsiveBar } from '@nivo/bar'
import { toast } from "react-toastify";
import { ResponsivePie } from "@nivo/pie";

function Dashboard() {
  const { superadmin } = useAuthContext();

  const [dashboardData, setDashboardData] = useState(null);
 

  useEffect(() => {
    getDash();
  }, []);

  const getDash = async () => {
    try {
      const response = await axios.get("/superadmin/getall", {
        headers: {
          Authorization: `${superadmin.token}`,
        },
      });

      setDashboardData(response.data);
      console.log(dashboardData)
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };


  const BarChart = () => {
    const data = [
      {
        day: "Catering",
        degress: dashboardData?.catercount
      },
      {
        day: "Makeup",
        degress: dashboardData?.makecount
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
        day: "Mnagers",
        degress: dashboardData?.admin
      },
      {
        day: "User",
        degress: dashboardData?.countuser
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
        id: "make",
        label: "make",
        value: dashboardData?.MakeBookings,
        color: "hsl(80, 70%, 50%)",
      },
      {
        id: "photo",
        label: "Photographer",
        value: dashboardData?.photoBookings,
        color: "hsl(90, 70%, 50%)",
      },
      {
        id: "venue",
        label: "Decor",
        value: dashboardData?.DecorBookings,
        color: "hsl(56, 70%, 50%)",
      },
      {
        id: "decor",
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
      <div className="flex">
        <Superadminbar />
        <div className="w-full h-full bg-white">
          <div className="grid grid-rows-3 gap-4 w-full h-screen mx-auto bg-white">
            <div className="bg-white mr-20 ">
              <div className="py-2">
                <section className=" py-1 bg-blueGray-50 ">
                  <div className="w-full lg:w-full px-4 mx-auto mt-6">
                    <div class="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
                      <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div class="p-4 bg-green-400">
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
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            ></path>
                          </svg>
                        </div>
                        <div class="px-4 text-gray-700">
                          <h3 class="text-md text-black  tracking-wider">Total User</h3>
                          <p class="text-3xl"> {dashboardData?.countuser}</p>
                        </div>
                      </div>
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
        d="M12 4C6.48 4 2 8.48 2 14c0 1.65.41 3.22 1.12 4.6L12 22l8.88-3.4C21.59 17.22 22 15.65 22 14c0-5.52-4.48-10-10-10zm0 16l-4-4h8l-4 4zm0-6a2 2 0 100-4 2 2 0 000 4z"
      ></path>
    </svg>
  </div>
  <div class="px-4 text-gray-700">
    <h3 class="text-md text-black tracking-wider">Total Managers</h3>
    <p class="text-3xl">{dashboardData?.admin}</p>
  </div>
</div>

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
                          <h3 class="text-md text-black tracking-wider">Total Orders</h3>
                          <p class="text-3xl">{dashboardData?.Orders}</p>
                        </div>
                      </div>
                      <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
  <div class="p-4 bg-yellow-500">
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
        d="M12 10h7a2 2 0 012 2v7a2 2 0 01-2 2h-7a2 2 0 01-2-2v-7a2 2 0 012-2zm-4 0H5a2 2 0 012-2V5a2 2 0 012-2h3M9 14H5m0 0v3m0-3h3m9.707-7.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L12 6.414l2.293 2.293a1 1 0 001.414-1.414z"
      ></path>
    </svg>
  </div>
  <div class="px-4 text-gray-700">
    <h3 class="text-md text-black tracking-wider">Total Revenue</h3>
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
export default Dashboard;
