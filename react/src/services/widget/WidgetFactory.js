import WidgetBalance from "./WidgetBalance";
import WidgetErarning from "./WidgetErarning";
import WidgetOrder from "./WidgetOrder";
import WidgetUser from "./WidgetUser";

const WidgetFactory = ({type ="user"}={})=>{
    switch(type){
        case 'user':
            return WidgetUser();
        case 'erarning': 
            return WidgetErarning();
        case 'order':
            return WidgetOrder();
        case 'balance':
            return WidgetBalance();
        default:
            return WidgetUser();
    }

}
export default WidgetFactory;
