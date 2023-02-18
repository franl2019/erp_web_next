import {useGetValueName} from "@/utils/useGetValueName";

export function useErrorsToArrayString(error: { errors: {constraints:object,property:string}[] }) {
    const errorList:string[] = [];
    for (let i = 0; i < error.errors.length; i++) {
        const errorInfo = error.errors[i];
        const errorTitle = useGetValueName(errorInfo.property);
        const errorContent = Object.values(errorInfo.constraints).toString();
        errorList.push(`${errorTitle}:${errorContent}`);
    }
    return errorList
}