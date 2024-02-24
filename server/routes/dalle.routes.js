import express from 'express';
import axios from 'axios';  // Make sure to install axios with npm install axios
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
    res.status(200).json({ message: "Hello from DALL.E ROUTES" })
})

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        // Define the Python server URL and endpoint
        const python_server_url = "https://centrumservers.com/generate_image";

        // Make the POST request to the Python server
        const response = await axios.post(python_server_url, {
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });

        const image = response.data.photo;

        res.status(200).json({ photo: image });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" })
    }
})

export default router;