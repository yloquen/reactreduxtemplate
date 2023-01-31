import {Dimensions} from "react-native";


export function vw(wPercent:number)
{
    return Dimensions.get('window').width * wPercent/100;
}


export function vh(hPercent:number)
{
    return Dimensions.get('window').height * hPercent/100;
}





