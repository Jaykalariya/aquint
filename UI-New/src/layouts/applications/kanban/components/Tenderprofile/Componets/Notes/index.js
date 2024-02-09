/* eslint-disable react/prop-types */
import axiosInstance from "config/https";
import BirthdateFormatter from "examples/BirthdateFormatter";
import { item } from "examples/Sidenav/styles/sidenavItem";
import { useEffect, useState } from "react";

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
    <div className="flex flex-col h-3/4">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div>
            {messages.map((item) =>
              item.userId == id ? (
                <div key={item.id} className="flex items-center justify-end mb-2">
                  <div className="flex items-center mb-2">
                    <div className="bg-gray-300 rounded-lg py-1 px-2 max-w-md">
                      <p className="text-xs mb-1" style={{ fontSize: "8px" }}>
                        {item.createdBy}
                      </p>
                      <p className="text-sm">{item.note}</p>
                      <p style={{ fontSize: "8px" }} className="text-right mt-1.5">
                        {new Date(BirthdateFormatter(item.createdOn)).toLocaleDateString(
                          undefined,
                          { day: "numeric", month: "short" }
                        )}
                      </p>
                    </div>
                    <img
                      src={item.profileUrl}
                      alt="User Profile"
                      className="rounded-full w-8 h-8 mr-2"
                    />
                  </div>
                </div>
              ) : (
                <div key={item.id} className="flex flex-col mb-4">
                  <div className="flex items-start mb-2">
                    <img
                      src={item.profileUrl}
                      alt="User Profile"
                      className="rounded-full w-8 h-8 mr-2"
                    />
                    <div className="bg-gray-300 rounded-lg py-1 px-2 max-w-md">
                      <p className="text-xs mb-1" style={{ fontSize: "8px" }}>
                        {item.createdBy}
                      </p>
                      <p className="text-sm">{item.note}</p>
                      <p style={{ fontSize: "8px" }} className="text-right mt-1.5">
                        {new Date(BirthdateFormatter(item.createdOn)).toLocaleDateString(
                          undefined,
                          { day: "numeric", month: "short" }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex">
          <input
            type="text"
            placeholder="Type your message here..."
            className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:border-blue-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={sendMessage} className="bg-blue-500 text-white py-2 px-4 rounded-r-lg">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notes;
