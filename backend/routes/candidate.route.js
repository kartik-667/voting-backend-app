import express from 'express'
import { addCandidate, countVotes, getAllCandidates, updateCandidate } from '../controller/candidate.controller.js'

const candidateRouter=express.Router()
//only works aafter middleware passing only

candidateRouter.get("/",getAllCandidates)

candidateRouter.post("/add",addCandidate)

candidateRouter.put("/add/:id",updateCandidate)

candidateRouter.get("/vote/count",countVotes)


export default candidateRouter