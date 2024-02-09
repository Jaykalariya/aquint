/* eslint-disable react/jsx-key */
import axiosInstance from "config/https";
import BirthdateFormatter from "examples/BirthdateFormatter";
import TimelineItem from "examples/Timeline/TimelineItem";
import TimelineList from "examples/Timeline/TimelineList";
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
    <div className="flex flex-col h-3/4">
      <div className="overflow-auto">
        <TimelineList title="Timeline">
          {tenderdata.map((item) => (
            <TimelineItem
              key={item.id}
              icon="notifications"
              title=""
              dateTime={BirthdateFormatter(item.createdOn)}
              description={item.stage}
              badges={[
                <div className="flex items-center">
                  <img src={item.profileUrl} alt="Profile" className="w-5 h-5 rounded-full mr-2" />
                  <span>{item.createdBy}</span>
                </div>,
              ]}
            />
          ))}
        </TimelineList>
      </div>
    </div>
  );
}

export default Timeline;
