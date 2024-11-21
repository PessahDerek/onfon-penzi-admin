import {AxiosError} from "axios";
import {MdOutlineError} from "react-icons/md";


export const getErr = (err: Error | AxiosError) => {
    const message = err instanceof AxiosError
        ? err.response?.data?.message ?? err.message
        : "Sorry something went wrong! Please try again later";
    return {title: "Error!", message: message, color: 'red'};
}

export const presentable = (text: string) => (text.at(0)??'').toUpperCase()+text.slice(1, text.length);
