/* eslint-disable react/prop-types */
import { Card } from "@mui/material";
import axiosInstance from "config/https";
import BirthdateFormatter from "examples/BirthdateFormatter";
import { item } from "examples/Sidenav/styles/sidenavItem";
import { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import NotesIcon from "@mui/icons-material/Notes";

function Notes({ tenderid }) {
  const token = localStorage.getItem("token");
  const Profile = localStorage.getItem("userProfile");
  const { id } = JSON.parse(Profile);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get(`/_v1/tender/tenderNotes/${tenderid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(result.data);
      result.data.map((item) => {
        if (item.userId === 1) {
          console.log("true", item);
        } else {
          // console.log("false", item);
          console.log(item.userId == id);
        }
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    try {
      await axiosInstance.post(
        "/_v1/tender/addTenderNote",
        {
          tenderId: tenderid,
          note: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Card id="notes" sx={{ overflow: "visible" }}>
      <SoftBox mb={2} mt={2} pl={4} className="border-b">
        <SoftTypography fontWeight="bold" textTransform="capitalize">
          Notes <NotesIcon fontSize="medium" />
        </SoftTypography>
      </SoftBox>
      <div className="flex flex-col  overflow-y-auto" style={{ maxHeight: "550px"}}>
        <div className="flex-1 overflow-y-auto">
          <div className="p-10" 
          // style={{backgroundColor:"#1272d542"}}
          >
            <div>
              {messages.map((item) =>
                item.userId == id ? (
                  <div key={item.id} className="flex items-center justify-end mb-2">
                    <div className="flex items-start">
                      <div
                      style={{borderRadius:"5px 22px 22px 22px", background:"#139dff57"}}
                      className="bg-white shadow-lg border rounded-lg py-1 px-2 max-w-md mt-3">
                        <div className="flex items-center ">
                          <p className="text-xs" style={{fontSize: "13px",fontWeight: "bold",padding: "6px 5px 5px 0px",marginRight: "5px" }}>
                           ~ {item.createdBy} 
                          </p>
                        </div>
                        <div>
                          <p className="text-sm">
                            {item.note}
                            <span style={{ fontSize: "10px", fontWeight:"bold",fontStyle:"italic",padding:"5px 5px 0px 5px" }} className="text-end flex justify-end">
                              {new Date(BirthdateFormatter(item.createdOn)).toLocaleDateString(
                                undefined,
                                { day: "numeric", month: "short" }
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                      <img
                        src={item.profileUrl}
                        alt="User Profile"
                        className="rounded-full w-10 h-10 ml-2.5"
                      />
                    </div>
                  </div>
                ) : (
                  <div key={item.id} className="flex flex-col mb-4">
                    <div className="flex items-start">
                      <img
                        src={item.profileUrl}
                        alt="User Profile"
                        className="rounded-full w-10 h-10 mr-2.5"
                      />
                      <div
                      style={{borderRadius:"5px 22px 22px 22px", background:"#e7ceff"}}
                      className="bg-white shadow-lg border rounded-lg py-1 px-2 max-w-md mt-3">
                        <div className="flex items-center ">
                          <p className="text-xs" style={{fontSize: "13px",fontWeight: "bold",padding: "6px 5px 5px 0px",marginRight: "5px" }}>
                            ~ {item.createdBy}
                          </p>
                        </div>
                        <p className="text-sm">
                          {item.note}
                          <span style={{ fontSize: "10px", fontWeight:"bold",fontStyle:"italic",padding:"5px 5px 0px 5px"}} className="text-end flex justify-end">
                              {/* <div className="flex justify-end"> */}
                              {new Date(BirthdateFormatter(item.createdOn)).toLocaleDateString(
                                undefined,
                               { day: "numeric", month: "short"}
                              )}
                            {/* </div> */}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div
        className="p-7 bg-light-500">
          <div className="flex">
            <input
            style={{borderRadius:"30px 30px 30px 30px"}}
              type="text"
              placeholder="Type your message here..."
              className="flex-1 border border-blue-300 rounded-l-lg py-2 px-4 focus:outline-none focus:border-blue-500"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button style={{
              borderRadius:"30px 30px 30px 30px", marginLeft:"8px",marginRight:"18px", display:"flex", justifyContent:"center", alignItems:"center", alignContent:"center"
            }} onClick={sendMessage} className="bg-blue-500 text-white py-2 px-4 rounded-r-lg">
              <SendIcon color="white" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Notes;
