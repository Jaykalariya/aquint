/* eslint-disable react/prop-types */
import { Card, Icon } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";
import { useState ,useRef,useEffect} from "react";
import Service from "../service";
import { useToasts } from "react-toast-notifications";
import { ChromePicker, SketchPicker } from 'react-color';

function Stageform({ setShow, fetchData }) {
  const [tenderStageName, settenderStageName] = useState(null);
  const [status, setstatus] = useState(null);
  const [color, setcolor] = useState('');
  const [stageValue, setstageValue] = useState(null);
  const [tenderStageNameError, settenderStageNameError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [colorError, setcolorError] = useState(null);
  const [stageValueError, setstageValueError] = useState(null);
  const { addToast } = useToasts();
  const [showSketchPicker, setShowSketchPicker] = useState(false);
  const pickerRef = useRef(null);

  const handletenderStageName = (event) => {
    settenderStageName(event.target.value);
    settenderStageNameError(false);
  };

  const handleStatusChange = (selectedOption) => {
    setstatus(selectedOption);
    setStatusError(false);
  };

  const handleStageValueChange = (selectedOption) => {
    setstageValue(selectedOption);
    setstageValueError(false);
  };

  const options =[
    { value: 1, label: <><Icon size='10px' color='success'>thumb_up</Icon> Final WIN</>},
    { value: 2, label: <><Icon color='error'>thumb_down</Icon> Final LOSS </>},
    { value: 3, label: <><Icon size='10px' color='warning'>directions_run</Icon>  Others </> }
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowSketchPicker(false);
      }

      
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowSketchPicker]);


  const handleCancel = () => {
    setShow(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (tenderStageName === null) {
      settenderStageNameError(true);
      hasError = true;
    }

    if (status === null) {
      setStatusError(true);
      hasError = true;
    }

    if (color === null) {
      setcolorError(true);
      hasError = true;
    }


    if (stageValue === null) {
      setstageValueError(true);
      hasError = true;
    }

    if (hasError) {
      return addToast("Please fill in all the details", { appearance: "error" });
    }

    const parsedStatus = status.value === "true";
    const result = await Service(tenderStageName, color, stageValue, parsedStatus);
    if (result === true) {
      addToast("add TenderStage successful!", {
        appearance: "success",
      });
      setShow(false);
      fetchData();
    } else {
      addToast("failed. Please try again.", { appearance: "error" });
    }
  };

  return (
    <Card className="mx-24">
      <SoftBox p={2}>
        <SoftBox>
          <label className="text-xs font-bold p-1">Tender StageName</label>
          <SoftInput
            onChange={handletenderStageName}
            error={tenderStageNameError}
          />
          {tenderStageNameError && (
            <span style={{ color: "red", fontSize: "12px" }}>Please enter a Tender StageName</span>
          )}
          <div className="md:grid md:grid-cols-2 md:gap-5">
          <div>
  <label className="text-xs font-bold p-1">Color</label>
  <SoftButton
        className="font-bold hover:opacity-100"
        style={{
          backgroundColor: color,
        }}
        onClick={() => {setShowSketchPicker(showSketchPicker => !showSketchPicker) }}
        placeholder="Pick a Color"
        fullWidth
      >
        Pick a Color
      </SoftButton>
      {showSketchPicker && (
        <div ref={pickerRef}           
        style={{
          display:"flex",
          zIndex: 1,
          width: '100%',
          justifyContent:"center",
          alignItems:"center",
        }}>
          <SketchPicker
           className="font-bold hover:opacity-100"
            width="80%"
            color={color}
            onChange={updatedColor => setcolor(updatedColor.hex)}
            onBlur={() => { setShowSketchPicker(showSketchPicker => !showSketchPicker) }}
          />
        </div>
      )}
      {colorError && (
        <span style={{ color: "red", fontSize: "12px" }}>Please select a Color</span>
      )}

</div>

            <div>
              <label className="text-xs font-bold p-1">Stage Value</label>
              <SoftSelect
                placeholder="Select Stage Value"
                options={options}
                error={stageValueError}
                onChange={(selected) => handleStageValueChange(selected.value)}
              />
              {stageValueError && (
                <span style={{ color: "red", fontSize: "12px" }}>Please select a Stage Value</span>
              )}
            </div>
          </div> 
           
         <div>
            <label className="text-xs font-bold p-1">Status</label>
            <SoftSelect
              placeholder="Select Satus"
              options={[
                { value: "true", label: "Active" },
                { value: "false", label: "Inactive" },
              ]}
              onChange={(selected) => handleStatusChange(selected)}

              error={statusError}
            />
            {statusError && (
              <span style={{ color: "red", fontSize: "12px" }}>Please select a Status</span>
            )}
          </div>
          <SoftBox mt={6} width="100%" display="flex" justifyContent="space-between">
            <SoftButton onClick={handleCancel} variant="gradient" color="light">
              Cancel
            </SoftButton>
            <SoftButton onClick={handleSave} variant="gradient" color="dark">
              Save
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default Stageform;
