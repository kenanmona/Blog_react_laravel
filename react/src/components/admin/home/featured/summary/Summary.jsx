import './summary.scss'
import useSummaryHook from '../../../../../services/hooks/useSummaryHook'
const Summary = ({title,amount}) => {
  const {checkAmount,getComponent} = useSummaryHook(amount);
  return (
    <div className='item'>

      <div className='item-title'>{title}</div>

         <div className={`item-result ${checkAmount()?'positve' : 'negative'}`}>
          {
            getComponent()
          } 
         <div className='item-amount'>
          {amount} 
         </div>

         </div>

    </div>
  )
}

export default Summary
