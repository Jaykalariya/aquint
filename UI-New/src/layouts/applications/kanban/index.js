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

import { useEffect, useState } from "react";

// @asseinfo/react-kanban components
import Board from "@asseinfo/react-kanban";

// html-react-parser components
import parse from "html-react-parser";
// uuid is a library for generating unique id
import { v4 as uuidv4 } from "uuid";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Kanban application components
import Header from "layouts/applications/kanban/components/Header";

// Data
import boards from "layouts/applications/kanban/data";
import axiosInstance from "config/https";
import Card from "./components/Card";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import team5 from "assets/images/team-5.jpg";
import meeting from "assets/images/meeting.jpg";
import Addtenderform from "./components/Addtenderform";
import BirthdateFormatter from "examples/BirthdateFormatter";
import List from "./components/List";
import { Tooltip } from "chart.js";
import Tenderprofile from "./components/Tenderprofile";
import "./data/index.css";
import SoftAvatar from "components/SoftAvatar";
import { useNavigate } from "react-router-dom";

function Kanban() {
  const [newCardForm, setNewCardForm] = useState(false);
  const [formValue, setFormValue] = useState("");
  const token = localStorage.getItem("token");
  const [boardse, setboards] = useState({ columns: [] });
  const [hide, sethide] = useState(true);
  const [show, setshow] = useState(true);
  const [closed, setclose] = useState(true);
  const [tenderid, settenderid] = useState();
  const [buttonhide, setbuttonhide] = useState(true);
  const [shows, setshows] = useState(true);
  const navigate = useNavigate();
  const openNewCardForm = (event, id) => setNewCardForm(id);
  const closeNewCardForm = () => setNewCardForm(false);
  const handeSetFormValue = ({ currentTarget }) => setFormValue(currentTarget.value);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const tenderList = await axiosInstance.get("/_v1/tender/getTenderList", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await axiosInstance.get("/_v1/tender/stage/getAllTenderStage", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const transformedData = transformData(result.data, tenderList.data);
      setboards(transformedData);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  function handelchangecard(board, columns, source, destination) {
    const data = { tenderId: columns.id, stageId: destination.toColumnId };
    axiosInstance.post("/_v1/tender/changeStage", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function handelclick(id) {
    settenderid(id);
    navigate(`/Tender/${id}`);

  }

  const transformData = (data, tenderdata) => {
    const columns = data.map((item) => ({
      id: item.id,
      title: item.tenderStageName,
      titleColor: item.color,
      titleValue: item.stageValue,
      cards: tenderdata
        .filter((tender) => tender.tenderStage === item.id)
        .map((tender) => ({
          id: tender.id,
          template: (
            <Card
              badge={{ color: "info", label: tender.projectDisplayName }}
              content={tender.tenderType}
              attachedFiles={BirthdateFormatter(tender.createdOn)}
              members={tender.assignedUser}
            />
          ),
        })),
    }));
    return { columns };
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={1} className="h-screen">
        <SoftBox display="flex" justifyContent="flex-end">
          <Header
            setbuttonhide={setbuttonhide}
            buttonhide={buttonhide}
            setclose={setclose}
            sethide={sethide}
            hide={hide}
            setshow={setshow}
            setshows={setshows}
          />
        </SoftBox>
        <div style={{ height: "100%", marginTop: "20px" }}>
          {hide ? (
            show ? (
              closed ? (
                <SoftBox
                  position="relative"
                  my={4}
                  sx={({
                    palette: { light },
                    functions: { pxToRem },
                    borders: { borderRadius },
                  }) => ({
                    "& .react-kanban-column": {
                      width: pxToRem(300),
                      margin: `0 ${pxToRem(10)}`,
                      padding: pxToRem(20),
                      borderRadius: borderRadius.lg,
                    },
                  })}
                >
                  {boardse.columns.length > 0 && (
                    <Board
                      initialBoard={boardse}
                      onCardDragEnd={handelchangecard}
                      allowAddCard
                      allowAddColumn
                      renderColumnHeader={({ id, title, titleColor, titleValue }, { addCard }) => (
                        <>
                          {/* <SoftBox
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          mb={3}
                        > */}
                          <div style={{ display: "inline-flex" }}>
                            {/* {titleValue === 1 ? (
    <>
      <Icon fontSize="xl"
      style={{marginTop:"2px",  margin: "5px 8px 0px 5px", color: titleColor }}>thumb_up</Icon>
    </>
  ) : titleValue === 2 ? (
    <>
      <Icon fontSize="lg" style={{marginTop:"2px",  margin: "7px 8px 0px 5px", color: titleColor }}>thumb_down</Icon>
    </>
  ) : (
    <>
      <Icon fontSize="lg" style={{marginTop:"2px", margin: "7px 5px 0px 5px", color: titleColor }}>directions_run</Icon>
    </>
  )} */}
                            <SoftTypography
                              style={{
                                color: "white",
                                fontSize: "18px",
                                marginBottom: "5px",
                                padding: "0px 5px 5px 2px",
                              }}
                              variant="h6"
                            >
                              {title}
                            </SoftTypography>
                          </div>
                          {/* <SoftButton size="small" onClick={(event) => openNewCardForm(event, id)}>
                            <Icon
                              sx={{
                                fontWeight: "bold",
                                color: ({ palette: { dark } }) => dark.main,
                              }}
                            >
                              add
                            </Icon>
                          </SoftButton>
                        </SoftBox> */}
                          {newCardForm === id ? (
                            <SoftBox my={2.5}>
                              <SoftInput
                                value={formValue}
                                inputProps={{ rows: 2 }}
                                onChange={handeSetFormValue}
                                multiline
                              />
                              <SoftBox display="flex" mt={2}>
                                <SoftButton
                                  variant="gradient"
                                  color="success"
                                  size="small"
                                  onClick={() => {
                                    addCard({ id: uuidv4(), template: formValue });
                                    setFormValue("");
                                  }}
                                >
                                  add
                                </SoftButton>
                                <SoftBox ml={1}>
                                  <SoftButton
                                    variant="gradient"
                                    color="light"
                                    size="small"
                                    onClick={closeNewCardForm}
                                  >
                                    cancel
                                  </SoftButton>
                                </SoftBox>
                              </SoftBox>
                            </SoftBox>
                          ) : null}
                        </>
                      )}
                      renderCard={({ id, template }, { dragging }) => (
                        <SoftBox
                          key={id}
                          dragging={dragging.toString() || undefined}
                          display="block"
                          width="calc(300px - 40px)"
                          // height = "calc(200px - 40px)"
                          bgColor="white"
                          color="text"
                          borderRadius="md"
                          mt={2.5}
                          py={1.875}
                          px={1.875}
                          lineHeight={1.5}
                          onClick={() => handelclick(id)}
                          sx={{
                            fontSize: ({ typography: { size } }) => size.md,
                          }}
                        >
                          {typeof template === "string" ? parse(template) : template}
                        </SoftBox>
                      )}
                      onCardNew={() => null}
                    />
                  )}
                </SoftBox>
              ) : (
                <Tenderprofile tenderid={tenderid} />
              )
            ) : (
              <List show={shows} setshow={setshows} setbuttonhide={setbuttonhide} />
            )
          ) : (
            <Addtenderform sethide={sethide} fetchData={fetchData} />
          )}
        </div>
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Kanban;
