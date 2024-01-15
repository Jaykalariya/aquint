import img from "../../Image/no-data.avif";

function Nodata() {
  return (
    <div>
      <img src={img} alt="no-data" className="mx-auto" />
    </div>
  );
}

export default Nodata;