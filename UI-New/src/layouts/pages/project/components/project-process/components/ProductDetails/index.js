import axiosInstance from "config/https";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetailsPage() {
  const { id } = useParams();

  const [productDetail, setProductDetail] = useState(null);

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
      console.log(result.data);
      setProductDetail(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />

      
    </DashboardLayout>
  );
}

export default ProductDetailsPage;
