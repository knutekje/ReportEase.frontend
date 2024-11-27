import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFoodWasteReports, FoodWasteReport} from "../services/foodWasteService.ts";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const FoodWasteReports: React.FC = () => {
    const { data, isLoading, isError, error } = useQuery<FoodWasteReport[], Error>({
        queryKey: ['foodWasteReports'],
        queryFn: getFoodWasteReports,
    });

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return <Alert severity="error">Error: {error.message}</Alert>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {data?.map((report) => (
                <Card key={report.id} sx={{ borderRadius: 2, bgcolor: 'background.paper' }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {report.foodItem} - {report.quantity} {report.unit}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Reported on: {new Date(report.date).toLocaleDateString()}
                        </Typography>
                        {report.description && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {report.description}
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default FoodWasteReports;
