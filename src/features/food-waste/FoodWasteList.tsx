import {FoodWasteItem} from "./FoodWasteItem.tsx";
import {FoodWasteReport, getFoodWasteReports} from "../../services/foodWasteService.ts";
import {useQuery} from "@tanstack/react-query";
import {Skeleton} from "@mui/material";

export const FoodWasteList = () => {

    const { data, isLoading, isError, error } = useQuery<FoodWasteReport[], Error>({
        queryKey: ['foodWasteReports'],
        queryFn: getFoodWasteReports,
    });

    return (
        <>
            {!isLoading ? <>
            {data?.map((report) => <FoodWasteItem key={report.id} report={report}/>)}
            </> : <Skeleton/>}
        </>

    )
}