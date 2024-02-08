import axiosInstance from "config/https";
import BirthdateFormatter from "examples/BirthdateFormatter";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function Timeline({ tenderid }) {
  const token = localStorage.getItem("token");
  const [tenderdata, settendetdata] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const result = await axiosInstance.get(`/_v1/tender/timeline/${tenderid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    settendetdata(result.data);
    console.log(tenderid);
    console.log(result.data);
  };

  return (
    <div className="p-2">
      <label className="text-lg font-semibold p-4">Timeline</label>
      {/* <div class="text-base flex mx-5 border-t border-b-2 justify-between items-center">
        <label class="border-r-2 border-l-2 p-2 text-center flex-grow">Stage</label>
        <label class="border-r-2 p-2 text-center flex-grow">CreatedOn</label>
        <label class="border-r-2 p-2 text-center flex-grow">CreatedBy</label>
      </div>
      <div className="text-base flex mx-5 border-t border-b-2 justify-between items-center">
        <label className="text-center " >Tender Created By Jay Kalariya</label>
        <label className="text-center">706595249436</label>
        <label className="text-center">Jay K Kalariya</label>
      </div> */}
      <div class="overflow-x-auto">
        <table class="table-auto min-w-full border-collapse border border-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stage
              </th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created On
              </th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created By
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {tenderdata.map((item) => (
              <tr key={item.id}>
                <td class="text-sm px-4 py-2 whitespace-nowrap">{item.stage}</td>
                <td class="text-sm px-4 py-2 whitespace-nowrap">
                  {BirthdateFormatter(item.createdOn)}
                </td>
                <td class="text-sm px-4 py-2 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={item.profileUrl}
                      alt="Profile"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span>{item.createdBy}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Timeline;
