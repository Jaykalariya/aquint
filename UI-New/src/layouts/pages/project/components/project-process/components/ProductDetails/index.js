import { Add, Description, Reviews, ShoppingCart } from "@mui/icons-material";
import { Card, Grid, Menu, MenuItem, Table } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import axiosInstance from "config/https";
import BirthdateFormatter from "examples/BirthdateFormatter";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import tableData from "layouts/pages/users/reports/data/tableData";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetailsPage() {
  const { id, productTypeId, projectId } = useParams();

  const [productDetail, setProductDetail] = useState(null);
  const [productsType, setProductsType] = useState(null);
  const [productTypeName, setProductTypeName] = useState(null);
  const [unit, setUnit] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get(`/_v1/project/product/getDetails/id/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const productType = await axiosInstance.get(
        `/_v1/project/productType/getDetails/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const unitData = await axiosInstance.get(`/_v1/project/unit/getAll`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(result.data);
      setProductDetail(result.data);
      setProductsType(productType.data);
      setProductTypeName(
        productType.data.map((product) => {
          if (product.id === result.data.productTypeId) {
            return product.productTypeName;
          }
        })
      );
      setUnit(
        unitData.data.map((unit) => {
          if (unit.id === result.data.unitId) {
            return unit.unitName;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const { columns, rows } = tableData;

  // ComplexStatisticsCard dropdown menu state
  const [usersActiveMenu, setUsersActiveMenu] = useState(null);
  const [clickEventsMenu, setClickEventsMenu] = useState(null);
  const [purchasesMenu, setPurchasesMenu] = useState(null);
  const [likesMenu, setLikesMenu] = useState(null);

  // ComplexStatisticsCard dropdown menu handlers
  const openUsersActiveMenu = (event) => setUsersActiveMenu(event.currentTarget);
  const closeUsersActiveMenu = () => setUsersActiveMenu(null);
  const openClickEventsMenu = (event) => setClickEventsMenu(event.currentTarget);
  const closeClickEventsMenu = () => setClickEventsMenu(null);
  const openPurchasesMenu = (event) => setPurchasesMenu(event.currentTarget);
  const closePurchasesMenu = () => setPurchasesMenu(null);
  const openLikesMenu = (event) => setLikesMenu(event.currentTarget);
  const closeLikesMenu = () => setLikesMenu(null);

  // Dropdown menu template for the ComplexProjectCard
  const renderMenu = (state, close) => (
    <Menu
      anchorEl={state}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(state)}
      onClose={close}
      keepMounted
    >
      <MenuItem onClick={close}>Action</MenuItem>
      <MenuItem onClick={close}>Another action</MenuItem>
      <MenuItem onClick={close}>Something else here</MenuItem>
    </Menu>
  );

  const customStyles = {
    fontSize: "0.9rem",
    color: "#0463b5",
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <div className="flex justify-end gap-2 mb-3">
            <SoftButton color="info" >
              <ShoppingCart />
            </SoftButton>
            <SoftButton color="info" >
              <ShoppingCart />
            </SoftButton>
            <SoftButton color="info" >
              <ShoppingCart />
            </SoftButton>
            <SoftButton color="info" >
              <ShoppingCart />
            </SoftButton>
            <SoftButton color="info" >
              <ShoppingCart />
            </SoftButton>
            <SoftButton color="info" >
              <Description />
            </SoftButton>
            <SoftButton color="info" >
              <Add />
            </SoftButton>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ComplexStatisticsCard
                    icon="account_circle"
                    count={{ number: 1600, label: "users active" }}
                    percentage="+55%"
                    dropdown={{
                      action: openUsersActiveMenu,
                      menu: renderMenu(usersActiveMenu, closeUsersActiveMenu),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ComplexStatisticsCard
                    icon="touch_app"
                    count={{ number: 357, label: "click events" }}
                    percentage="+124%"
                    dropdown={{
                      action: openClickEventsMenu,
                      menu: renderMenu(clickEventsMenu, closeClickEventsMenu),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ComplexStatisticsCard
                    icon="shopping_cart"
                    count={{ number: 2300, label: "purchases" }}
                    percentage="+55%"
                    dropdown={{
                      action: openPurchasesMenu,
                      menu: renderMenu(purchasesMenu, closePurchasesMenu),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ComplexStatisticsCard
                    icon="thumb_up"
                    count={{ number: 940, label: "likes" }}
                    percentage="+90%"
                    dropdown={{
                      action: openLikesMenu,
                      menu: renderMenu(likesMenu, closeLikesMenu),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%" }}>
                <SoftBox mt={2} pl={4}>
                  <SoftTypography fontWeight="bold" textTransform="capitalize">
                    Details
                  </SoftTypography>
                </SoftBox>
                <SoftBox
                  component="li"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  borderRadius="lg"
                  // p={3}
                  my={2}
                  mx={4}
                >
                  <SoftBox
                    className="overflow-hidden"
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    lineHeight={1}
                  >
                    <SoftBox className="border-b mb-2 p-4" style={customStyles}>
                      <SoftTypography
                        style={{ fontWeight: "500", color: "#122d48", fontSize: "0.9rem" }}
                        variant="caption"
                        className="block mb-3 text-sm text-gray-500"
                      >
                        Product description:
                      </SoftTypography>
                      <div className="text-base">{productDetail?.productDescription || "N/A"}</div>
                    </SoftBox>

                    <div className="grid grid-cols-4 pt-1">
                      <SoftBox className=" pl-4" style={customStyles}>
                        <SoftTypography
                          style={{ fontWeight: "500", color: "#122d48", fontSize: "0.9rem" }}
                          variant="caption"
                          color="text"
                          className="block mb-1 text-sm text-gray-500"
                        >
                          Item Code:
                        </SoftTypography>
                        <div className="text-base">({productDetail?.itemCode || "N/A"})</div>
                      </SoftBox>

                      <SoftBox style={customStyles} className="  pl-4">
                        <SoftTypography
                          style={{ fontWeight: "500", color: "#122d48", fontSize: "0.9rem" }}
                          variant="caption"
                          color="text"
                          className="block mb-1 text-sm text-gray-500"
                        >
                          Type:
                        </SoftTypography>
                        <div className="text-base">{productTypeName}</div>
                      </SoftBox>

                      <SoftBox style={customStyles} className="  pl-4">
                        <SoftTypography
                          style={{ fontWeight: "500", color: "#122d48", fontSize: "0.9rem" }}
                          variant="caption"
                          color="text"
                          className="block mb-1 text-sm text-gray-500"
                        >
                          Unit:
                        </SoftTypography>
                        <div className="text-base">{unit}</div>
                      </SoftBox>

                      <SoftBox style={customStyles} className="  pl-4">
                        <SoftTypography
                          style={{ fontWeight: "500", color: "#122d48", fontSize: "0.9rem" }}
                          variant="caption"
                          color="text"
                          className="block mb-1 text-sm text-gray-500"
                        >
                          Created On:
                        </SoftTypography>
                        <div className="text-base">
                          {BirthdateFormatter(productDetail?.createdOn)}
                        </div>
                      </SoftBox>
                    </div>
                    <div className="grid grid-cols-2">
                      <SoftBox className="border-b mb-2 p-4" style={customStyles}>
                        <SoftTypography
                          style={{ fontWeight: "500", color: "#122d48", fontSize: "0.9rem" }}
                          variant="caption"
                          color="text"
                          className="block mb-1 text-sm text-gray-500"
                        >
                          Item Quantity:
                        </SoftTypography>
                        <div>{productDetail?.itemQuantity || "N/A"}</div>
                      </SoftBox>
                      <SoftBox className="border-b mb-2 p-4" style={customStyles}>
                        <SoftTypography
                          style={{ fontWeight: "500", color: "#122d48", fontSize: "0.9rem" }}
                          variant="caption"
                          color="text"
                          className="block mb-1 text-sm text-gray-500"
                        >
                          Unit Rate :
                        </SoftTypography>
                        <div>{productDetail?.unitRate || "N/A"}</div>
                      </SoftBox>
                    </div>
                  </SoftBox>
                </SoftBox>
              </Card>
            </Grid>
          </Grid>
        </SoftBox>
        <Table columns={columns} rows={rows} />
      </SoftBox>
    </DashboardLayout>
  );
}

export default ProductDetailsPage;
