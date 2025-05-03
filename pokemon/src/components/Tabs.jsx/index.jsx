
import { useDispatch, useSelector } from "react-redux";
import  {setPokemonTab} from "../../app/slice/tabSlice"

function Tabs() {
 
    const dispatch = useDispatch();
    const {currentTab} = useSelector((state)=> state.tab);
    const handleTabSwitch=(tabName)=>{
        dispatch(setPokemonTab(tabName))
    }

  return (
    <div className="w-full h-14 bg-primary-card flex justify-evenly items-center">
        <div onClick={()=> handleTabSwitch('description')} className={`text-card hover:bg-primary-card/10 cursor-pointer w-full h-full grid place-content-center bg-primary ${currentTab==='description' && 'bg-primary-card'}`}>Description</div>
        <div onClick={()=> handleTabSwitch('evolution')} className={`text-card hover:bg-primary-card/10 cursor-pointer w-full h-full grid place-content-center bg-primary ${currentTab==='evolution' && 'bg-primary-card'}`}>Evolution</div>
        <div onClick={()=> handleTabSwitch('moves')} className={`text-card hover:bg-primary-card/10 cursor-pointer w-full h-full grid place-content-center bg-primary ${currentTab==='moves' && 'bg-primary-card'}`}>Moves</div>
    </div>
  )
}

export default Tabs 