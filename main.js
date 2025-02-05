import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import db from './config/db.js';

import brandRoutes from './routes/brands.routes.js';
import categoryRoutes from './routes/category.routes.js';
import categoryItemRoutes from './routes/categoryItem.routes.js';
import countryRoutes from './routes/country.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/brands', brandRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/categoryItems', categoryItemRoutes);
app.use('/api/countries', countryRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
});
