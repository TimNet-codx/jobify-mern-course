import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Job from './models/JobModel.js';
import User from './models/UserModel.js';

try {
    // connect to database
    await mongoose.connect(process.env.MONGO_URL);
    // Get the user you want to add data to
    const user = await User.findOne({email: 'john@gmail.com'});
    // Read the Json file that contain those data
    const jsonJobs = JSON.parse(await readFile(new URL('./Utils/mockData.json', import.meta.url)));
    // Map or Add each of the data to the User. 
    const jobs = jsonJobs.map((job) => {
        return {...job, createdBy: user._id};
    });
    await Job.deleteMany({createdBy: user._id});
    await Job.create(jobs);
    console.log('Success!!!!');
    process.exit(0);
} catch (error) {
    console.log(error);
    process.exit(1);
}