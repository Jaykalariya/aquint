/* eslint-disable react/jsx-key */
import { Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
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
    <Card id="timeline" className="flex flex-col overflow-y-auto" style={{ maxHeight: "550px" }}>
      <SoftBox mt={2} pl={4} className="border-b">
        <SoftTypography fontWeight="large" textTransform="capitalize">
          Timeline
        </SoftTypography>
      </SoftBox>
      <div className="overflow-auto">
        <TimelineList>
          {tenderdata.map((item) => (
            <TimelineItem
              // key={item.id}
              // icon="notifications"
              // color="secondary"
              // title=""
              // dateTime={BirthdateFormatter(item.createdOn)}
              // description={item.stage}
              // badges={[
              // <div className="flex items-center">
              //   <img src={item.profileUrl} alt="Profile" className="w-5 h-5 rounded-full mr-2" />
              //   <span>{item.createdBy}</span>
              // </div>,
              // ]}

              color="secondary"
              icon={
                <img src={item.profileUrl} alt="Profile" className="w-5 h-5 rounded-full mr-2" />
              }
              title={item.stage}
              description={
                <div className="flex items-center">
                  <img src={item.profileUrl} alt="Profile" className="w-5 h-5 rounded-full mr-2" />
                  <span>{item.createdBy}</span>
                </div>
              }
              dateTime={BirthdateFormatter(item.createdOn)}
            />
          ))}
        </TimelineList>
      </div>
    </Card>
  );
}

export default Timeline;
