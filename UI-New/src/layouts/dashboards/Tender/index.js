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

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import Globe from "examples/Globe";

// Soft UI Dashboard PRO React base styles
import typography from "assets/theme/base/typography";
import breakpoints from "assets/theme/base/breakpoints";
import salesTableData from "./data/salesTableData";

// Data
import gradientLineChartData from "layouts/dashboards/Tender/data/gradientLineChartData";
import reportsBarChartData from "./data/reportsBarChartData";
import UpcomingEvents from "layouts/pages/widgets/components/UpcomingEvents";
import ComplexReportsDoughnutChart from "examples/Charts/DoughnutCharts/ComplexReportsDoughnutChart";
import complexReportsDoughnutChartData from "layouts/applications/analytics/data/complexReportsDoughnutChartData";
// import defaultLineChartData from "layouts/applications/analytics/data/defaultLineChartData";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import SoftBadgeDot from "components/SoftBadgeDot";
import Pages from "layouts/applications/analytics/components/Pages";
import DefaultItem from "examples/Items/DefaultItem";
import { Card, Table, TableBody, TableContainer, TableRow, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "config/https";
import PagesBodyCell from "layouts/applications/analytics/components/PagesBodyCell";
import PagesHeaderCell from "layouts/applications/analytics/components/PagesHeaderCell";
import SoftButton from "components/SoftButton";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

function Tender() {
  const { values } = breakpoints;
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [totalWinValue, setTotalWinValue] = useState(null);
  const [totalLossValue, setTotalLossValue] = useState(null);
  const [totalOngoingValue, setTotalOngoingValue] = useState(null);
  const [emdAndFeesData, setEmdAndFeesData] = useState(null);
  const [lastFiveTenderHistory, setLastFiveTenderHistory] = useState(null);
  const [projectValueByTenderType, setProjectValueByTenderType] = useState(null);
  const [projectValueByTenderStage, setProjectValueByTenderStage] = useState(null);
  const [monthlyProjectValueGraph, setMonthlyProjectValueGraph] = useState(null);

  const getIconAndTitleForStage = (stage) => {
    switch (stage) {
      case 1:
        return { icon: "thumb_up", title: "Win", color: "success" };
      case 2:
        return { icon: "thumb_down", title: "Loss", color: "error" };
      default:
        return { icon: "directions_run", title: "Others", color: "warning" };
    }
  };

  const token = localStorage.getItem("token");

  const totalProjectValueByType = projectValueByTenderType?.reduce(
    (sum, entry) => sum + entry.projectvalue,
    0
  );

  const tenderTypePieChartData = {
    labels: projectValueByTenderType?.map((entry) => {
      const label = entry.tenderstagetype;
      return label.length > 20 ? label.substring(0, 20) + "..." : label;
    }),
    datasets: {
      label: "Referrals",
      backgroundColors: ["primary", "info", "warning", "success", "dark"],
      data: projectValueByTenderType?.map((entry) => {
        const percentage = (entry.projectvalue / totalProjectValueByType) * 100;
        return percentage.toFixed(1);
      }),
    },
  };

  const totalProjectValueByStage = projectValueByTenderStage?.reduce(
    (sum, entry) => sum + entry.projectvalue,
    0
  );

  const tenderStagePieChartData = {
    labels: projectValueByTenderStage?.map((entry) => {
      const label = entry.tenderstagename;
      return label.length > 20 ? label.substring(0, 20) + "..." : label;
    }),
    datasets: {
      label: "Referrals",
      backgroundColors: ["primary", "info", "warning", "success", "dark"],
      data: projectValueByTenderStage?.map((entry) => {
        const percentage = (entry.projectvalue / totalProjectValueByStage) * 100;
        return percentage.toFixed(1);
      }),
    },
  };

  const defaultLineCartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Win",
        color: "success",
        data: monthlyProjectValueGraph
          ?.filter((item) => item.stagevalue === 1)
          ?.map((item) => item.project_value),
      },
      {
        label: "Lose",
        color: "error",
        data: monthlyProjectValueGraph
          ?.filter((item) => item.stagevalue === 2)
          ?.map((item) => item.project_value),
      },
      {
        label: "Others",
        color: "warning",
        data: monthlyProjectValueGraph
          ?.filter((item) => item.stagevalue === 3)
          ?.map((item) => item.project_value),
      },
    ],
  };

  useEffect(() => {
    // Fetch data and update state variables
    const fetchData = async () => {
      try {
        const result = await axiosInstance.get(`_v1/tender/tenderDashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTotalWinValue(result.data["valueByStage"]?.[0].projectvalue);
        setTotalLossValue(result.data["valueByStage"][2].projectvalue);
        setTotalOngoingValue(result.data["valueByStage"][1].projectvalue);
        setLastFiveTenderHistory(result.data["dashboardHistory"]);
        setEmdAndFeesData(result.data["amountAndFeeByStage"]);
        setProjectValueByTenderType(result.data["pieChartForType"]);
        setProjectValueByTenderStage(result.data["pieChartForStage"]);
        setMonthlyProjectValueGraph(result.data["graph"]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <SoftBox mb={3} p={1}>
            <SoftTypography
              variant={window.innerWidth < values.sm ? "h3" : "h2"}
              textTransform="capitalize"
              fontWeight="bold"
            >
              Dashboard
            </SoftTypography>
          </SoftBox>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <MiniStatisticsCard
                title={{ text: "Total Win Value", color: "green", fontWeight: "medium" }}
                count={
                  <SoftTypography color="success" fontWeight="bold" mt={2} ml={1}>
                    ₹{" "}
                    {totalWinValue &&
                      totalWinValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </SoftTypography>
                }
                percentage={{ color: "success", text: "" }}
                icon={{ color: "success", component: "thumb_up" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <MiniStatisticsCard
                title={{ text: "Total value loss", fontWeight: "medium" }}
                count={
                  <SoftTypography color="error" fontWeight="bold" mt={2} ml={1}>
                    ₹{" "}
                    {totalLossValue &&
                      totalLossValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </SoftTypography>
                }
                percentage={{ color: "success", text: "" }}
                icon={{ color: "error", component: "thumb_down" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <MiniStatisticsCard
                title={{ text: "Total on going", fontWeight: "medium" }}
                count={
                  <SoftTypography color="warning" fontWeight="bold" mt={2} ml={1}>
                    ₹{" "}
                    {totalOngoingValue &&
                      totalOngoingValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </SoftTypography>
                }
                percentage={{ color: "success", text: "" }}
                icon={{ color: "warning", component: "directions_run" }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={6}>
              <Card sx={{ height: "100%" }}>
                <SoftBox pt={2} px={2} lineHeight={1}>
                  <SoftTypography variant="h6" fontWeight="medium">
                    EMD amount
                  </SoftTypography>
                  {/* <SoftTypography variant="button" color="text" fontWeight="medium">
                    Project value
                  </SoftTypography> */}
                </SoftBox>
                <SoftBox p={2} display="flex" alignItems="center">
                  <Grid container spacing={2}>
                  {emdAndFeesData &&
                      emdAndFeesData.map((data, index) => (
                        <Grid item xs={12} sm={3} lg={4} key={index}>
                          <DefaultInfoCard
                            icon={getIconAndTitleForStage(data.stagevalue).icon}
                            title={<SoftTypography variant="body2" fontWeight="bold">
                            {getIconAndTitleForStage(data.stagevalue).title}
                          </SoftTypography>}
                            description={`Project: ${data.projectcount}`} 
                            value={<SoftTypography variant="body2" fontWeight="bold" color="black">
                            ₹ {data.tenderfee}
                          </SoftTypography>}
                            color={getIconAndTitleForStage(data.stagevalue).color}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </SoftBox>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              <Card sx={{ height: "100%" }}>
                <SoftBox pt={2} px={2} lineHeight={1}>
                  <SoftTypography ml={1} variant="h6" fontWeight="medium">
                    Tender Fees
                  </SoftTypography>
                  {/* <SoftTypography variant="button" color="text" fontWeight="medium">
                    Project value
                  </SoftTypography> */}
                </SoftBox>
                <SoftBox p={2} display="flex" alignItems="center">
                  <Grid container spacing={2}>
                    {emdAndFeesData &&
                      emdAndFeesData.map((data, index) => (
                        <Grid item xs={12} sm={3} lg={4} key={index}>
                          <DefaultInfoCard
                            icon={getIconAndTitleForStage(data.stagevalue).icon}
                            title={<SoftTypography variant="body2" fontWeight="bold">
                            {getIconAndTitleForStage(data.stagevalue).title} 
                          </SoftTypography>}
                            description={`Project: ${data.projectcount}`} 
                            value={<SoftTypography variant="body2" fontWeight="bold" color="black">
                            ₹ {data.emdamount}
                          </SoftTypography>}
                            color={getIconAndTitleForStage(data.stagevalue).color}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </SoftBox>
              </Card>
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ComplexReportsDoughnutChart
                title="Project Value by Tender Type"
                chart={tenderTypePieChartData}
                tooltip="See which websites are sending traffic to your website"
                action={{
                  type: "internal",
                  route: "/",
                  color: "secondary",
                  label: "see all referrals",
                }}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <DefaultLineChart
                title="YTD progress"
                description={
                  <SoftBox display="flex" ml={-1}>
                    <SoftBadgeDot color="success" size="sm" badgeContent="Win" />
                    <SoftBadgeDot color="error" size="sm" badgeContent="Lose" />
                    <SoftBadgeDot color="warning" size="sm" badgeContent="Others" />
                  </SoftBox>
                }
                chart={defaultLineCartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ComplexReportsDoughnutChart
                title="Project Value by Tender Stage"
                chart={tenderStagePieChartData}
                tooltip="See which websites are sending traffic to your website"
                action={{
                  type: "internal",
                  route: "/",
                  color: "secondary",
                  label: "see all referrals",
                }}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <Card>
                <SoftBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  pt={2}
                  px={2}
                >
                  <SoftTypography variant="h6">History</SoftTypography>
                  <Tooltip
                    title="Data is based from sessions and is 100% accurate"
                    placement="left"
                  >
                    <SoftButton variant="outlined" color="success" size="small" circular iconOnly>
                      <Icon sx={{ fontWeight: "bold" }}>done</Icon>
                    </SoftButton>
                  </Tooltip>
                </SoftBox>
                <SoftBox py={2} px={2} sx={{ width: "100%" }}>
                  <TableContainer sx={{ boxShadow: "none" }}>
                    <Table>
                      <SoftBox component="thead">
                        <TableRow>
                          <PagesHeaderCell>Changes</PagesHeaderCell>
                          <PagesHeaderCell>User</PagesHeaderCell>
                          <PagesHeaderCell>Project name</PagesHeaderCell>
                          {/* <PagesHeaderCell>bounce rate</PagesHeaderCell> */}
                        </TableRow>
                      </SoftBox>
                      <TableBody>
                        {lastFiveTenderHistory &&
                          lastFiveTenderHistory.map((historyItem, index) => (
                            <PagesBodyCell
                              key={index}
                              rows={[
                                historyItem.name,
                                historyItem.fullname,
                                historyItem.project_name,
                              ]}
                              noBorder={index === lastFiveTenderHistory.length - 1}
                            />
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </SoftBox>
              </Card>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Tender;
