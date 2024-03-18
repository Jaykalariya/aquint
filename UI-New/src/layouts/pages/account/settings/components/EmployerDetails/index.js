import { Card, Grid, Icon } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "config/https";
import SoftInput from "components/SoftInput";
import SoftDatePicker from "components/SoftDatePicker";
import SoftSelect from "components/SoftSelect";

function Employerdetails() {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const defaultId = JSON.parse(localStorage.getItem("userProfile"))?.id || 0;
  const userId = id || defaultId;
  const [formdata, setformdata] = useState({});
  const [companyDesignation, setcompanyDesignation] = useState([]);
  const [companyDepartment, setcompanyDepartment] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const result = await axiosInstance.get(`/_v1/user/employerDetails/getDetails/2`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await axiosInstance.get(`/_v1/user/companyDesignation/getAllActive`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const Data1 = await axiosInstance.get(`/_v1/user/companyDepartment/getAllActive`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setcompanyDepartment(Data1.data);
      setcompanyDesignation(data.data);
      setformdata(result.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputChange = (e, field) => {
    const value = e.target ? e.target.value : e;
    setformdata((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formdata);
    // setSubmitted(true);
    // const isEmptyField = Object.values(formdata).some((value) => value === "");
    // if (isEmptyField) {
    //   addToast("Please fill in all required fields.", { appearance: "error" });
    //   return;
    // }
    // try {
    //   const response = await axiosInstance.post("/_v1/user/familyMemberDetails/add", formdata, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   if (response) {
    //     fetchData();
    //     setshow(true);
    //     addToast("Upload successfully", { appearance: "success" });
    //   }
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    //   addToast("Failed. Please try again later.", { appearance: "error" });
    // }
  };

  return (
    <Card id="Employe-Info" sx={{ overflow: "visible" }}>
      <SoftBox pt={3} pl={3}>
        <SoftTypography variant="h5">Employe info</SoftTypography>
      </SoftBox>

      <SoftBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              Designation<span style={{ color: "red" }}>*</span>
            </label>
            <SoftSelect
              onChange={(e) => handleInputChange(e, "designation")}
              options={companyDesignation.map((item) => ({
                value: item.id,
                label: item.companyDesignationName,
              }))}
            />
          </Grid>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              Department<span style={{ color: "red" }}>*</span>
            </label>
            <SoftSelect
              value={formdata.department}
              onChange={(e) => handleInputChange(e, "department")}
              options={companyDepartment.map((item) => ({
                value: item.id,
                label: item.companyDepartmentName,
              }))}
            />
          </Grid>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              CTC<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput value={formdata.ctc} onChange={(e) => handleInputChange(e, "ctc")} />
          </Grid>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              Date Of Joining<span style={{ color: "red" }}>*</span>
            </label>
            <SoftDatePicker value={formdata.dateOfJoining} />
          </Grid>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              PF Details<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
              value={formdata.pfDetails}
              onChange={(e) => handleInputChange(e, "pfDetails")}
            />
          </Grid>
          <Grid item xs={6}>
            <label className="text-xs font-bold p-1">
              esicDetails<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
              value={formdata.esicDetails}
              onChange={(e) => handleInputChange(e, "esicDetails")}
            />
          </Grid>
        </Grid>
        <div className="mt-4 flex justify-end">
          <SoftButton onClick={handleSubmit} color="info">
            Save
          </SoftButton>
        </div>
      </SoftBox>
    </Card>
  );
}

export default Employerdetails;
