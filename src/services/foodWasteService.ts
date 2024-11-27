export interface FoodWasteReport {
    id: string;
    foodItem: string;
    quantity: number;
    unit: string;
    date: string; // ISO string
    description?: string; // Optional
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const getFoodWasteReports = async (): Promise<FoodWasteReport[]> => {
    const response = await fetch(`${BASE_URL}/api/food-waste-reports`);
    if (!response.ok) {
        throw new Error('Failed to fetch food waste reports');
    }
    return response.json();
};


export interface NewFoodWasteReport {
    foodItem: string;
    quantity: number;
    unit: string;
    description?: string; // Optional
}


export const submitFoodWasteReport = async (report: NewFoodWasteReport): Promise<void> => {
    const response = await fetch(`${BASE_URL}/api/food-waste-reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report),
    });

    if (!response.ok) {
        throw new Error('Failed to submit food waste report');
    }
};

