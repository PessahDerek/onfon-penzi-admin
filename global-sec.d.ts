import {IconType} from "react-icons";


declare type PathObj = {
    [key: string]: string | IconType | undefined;
    name: string;
    path: string;
    icon?: IconType
}

