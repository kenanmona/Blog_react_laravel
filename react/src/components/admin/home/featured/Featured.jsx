import './featured.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Summary from './summary/Summary';

const Featured = () => {
  return (
    <div className='featured'>
      <div className='top'>
        <h1 className='title'>Total Revenue</h1>
        <MoreVertIcon fontSize='small'/>
      </div>
      <div className='bottom'>
        <div className='featured-chart'>
        <CircularProgressbar value='70' text={`70%`} strokeWidth={5}/>
        </div>
        <p className='title'>Totel sales made today</p>
        <p className='amount'>$420</p>
        <p className='desc'>
         Lorem To Lorem To Lorem To Lorem To.
        </p>
        <div className="summary">
         <Summary title={'Day'} amount={12.4}/>
         <Summary title={'Mounth'} amount={10.4}/>
         <Summary title={'Year'} amount={15}/>
         
        </div>
      </div>
    </div>
  )
}

export default Featured
