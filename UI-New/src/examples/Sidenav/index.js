import { useEffect, useState } from "react";
// react-router-dom components
import { useLocation, NavLink, useNavigate } from "react-router-dom";
// prop-types is a library for typechecking of props.
import PropTypes, { element } from "prop-types";
// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
// Soft UI Dashboard PRO React example components
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavList from "examples/Sidenav/SidenavList";
import SidenavItem from "examples/Sidenav/SidenavItem";
import SidenavCard from "examples/Sidenav/SidenavCard";
// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";
// Soft UI Dashboard PRO React context
import { useSoftUIController, setMiniSidenav } from "context";
import logo from "../../Image/Aquint Logo PNG.png";
import miniSidebarImage from "../../Image/icon.png";
function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [openNestedCollapse, setOpenNestedCollapse] = useState(false);
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentSidenav } = controller;
  const location = useLocation();
  const { pathname } = location;
  const abc = pathname.split("/");
  const collapseName = pathname.split("/")[abc.length -1];
  const itemName = pathname.split("/").slice(1)[1];
  const navigate = useNavigate();
  const closeSidenav = () => setMiniSidenav(dispatch, true);
  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }
    /**
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);
    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);
  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = (collapse) => {
    const template = collapse.map(({ name, route, key, href }) =>
      href ? (
        <Link
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavItem name={name} nested />
        </Link>
      ) : (
        <NavLink to={route} key={key} sx={{ textDecoration: "none" }}>
          <SidenavItem name={name} active={route === pathname} nested />
        </NavLink>
      )
    );
    return template;
  };
  // Render the all the collpases from the routes.js
  const renderCollapse = (collapses) =>
    collapses.map(({ name, collapse, route, href, key }) => {
      let returnValue;
      if (collapse) {
        returnValue = (
          <SidenavItem
            key={key}
            name={name}
            active={key === itemName}
            open={openNestedCollapse === name}
            onClick={() =>
              openNestedCollapse === name
                ? setOpenNestedCollapse(false)
                : setOpenNestedCollapse(name)
            }
          >
            {renderNestedCollapse(collapse)}
          </SidenavItem>
        );
      } else {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavItem name={name} active={key === itemName} />
          </Link>
        ) : (
          <NavLink to={route} key={key} sx={{ textDecoration: "none" }}>
            <SidenavItem name={name} active={key === itemName} />
          </NavLink>
        );
      }
      return <SidenavList key={key}>{returnValue}</SidenavList>;
    });
  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, collapse, noCollapse, key, href, route }) => {
      let returnValue;
      if (type === "collapse") {
        if (href) {
          returnValue = (
            <Link
              href={href}
              key={key}
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: "none" }}
            >
              <SidenavCollapse
                name={name}
                icon={icon}
                active={key === collapseName}
                noCollapse={noCollapse}
              />
            </Link>
          );
        } else if (name === "Dashboards") {
          returnValue = (
            <SidenavCollapse
              key={key}
              name={name}
              icon={icon}
              active={key === collapseName}
              open={openCollapse === key}
              onClick={() => navigate(`${collapse[0].route}`)}
            >
              {collapse ? renderCollapse(collapse) : null}
            </SidenavCollapse>
          );
        } else if (name === "Tender") {
          returnValue = (
            <SidenavCollapse
              key={key}
              name={name}
              icon={icon}
              active={key === collapseName}
              open={openCollapse === key}
              onClick={() => navigate(`${collapse[0].route}`)}
            >
              {collapse ? renderCollapse(collapse) : null}
            </SidenavCollapse>
          );
        }
        else if (name === "Users") {
          {{console.log(key)}}
          {{console.log(collapseName)}}
          returnValue = (
            <SidenavCollapse
              key={key}
              name={name}
              icon={icon}
              active={key === collapseName}
              open={openCollapse === key}
              onClick={() => navigate(`${collapse[0].route}`)}
            >
              {collapse ? renderCollapse(collapse) : null}
            </SidenavCollapse>
          );
        }
        else if (name === "Projects") {
          {{console.log(key)}}
          {{console.log(collapseName)}}
          returnValue = (
            <SidenavCollapse
              key={key}
              name={name}
              icon={icon}
              active={key === collapseName}
              open={openCollapse === key}
              onClick={() => navigate(`${collapse[0].route}`)}
            >
              {collapse ? renderCollapse(collapse) : null}
            </SidenavCollapse>
          );
        }
         else if (noCollapse && route) {
          returnValue = (
            <SidenavCollapse
              name={name}
              icon={icon}
              noCollapse={noCollapse}
              active={key === collapseName}
            >
              {collapse ? renderCollapse(collapse) : null}
            </SidenavCollapse>
          );
        } else {
          returnValue = (
            <SidenavCollapse
              key={key}
              name={name}
              icon={icon}
              active={key === collapseName}
              open={openCollapse === key}
              onClick={() => (openCollapse === key ? setOpenCollapse(false) : setOpenCollapse(key))}
              // onClick={()=>navigate(`${collapse[0].route}`)}
            >
              {collapse ? renderCollapse(collapse) : null}
            </SidenavCollapse>
          );
        }
      } else if (type === "title") {
        returnValue = (
          <SoftTypography
            key={key}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            opacity={0.6}
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </SoftTypography>
        );
      } else if (type === "divider") {
        returnValue = <Divider key={key} />;
      }
      return returnValue;
    }
  );
  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ transparentSidenav, miniSidenav }}>
      <SoftBox pt={3} pb={1} px={4} textAlign="center">
        <SoftBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <SoftTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </SoftTypography>
        </SoftBox>
        {/* <SoftBox component={NavLink} to="/Dashboard" display="flex" alignItems="center"> */}
        {/* {brand && <SoftBox component="img" src={logo} alt="Logo" width="12rem" />} */}
        {/* <SoftBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <SoftTypography component="h6" variant="button" fontWeight="medium">
              {brandName}
            </SoftTypography>
          </SoftBox> */}
        {/* </SoftBox> */}
        <SoftBox component={NavLink} to="/Dashboard" display="flex" alignItems="center">
          {miniSidenav ? (
            <SoftBox component="img" src={miniSidebarImage} alt="Mini Sidebar Logo" />
          ) : (
            <>{brand && <SoftBox component="img" src={logo} alt="Logo" width="12rem" />}</>
          )}
        </SoftBox>
      </SoftBox>
      <Divider />
      <List>{renderRoutes}</List>
      {/* <SoftBox pt={2} my={2} mx={2}>
        <SidenavCard />
      </SoftBox> */}
    </SidenavRoot>
  );
}
// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};
// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Sidenav;