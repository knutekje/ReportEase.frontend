import { FoodWasteItem } from "./FoodWasteItem.tsx";
import { FoodWasteReport, getFoodWasteReports } from "../../services/foodWasteService.ts";
import { useQuery } from "@tanstack/react-query";
import { Box, Skeleton } from "@mui/material";

export const FoodWasteList = () => {
    const { data, isLoading, isError, error } = useQuery<FoodWasteReport[], Error>({
        queryKey: ["foodWasteReports"],
        queryFn: getFoodWasteReports,
    });

    // @ts-ignore
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                padding: 2,
            }}
        >
            {!isLoading ? (
                data?.map((report) => <FoodWasteItem key={report.id} report={report} />)
            ) : (
                <Skeleton variant="rectangular" width={400} height={200} />
            )}
        </Box>
    );
};
