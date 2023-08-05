import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
 const useSummaryHook =(amount = 12)=>
{
    const checkAmount = ()=>{
        return amount > 12 ? true :false;
    };
  
    const getComponent = ()=>{
     return checkAmount() ? 
     (<KeyboardArrowUpIcon fontSize='small'/>)
     :(<KeyboardArrowDownIcon fontSize='small'/>)
    } 
    return {checkAmount,getComponent}
}
export default useSummaryHook ;