import { Card, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import axiosInstance from "config/https";
import { useEffect } from "react";

function Familyinfo() {
  const token = localStorage.getItem("token");
  //   const { id } = useParams();
  //   const defaultId = JSON.parse(localStorage.getItem("userProfile"))?.id || 0;
  //   const userId = id || defaultId;

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      // const result = await axiosInstance.get(`/_v1/user/familyDetails/getAll`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      //   setFormData(result.data);
      console.log("Data", result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card id="Family-info" sx={{ overflow: "visible" }}>
      <SoftBox p={3}>
        <SoftTypography variant="h5">Family info</SoftTypography>
      </SoftBox>
      <SoftBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <label className="text-xs font-bold p-1">
              Father Name<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
            //   value={formData.bankName}
            //   onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
            />
          </Grid>
          <Grid item xs={4}>
            <label className="text-xs font-bold p-1">
              Occupation<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
            //   value={formData.ifsc}
            //   onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
            />
          </Grid>
          <Grid item xs={4}>
            <label className="text-xs font-bold p-1">
              Contact No<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
            //   value={formData.ifsc}
            //   onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <label className="text-xs font-bold p-1">
              Mother Name<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
            //   value={formData.bankName}
            //   onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
            />
          </Grid>
          <Grid item xs={4}>
            <label className="text-xs font-bold p-1">
              Occupation<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
            //   value={formData.ifsc}
            //   onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
            />
          </Grid>
          <Grid item xs={4}>
            <label className="text-xs font-bold p-1">
              Contact No<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
            //   value={formData.ifsc}
            //   onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <label className="text-xs font-bold p-1">
              Husband / Wife<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
            //   value={formData.bankName}
            //   onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
            />
          </Grid>
          <Grid item xs={4}>
            <label className="text-xs font-bold p-1">
              Occupation<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
            //   value={formData.ifsc}
            //   onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
            />
          </Grid>
          <Grid item xs={4}>
            <label className="text-xs font-bold p-1">
              Contact No<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
            //   value={formData.ifsc}
            //   onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <label className="text-xs font-bold p-1">
              Brother / Sister<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
            //   value={formData.bankName}
            //   onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
            />
          </Grid>
          <Grid item xs={4}>
            <label className="text-xs font-bold p-1">
              Occupation<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
            //   value={formData.ifsc}
            //   onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
            />
          </Grid>
          <Grid item xs={4}>
            <label className="text-xs font-bold p-1">
              Contact No<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
            //   value={formData.ifsc}
            //   onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <label className="text-xs font-bold p-1">
              Children Name<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
            //   value={formData.bankName}
            //   onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
            />
          </Grid>
          <Grid item xs={4}>
            <label className="text-xs font-bold p-1">
              Age<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
            //   value={formData.ifsc}
            //   onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
            />
          </Grid>
          <Grid item xs={4}>
            <label className="text-xs font-bold p-1">
              Gender<span style={{ color: "red" }}>*</span>
            </label>
            <SoftInput
            //   value={formData.ifsc}
            //   onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
            />
          </Grid>
        </Grid>
        <div className="flex justify-end mt-4">
          {/* {fieldsChanged && ( */}
            <SoftButton color="info" onClick={fetchData}>
              Update
            </SoftButton>
          {/* )} */}
        </div>
      </SoftBox>
    </Card>
  );
}

export default Familyinfo;
