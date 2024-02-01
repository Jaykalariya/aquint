/* eslint-disable react/prop-types */
import { Card, TextareaAutosize } from "@mui/material";
import axios from "axios";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftDatePicker from "components/SoftDatePicker";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";
import axiosInstance from "config/https";
import { MultiSelect } from "primereact/multiselect";
import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import Service from "./service";

function Addtenderform({ sethide, fetchData }) {
  const indianrupee = "₹";

  const [formData, setFormData] = useState({
    projectName: null,
    projectDisplayName: null,
    tenderStage: null,
    tenderType: null,
    projectValue: null,
    submissionDate: new Date(),
    tenderEmds: null,
    emds: null,
    location: null,
    assignedUsers: [],
  });

  const [formErrors, setFormErrors] = useState({
    projectName: false,
    projectDisplayName: false,
    tenderStage: false,
    tenderType: false,
    projectValue: false,
    submissionDate: false,
    tenderEmds: false,
    emds: false,
    location: false,
    assignedUsers: false,
  });

  const token = localStorage.getItem("token");
  const { addToast } = useToasts();
  const userProfileString = localStorage.getItem("userProfile");
  const userProfile = JSON.parse(userProfileString);
  const userId = userProfile.id;

  const [options, setOptions] = useState([]);
  const [tendernameoptions, settendernameoptions] = useState([]);
  const [useroption, setuseroption] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axiosInstance.get("/_v1/user/getAllUserDetails", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const option = result.data.map((item) => ({
          code: item.id,
          name: item.fullName,
        }));
        setuseroption(option);

        const currentUser = result.data.find((item) => item.id === userId);
        if (currentUser) {
          setFormData({
            ...formData,
            assignedUsers: [
              {
                code: currentUser.id,
                name: currentUser.fullName,
              },
            ],
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axiosInstance.get("/_v1/tender/stage/getAllTenderStage", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const option = result.data.map((item) => ({
          value: item.id,
          label: item.tenderStageName,
        }));
        setOptions(option);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axiosInstance.get("/_v1/tender/type/getAllTenderType", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const option = result.data.map((item) => ({
          value: item.id,
          label: item.tenderTypeName,
        }));
        settendernameoptions(option);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  async function submit() {
    let hasError = false;
    const newFormErrors = { ...formErrors };

    Object.keys(formData).forEach((key) => {
      if (!formData[key] || formData[key] === undefined) {
        newFormErrors[key] = true;
        hasError = true;
      } else {
        newFormErrors[key] = false;
      }
    });

    setFormErrors(newFormErrors);

    if (hasError) {
      return addToast("Please fill in all the details", { appearance: "error" });
    }

    const result = await Service(formData);
    if (result === true) {
      addToast("Tender add successful!", {
        appearance: "success",
      });
      await fetchData();
      sethide(true);
    } else {
      addToast("failed. Please try again.", { appearance: "error" });
    }
  }

  function handleInputChange(key, value) {
    setFormData({
      ...formData,
      [key]: key === "assignedUsers" ? [...value.value] : value,
    });
    setFormErrors({
      ...formErrors,
      [key]: false,
    });
  }

  return (
    <Card className="md:mx-36">
      <SoftBox p={2}>
        <div className="m-0">
          <label className="text-xs font-bold p-1">Project Name</label>
          <textarea
            onChange={(e) => handleInputChange("projectName", e.target.value)}
            className={`w-full text-xs p-2 border-2 focus:border-sky-400 focus:outline-none rounded-md transition duration-300 ease-in-out ${
              formErrors.projectName ? "border-red-500" : ""
            }`}
          />
          {formErrors.projectName && (
            <span className="text-xs text-red-500">Please Enter A Project Name</span>
          )}
        </div>
        <div>
          <label className="text-xs font-bold p-1">Project Display Name</label>
          <textarea
            onChange={(e) => handleInputChange("projectDisplayName", e.target.value)}
            className={`w-full text-xs p-2 border-2 focus:border-sky-400 focus:outline-none rounded-md transition duration-300 ease-in-out ${
              formErrors.projectDisplayName ? "border-red-500" : ""
            }`}
          />
          {formErrors.projectDisplayName && (
            <span className="text-xs text-red-500">Please Enter A Project Display Name</span>
          )}
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-5">
          <div className="mb-4 md:mb-0">
            <label className="text-xs font-bold p-1">Tender Stage</label>
            <SoftSelect
              options={options}
              value={formData.tenderStage}
              onChange={(selected) => handleInputChange("tenderStage", selected)}
              error={formErrors.tenderStage}
            />
            {formErrors.tenderStage && (
              <span className="text-xs text-red-500">Please Select Tender Stage</span>
            )}
          </div>
          <div>
            <label className="text-xs font-bold p-1">Tender Type</label>
            <SoftSelect
              options={tendernameoptions}
              value={formData.tenderType}
              onChange={(selected) => handleInputChange("tenderType", selected)}
              error={formErrors.tenderType}
            />
            {formErrors.tenderType && (
              <span className="text-xs text-red-500">Please Select Tender Type</span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-bold p-1">Project Value</label>
            <SoftInput
              placeholder="Type here..."
              icon={{ component: indianrupee, direction: "left" }}
              onChange={(e) => handleInputChange("projectValue", e.target.value)}
              value={formData.projectValue}
              type="number"
              error={formErrors.projectValue}
            />
            {formErrors.projectValue && (
              <span className="text-xs text-red-500">Please Enter A Project Value</span>
            )}
          </div>
          <div>
            <label className="text-xs font-bold p-1">Submission Date</label>
            <SoftDatePicker
              value={formData.submissionDate}
              onChange={(selectedDate) => handleInputChange("submissionDate", selectedDate)}
              input={{ error: formErrors.submissionDate }}
            />
            {formErrors.submissionDate && (
              <span className="text-xs text-red-500">Please Select Submission Date</span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-bold p-1">Tender Emds</label>
            <SoftInput
              value={formData.tenderEmds}
              onChange={(e) => handleInputChange("tenderEmds", e.target.value)}
              error={formErrors.tenderEmds}
            />
            {formErrors.tenderEmds && (
              <span className="text-xs text-red-500">Please Enter A Tender Emds</span>
            )}
          </div>
          <div>
            <label className="text-xs font-bold p-1">EMDS</label>
            <SoftInput
              placeholder="Type here..."
              icon={{ component: indianrupee, direction: "left" }}
              onChange={(e) => handleInputChange("emds", e.target.value)}
              value={formData.emds}
              error={formErrors.emds}
              type="number"
            />
            {formErrors.emds && <span className="text-xs text-red-500">Please Enter A Emds</span>}
          </div>
        </div>
        <div>
          <label className="text-xs font-bold p-1">Location</label>
          <textarea
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className={`w-full p-2 text-sm  border-2 focus:border-sky-400 focus:outline-none rounded-md transition duration-300 ease-in-out ${
              formErrors.location ? "border-red-500" : ""
            }`}
          />
          {formErrors.location && (
            <span className="text-xs text-red-500">Please Enter A Location</span>
          )}
        </div>
        <div>
          <label className="text-xs font-bold p-1">Assigned Users</label>
          <MultiSelect
            value={formData.assignedUsers}
            onChange={(selected) => handleInputChange("assignedUsers", selected)}
            options={useroption}
            optionLabel="name"
            placeholder="Select Users"
            maxSelectedLabels={3}
            className="w-full md:w-20rem p-2"
          />
          {formErrors.assignedUsers && (
            <span className="text-xs text-red-500">Please Select Assigned Users</span>
          )}
        </div>
        <SoftBox mt={2} width="100%" display="flex" justifyContent="space-between">
          <SoftButton onClick={() => sethide(true)} variant="gradient" color="light">
            Cancel
          </SoftButton>
          <SoftButton onClick={submit} variant="gradient" color="dark">
            Save
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default Addtenderform;
