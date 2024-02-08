/* eslint-disable react/prop-types */
import { Card } from "@mui/material";
import React, { useState } from "react";
import Timeline from "../Timeline";
import Notes from "../Notes";


const TabBar = ({tenderid}) => {
  const [activeTab, setActiveTab] = useState("timeline");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <Card>
        <div className="flex justify-between p-4">
          <button
            className={`tab-btn ${activeTab === "timeline" && "border-b-4 border-y-blue-500"}`}
            onClick={() => handleTabClick("timeline")}
          >
            Timeline
          </button>
          <button
            className={`tab-btn ${activeTab === "notes" && "border-b-4 border-y-blue-500"}`}
            onClick={() => handleTabClick("notes")}
          >
            Notes
          </button>
          <button
            className={`tab-btn ${activeTab === "file" && "border-b-4 border-y-blue-500"}`}
            onClick={() => handleTabClick("file")}
          >
            File
          </button>
        </div>
      </Card>
      <div className="flex-grow p-4" id="content">
        <Card>
        {activeTab === "timeline" && (
          <Timeline tenderid={tenderid}/>
        )}
        {activeTab === "notes" && (
          <Notes tenderid={tenderid}/>
        )}
        {activeTab === "file" && (
          <>
            <h1>File Content</h1>
            <p>This is the content for File tab.</p>
          </>
        )}
        </Card>
      </div>
    </div>
  );
};

export default TabBar;
