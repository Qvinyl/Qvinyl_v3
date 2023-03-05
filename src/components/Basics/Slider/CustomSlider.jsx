import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const CustomSlider = styled(Slider)({
  '& .MuiSlider-thumb' : {
    borderRadius: "0px",
    width: "3px",
  }
});
  
export default CustomSlider;