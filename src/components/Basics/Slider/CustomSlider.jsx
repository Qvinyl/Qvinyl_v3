import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const CustomSlider = styled(Slider)({
  '& .MuiSlider-thumb' : {
    borderRadius: "100px",
    width: "10px",
    height: "10px"
  }
});
  
export default CustomSlider;