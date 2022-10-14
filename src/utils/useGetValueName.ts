import {valueName} from "@/config/valueName";

export function useGetValueName(propertyName:string) {
    return `${valueName[propertyName] || propertyName}`
}