/* eslint-disable react/prop-types */
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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftBadge from "components/SoftBadge";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftProgress from "components/SoftProgress";

// Custom styles for the Card

function Card({ image, badge, content, progress, attachedFiles, members }) {
  const MAX_MEMBERS_DISPLAYED = 3;

  const renderMembers = members.slice(0, MAX_MEMBERS_DISPLAYED).map((member, key) => {
    const imageAlt = `image-${key}`;

    return (
      <SoftAvatar
        key={imageAlt}
        src={member.profileURL}
        alt={imageAlt}
        size="xs"
        sx={{
          border: ({ borders: { borderWidth }, palette: { white } }) =>
            `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        }}
      />
    );
  });

  const remainingMembers = members.length - MAX_MEMBERS_DISPLAYED;

  return (
    <div className="h-32">
      {image && <SoftBox component="img" src={image} width="100%" borderRadius="sm" mb={1} />}
      <SoftBadge size="xs" color={badge.color} badgeContent={badge.label} container />
      <SoftBox mt={1} mb={2} height="60px">
        <SoftTypography variant="body2" color="text">
          {content}
        </SoftTypography>
        {progress > 0 && (
          <SoftBox mt={0.25}>
            <SoftProgress variant="gradient" value={progress} color={badge.color} />
          </SoftBox>
        )}
      </SoftBox>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center">
        <SoftBox display="flex" alignItems="center" color="text">
          {attachedFiles && (
            <>
              <SoftTypography variant="body2" color="text" sx={{ lineHeight: 0 }}>
                <Icon sx={{ fontWeight: "bold" }}>attach_file</Icon>
              </SoftTypography>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                &nbsp;{attachedFiles}
              </SoftTypography>
            </>
          )}
        </SoftBox>
        {/* <SoftBox display="flex">{renderMembers}</SoftBox> */}
        <SoftBox display="flex">
          {renderMembers}
          {remainingMembers > 0 && (
            <div className="text-center">
            <SoftTypography variant="button" fontWeight="regular" color="text">
              &nbsp;{remainingMembers}+
            </SoftTypography>
            </div>
          )}
        </SoftBox>
      </SoftBox>
    </div>
  );
}

// Setting default props for the Card
Card.defaultProps = {
  image: "",
  progress: 0,
  attachedFiles: "",
};

// Typechecking props for the Card
Card.propTypes = {
  image: PropTypes.string,
  badge: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  content: PropTypes.node.isRequired,
  progress: PropTypes.number,
  attachedFiles: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  members: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Card;
