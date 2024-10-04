import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../Errors/customError.js';
import mongoose from 'mongoose';
import day from 'dayjs';

// local data testing 
// import { nanoid } from 'nanoid';
// let jobs = [
//   { id: nanoid(), company: 'apple', position: 'front-end' },
//   { id: nanoid(), company: 'google', position: 'back-end' },   
// ];

// Get All Job Controller
export const  getAllJobs = async  (req, res)=>{   
 // console.log(jobs);
//  console.log(req.user);
  //const jobs = await Job.find({});
  console.log(req.query);
  /*const jobs = await Job.find({
    createdBy: req.user.userId,
    position:  req.query.search,
  });*/
  const {search, jobStatus, jobType, sort} = req.query;

  const queryObject = {
     createdBy: req.user.userId,
  };
 
  if(search){
    //queryObject.position = req.query.search;
    // using regex
    queryObject.$or = [
      {position: {$regex: search, $options: 'i'}},
      {company: {$regex: search, $options: 'i'}}
    ];
  }
  
    // Search by job status or All job status
  if(jobStatus && jobStatus !== 'all'){
    queryObject.jobStatus = jobStatus;
  }

  // Search by Job type or All job Type
if(jobType && jobType !== 'all'){
    queryObject.jobType = jobType;
  }
 
  // Sort
const sortOptions = {
  newest: '-createdAt',
  oldest: 'createdAt',
  'a-z': 'position',
  'z-a': '-position',
};
const sortKey = sortOptions[sort] || sortOptions.newest

// Setup Pagination 
const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 10; 
const skip = (page - 1) * limit



  const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit);
  // total job
  const totalJobs = await Job.countDocuments(queryObject);
  // Page Number
  const numOfPages = Math.ceil(totalJobs / limit);
  res.status(StatusCodes.OK).json({totalJobs, numOfPages, currentPage: page, jobs});
};

// Create Job Controller
// export const createJob = async  (req, res)=>{
//   const {company, position} = req.body;
// //   if(!company || !position){
// //  return res.status(400).json({msg: 'Please provide company and position'});
// //   } 
// //   const id = nanoid(10);
// //   const job = {id, company, position};
// //   jobs.push(job);
// const job = await Job.create({company, position});
//   res.status(200).json({job});
// };
export const createJob = async  (req, res)=>{
  // try {
  //   const job = await Job.create('something');
  //    res.status(200).json({job});
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({msg: 'server error'}) 
  // }

  //import 'express-async-errors'; // instead of using trycatch 
  req.body.createdBy = req.user.userId;
   const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({job});
};

// Get Single Job Controller
export const getJob = async (req, res) =>{
//const {id} = req.params;
 // local data testing
//const job = jobs.find((job) => job.id === id);
//const job =  await Job.findById(id);
const job =  await Job.findById(req.params.id);

//console.log(job);
// if (!job){
//   return res.status(404).json({msg: `no job with id ${id}`});
// }

//if (!job) throw new NotFoundError(`no job with id ${id}`);
res.status(200).json({job});
};

//Edit and Update Job Controller
export const updateJob = async (req, res) =>{
//  const {company, position } = req.body;
//  if(!company || !position){
//   res.status(400).json({msg: 'Please provide company and position'});
//   return
//  }
 //const {id} = req.params;
  // local data testing
 //const job = jobs.find((job) => job.id === id); 
// const updateJob = await Job.findByIdAndUpdate(req.params.id, req.body, {new: true})
 const updateJob = await Job.findByIdAndUpdate(req.params.id, req.body, {new: true})

//  if(!updateJob){
//   return res.status(404).json({msg: `no job with id ${id}`});
//  }
//if (!updateJob) throw new NotFoundError(`no job with id ${id}`);
  // local data testing
//  job.company = company;
//  job.position = position;
res.status(StatusCodes.OK).json({msg:'job modified successful',job : updateJob});
};

// Delete Job Controller
export const deleteJob = async  (req, res) =>{
 //const {id} = req.params;
 // local data testing
//const job = jobs.find((job) => job.id === id);
  
//const removedJob = await Job.findByIdAndDelete(id)
const removedJob = await Job.findByIdAndDelete(req.params.id)

//  if(!removedJob){
//   return res.status(404).json({msg: `no job with id ${id}`});
//  }
//if (!removedJob) throw new NotFoundError(`no job with id ${id}`);
  // local data testing
//  const newJobs = jobs.filter((job) => job.id !== id);
//  jobs = newJobs;
res.status(StatusCodes.OK).json({msg:'job deleted successful', job: removedJob });
};

export const showStats = async (req, res) => {
   let stats = await Job.aggregate([
    {$match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
    {$group: {_id: '$jobStatus', count: {$sum: 1 }}}
   ]);
  //console.log(stats);
  stats = stats.reduce((acc, curr) => {
  const {_id: title, count} = curr;
  acc[title] = count;
  return acc;
  }, {});
   const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
   };
   
  /* let monthlyApplications = [
    {
      date: 'May 24',
      count: 12,
    },
    {
     date: 'Jun 24',
     count: 9,
    },
    {
      date: 'Jul 24',
      count: 3,
    },
   ]*/

  let monthlyApplications = await Job.aggregate([
    {$match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
    {
      $group: {
        _id: {year: {$year: '$createdAt'}, month: {$month: '$createdAt'}},
        count: {$sum: 1},
      },
    },
    {$sort: {'_id.year': -1, '_id.month': -1}},
    {$limit: 10},
  ]);

  // pulling the year and month as one , count
  monthlyApplications = monthlyApplications.map((item) => {
  const {_id: {year, month}, count,} = item;
  
  // month and year format
  const date = day().month(month-1).year(year).format('MMM YY');

  return {date, count};
  }).reverse();

   res.status(StatusCodes.OK).json({defaultStats, monthlyApplications})
   console.log(defaultStats, monthlyApplications)
}