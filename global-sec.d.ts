import {IconType} from "react-icons";
import * as React from "react";
import {Dispatch, SetStateAction} from "react";


declare type PathObj = {
    [key: string]: string | IconType | undefined;
    name: string;
    path: string;
    icon?: IconType
}

declare interface FilterComponentChildrenType {
    display: [boolean, Dispatch<SetStateAction<boolean>>],
    setList: React.Dispatch<React.SetStateAction<(UserObj | MessageObj)[]>>
}

declare interface FilterComponentType {
    display: [boolean, Dispatch<React.SetStateAction<boolean>>];
    setList: React.Dispatch<React.SetStateAction<(UserObj | MessageObj)[]>>
}
