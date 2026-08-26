import express, { type Request, type Response } from 'express'
import { connectDatabase } from './config/database.js'
import { Activity, Team, User, Workout } from './models.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)

app.use(express.json())
app.use((_request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: dbReady() ? 'connected' : 'disconnected' })
})

app.get('/api/users', asyncHandler(async (_request, response) => response.json(await User.find().sort({ createdAt: -1 }))))
app.post('/api/users', asyncHandler(async (request, response) => {
  const user = await User.create(request.body)
  response.status(201).json(user)
}))

app.get('/api/teams', asyncHandler(async (_request, response) => response.json(await Team.find().populate('members', 'username displayName'))))
app.post('/api/teams', asyncHandler(async (request, response) => {
  const team = await Team.create(request.body)
  response.status(201).json(team)
}))

app.get('/api/activities', asyncHandler(async (request, response) => {
  const filter = request.query.user ? { user: request.query.user } : {}
  response.json(await Activity.find(filter).populate('user', 'username displayName').sort({ completedAt: -1 }))
}))
app.post('/api/activities', asyncHandler(async (request, response) => {
  const activity = await Activity.create(request.body)
  response.status(201).json(activity)
}))

app.get('/api/leaderboard', asyncHandler(async (_request, response) => {
  const leaderboard = await Activity.aggregate([
    { $group: { _id: '$user', points: { $sum: '$points' }, activities: { $sum: 1 } } },
    { $sort: { points: -1 } },
    { $limit: 50 },
    { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
    { $unwind: '$user' },
    { $project: { _id: 0, points: 1, activities: 1, user: { _id: 1, username: 1, displayName: 1 } } },
  ])
  response.json(leaderboard)
}))

app.get('/api/workouts', asyncHandler(async (request, response) => {
  const filter = request.query.difficulty ? { difficulty: request.query.difficulty } : {}
  response.json(await Workout.find(filter).sort({ createdAt: -1 }))
}))
app.post('/api/workouts', asyncHandler(async (request, response) => {
  const workout = await Workout.create(request.body)
  response.status(201).json(workout)
}))

app.use((error: unknown, _request: Request, response: Response, _next: express.NextFunction) => {
  const message = error instanceof Error ? error.message : 'Unexpected server error'
  response.status(400).json({ error: message })
})

function asyncHandler(handler: (request: Request, response: Response) => Promise<unknown>) {
  return (request: Request, response: Response, next: express.NextFunction) => {
    handler(request, response).catch(next)
  }
}

function dbReady() {
  return User.db.readyState === 1
}

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`)
})

void connectDatabase()
