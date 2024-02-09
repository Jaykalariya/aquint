import { useState } from "react";
import Sidenav from "./Componets/Sidenav";
import Timeline from "./Componets/Timeline";
import Notes from "./Componets/Notes";
import Tenderinfo from "./Componets/Tenderinfo";
import File from "./Componets/Files/Index";

/* eslint-disable react/prop-types */
function Tenderprofile({ tenderid }) {
  const [activeTab, setActiveTab] = useState("tender-info");
  console.log(tenderid);

  return (
    <div class="flex gap-5 h-screen">
      <div class="w-64">
        <Sidenav setActiveTab={setActiveTab} />
      </div>

      <div class="flex-grow bg-white shadow-md rounded-2xl ">
        {activeTab === "tender-info" && <Tenderinfo tenderid={tenderid} />}
        {activeTab === "timeline" && <Timeline tenderid={tenderid} />}
        {activeTab === "notes" && <Notes tenderid={tenderid} />}
        {activeTab === "file" && <File tenderid={tenderid} />}
      </div>
    </div>
  );
}

export default Tenderprofile;
