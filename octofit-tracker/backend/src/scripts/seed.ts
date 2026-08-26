import mongoose from 'mongoose'
import { Activity, Team, User, Workout } from '../models.js'

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString)

    console.log('Connected to octofit_db')

    await Promise.all([
      Activity.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const users = await User.insertMany([
      { username: 'alex.runner', email: 'alex.runner@example.com', displayName: 'Alex Rivera' },
      { username: 'jamie.lifts', email: 'jamie.lifts@example.com', displayName: 'Jamie Morgan' },
      { username: 'taylor.trails', email: 'taylor.trails@example.com', displayName: 'Taylor Chen' },
      { username: 'morgan.moves', email: 'morgan.moves@example.com', displayName: 'Morgan Patel' },
    ])

    await Team.insertMany([
      {
        name: 'Trailblazers',
        description: 'Building healthy habits one mile at a time.',
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'Power Up',
        description: 'Strength, consistency, and good energy.',
        members: [users[1]._id, users[3]._id],
      },
    ])

    await Activity.insertMany([
      { user: users[0]._id, type: 'running', durationMinutes: 32, points: 48, notes: 'Riverside loop' },
      { user: users[0]._id, type: 'strength', durationMinutes: 40, points: 52, notes: 'Full-body circuit' },
      { user: users[1]._id, type: 'strength', durationMinutes: 55, points: 75, notes: 'Lower-body session' },
      { user: users[1]._id, type: 'cycling', durationMinutes: 45, points: 62, notes: 'Indoor ride' },
      { user: users[2]._id, type: 'walking', durationMinutes: 50, points: 45, notes: 'Trail walk' },
      { user: users[3]._id, type: 'running', durationMinutes: 25, points: 38, notes: 'Track intervals' },
    ])

    await Workout.insertMany([
      {
        title: 'Morning Momentum',
        type: 'Cardio',
        difficulty: 'beginner',
        durationMinutes: 20,
        description: 'A brisk interval walk and jog to start the day.',
        target: 'Endurance',
      },
      {
        title: 'Strong Foundations',
        type: 'Strength',
        difficulty: 'intermediate',
        durationMinutes: 35,
        description: 'A balanced bodyweight routine for the major muscle groups.',
        target: 'Full body',
      },
      {
        title: 'Fast Finish',
        type: 'Running',
        difficulty: 'advanced',
        durationMinutes: 30,
        description: 'Short, challenging intervals that build speed and power.',
        target: 'Speed',
      },
    ])

    console.log('Database seeding complete')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

void seedDatabase()
