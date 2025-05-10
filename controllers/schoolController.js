import pool from "../config/db.js";
import { calculateDistance } from "./distanceCalculator.js";

export const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        //validation
        if(!name || ! address || latitude === undefined || longitude === undefined){
            return res.status(400).json({error :'All fields are required'})
        }

        if(latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            return res.status(400).json({error:'invalid coordinates'})
        }
        //here i can add more validations

        const [result] = await pool.query(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        )

        res.status(201).json({
            message: 'School added',
            schoolId: result.insertId
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'database error'})
    }

};


export const listSchools = async (req, res) =>{
    try {
        const {latitude, longitude} = req.query;

        //validation
        if(latitude === undefined || longitude === undefined){
            return res.status(400).json({ error: 'Latitude,longitude are required '})
        }

        const userLat = parseFloat(latitude)
        const userLon = parseFloat(longitude)

        // i can add more validations 

        const [schools] = await pool.query('SELECT * FROM schools');
        
        //calculating distance for each school
        const schoolsDistance = schools.map(school =>{
            const distance = calculateDistance(
                userLat,userLon,school.latitude,school.longitude
            )

            return {...school,distance:parseFloat(distance.toFixed(2))}
        });

        //sorting by distance
        schoolsDistance.sort((a,b)=> a.distance - b.distance)
        res.json(schoolsDistance)

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'database error'})
    }
}