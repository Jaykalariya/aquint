/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "config/https";

// Custom styles for ComplexProjectCard
function ComplexProjectCard({
  id,
  projectCustomId,
  stepOrder,
  stepId,
  color,
  image,
  title,
  dateTime,
  description,
  members,
  dropdown,
  length,
  createdOn,
}) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const renderMembers = members.map((member, key) => {
    const memberKey = `member-${key}`;
    return (
      <SoftAvatar
        key={memberKey}
        src={member}
        alt="member profile"
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",

          "&:not(:first-of-type)": {
            ml: -1.25,
          },

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    );
  });

  const handleUpload = () => {
    navigate(`/Projects/fileupload/${id}/${stepOrder}/${stepId}`);
  };

  const fetchData = async (login) => {
    try {
      const result = await axiosInstance.post(
        `/existedCredential/projectCustomId/${login}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return result.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const saveProjectCustomId = async (login) => {
    try {
      const result = await axiosInstance.put(
        `/_v1/project/update/projectCustomId`,
        {
          id: id,
          projectCustomId: login,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return result.data;
    } catch (error) {
      console.error("Error saving data:", error);
      throw error;
    }
  };

  const showAlert = () => {
    const newSwal = Swal.mixin({
      title: "Submit your Project Custom Id",
      customClass: {
        confirmButton: "button button-success",
        cancelButton: "button button-error",
      },
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      preConfirm: async (login) => {
        try {
          if (login) {
            const data = await fetchData(login);
            if (data) {
              throw new Error("Custom ID not available");
            } else {
              const data = await saveProjectCustomId(login);
              if (data.projectCustomId) {
                navigate(`/Projects/${id}`);
              } else {
                throw new Error("Custom ID not saved");
              }
            }
          } else {
            Swal.showValidationMessage("Please enter the project Custom ID");
          }
        } catch (error) {
          Swal.showValidationMessage("Project Custom Already Taken");
        }
      },
    });

    newSwal.fire().then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Project Custom ID added successfully!",
        });
      }
    });
  };

  const handleProcess = () => {
    if (projectCustomId) {
      navigate(`/Projects/${id}`);
    } else {
      showAlert();
    }
  };

  return (
    <Card>
      <SoftBox p={2}>
        <SoftBox display="flex" alignItems="center">
          <SoftAvatar
            src={image}
            alt={title}
            size="xl"
            variant="rounded"
            bgColor={color}
            sx={{ p: 1 }}
          />
          <SoftBox ml={2} lineHeight={0}>
            <SoftBox mb={1} lineHeight={0}>
              <SoftTypography variant="h6" textTransform="capitalize" fontWeight="medium">
                {projectCustomId !== null ? projectCustomId : title}
              </SoftTypography>
            </SoftBox>

            {members.length > -1 ? <SoftBox display="flex">{renderMembers}</SoftBox> : null}
          </SoftBox>
          {
            <SoftTypography
              color="secondary"
              sx={{
                ml: "auto",
                alignSelf: "flex-start",
                py: 1.25,
              }}
            >
              <SoftBox ml={2} lineHeight={0}>
                <SoftBox lineHeight={0}>
                  <SoftTypography
                    variant="button"
                    justifyContent="flex-end"
                    fontWeight="regular"
                    color="text"
                  >
                    - started on
                  </SoftTypography>
                </SoftBox>
                <SoftTypography
                  variant="button"
                  justifyContent="flex-end"
                  fontWeight="bold"
                  color="text"
                >
                  {dateTime}
                </SoftTypography>
              </SoftBox>
            </SoftTypography>
          }
        </SoftBox>
        <SoftBox my={2} lineHeight={1}>
          <SoftTypography
            variant="button"
            fontWeight="regular"
            color="text"
            style={{ textTransform: "none" }}
          >
            {description.length >80 ? `${description.substring(0, 160)} ...` : description}
          </SoftTypography>
        </SoftBox>
        <Divider />
        <SoftBox display="flex" justifyContent="space-between" alignItems="center">
          {members.length > -1 ? (
            <SoftBox display="flex" flexDirection="column" lineHeight={0}>
              <SoftTypography variant="button" fontWeight="medium">
                {stepOrder}/{length} completed
              </SoftTypography>
              {/* <SoftTypography variant="button" fontWeight="medium" color="secondary">
                Participants
              </SoftTypography> */}
            </SoftBox>
          ) : null}
          <SoftBox display="flex">
            <SoftButton
              onClick={() => handleProcess()}
              variant="gradient"
              sx={{ fontSize: "12px", padding: "8px 16px", marginRight: "12px" }}
            >
              Process
            </SoftButton>
            <SoftButton onClick={handleUpload} variant="gradient" color="primary">
              Upload
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Setting default values for the props of ComplexProjectCard
ComplexProjectCard.defaultProps = {
  color: "dark",
  dateTime: "",
  members: [],
  dropdown: false,
};

// Typechecking props for the ProfileInfoCard
ComplexProjectCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  id: PropTypes.string.isRequired,
  projectCustomId: PropTypes.string,
  stepOrder: PropTypes.number.isRequired, // Add this line for stepOrder
  stepId: PropTypes.number.isRequired,
  createdOn: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string,
  description: PropTypes.node.isRequired,
  members: PropTypes.arrayOf(PropTypes.string),
  dropdown: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      action: PropTypes.func,
      menu: PropTypes.node,
    }),
  ]),
};

export default ComplexProjectCard;
