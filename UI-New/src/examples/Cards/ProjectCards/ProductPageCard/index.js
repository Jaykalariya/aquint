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
import SoftProgress from "components/SoftProgress";

// Custom styles for ComplexProjectCard
function ProductPageCard({
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

  const handleDetails = () => {
    if (projectCustomId) {
      navigate(`/Projects/product/${id}`);
    } else {
      showAlert();
    }
  };

  return (
    <Card>
      <SoftBox p={2}>
        <SoftBox display="flex" alignItems="center">
          {/* <SoftAvatar
            src={image}
            alt={title}
            size="xl"
            variant="rounded"
            bgColor={color}
            sx={{ p: 1 }}
          /> */}
          <SoftBox  lineHeight={0}>
            <SoftBox mb={1} lineHeight={0}>
              <SoftTypography variant="h6" textTransform="capitalize" fontWeight="medium">
                Product Code ( {projectCustomId } )
              </SoftTypography>
            </SoftBox>

            {members.length > -1 ? <SoftBox display="flex">{renderMembers}</SoftBox> : null}
          </SoftBox>
          {/* { 
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
                    Started On
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
          } */}
        </SoftBox>
        <SoftBox my={2} lineHeight={1}>
          <SoftTypography
            variant="button"
            fontWeight="regular"
            color="text"
            style={{
              textTransform: "none",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 2,
            }}
          >
            {description}
          </SoftTypography>
        </SoftBox>
        <Divider />
        <SoftBox display="flex" justifyContent="space-between" alignItems="center">
          {members.length > -1 ? (
            <SoftBox width="25%"  >
              <SoftTypography display="block" variant="caption" fontWeight="medium" color="text">
                60%
              </SoftTypography>
              <SoftBox mt={0.25}>
                <SoftProgress variant="gradient" color="info" value={60} />
              </SoftBox>
            </SoftBox>
          ) : null}
          <SoftBox display="flex">
            <SoftButton
              onClick={() => handleDetails()}
              variant="gradient"
              sx={{ fontSize: "12px", padding: "8px 16px", marginRight: "12px" }}
            >
              Details
            </SoftButton>
            <SoftButton onClick={handleUpload} variant="gradient" color="info">
              Progress
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Setting default values for the props of ComplexProjectCard
ProductPageCard.defaultProps = {
  color: "dark",
  dateTime: "",
  members: [],
  dropdown: false,
};

// Typechecking props for the ProfileInfoCard
ProductPageCard.propTypes = {
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

export default ProductPageCard;
