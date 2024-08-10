import { toJalaali } from 'jalaali-js';
import jalaali from 'jalaali-js'
import PN from "persian-number";
import months from '../constants/months';



const convertDate = (date) => {
    
    const { jy, jm, jd } = jalaali.toJalaali(new Date(date));
    return [PN.convertEnToPe(jy), months[jm], PN.convertEnToPe(jd)]
}

export { convertDate }