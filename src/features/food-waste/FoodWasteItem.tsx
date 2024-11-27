import { Card } from "@mui/material"

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';


export interface Report{
    "foodItemId": string,
    "customFoodItem": string,
    "quantity": 15,
    "description": string,
    "submittedBy": string,
    "reportDate": string,
    "photoId": string
}

export const FoodWasteItem = ({ report }: { report: Report })  => {
    return (

        <Box padding={"4px"} border={"aqua"}>
            <Typography>
               <Card>
                   {report.quantity}
                   <img  src={`${BASE_URL}/api/photos/download/${report.photoId}`}/>
               </Card>
            </Typography>
        </Box>

    )
}