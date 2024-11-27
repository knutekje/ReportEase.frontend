import * as yup from 'yup';

export const foodWasteSchema = yup.object({
    foodItem: yup.string().required('Food item is required'),
    quantity: yup
        .number()
        .required('Quantity is required')
        .positive('Quantity must be greater than 0')
        .integer('Quantity must be a whole number'),
    unit: yup.string().required('Unit is required'),
    description: yup.string().optional(),
});

export type FoodWasteSchema = yup.InferType<typeof foodWasteSchema>;
