import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173','https://leaderboard-rouge-iota.vercel.app/', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true
}));

mongoose.connect('mongodb+srv://cyberghost:Arcangel2004@cluster0.2oauzmf.mongodb.net/leaderboard?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Add connection event listeners
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

const userSchema = new mongoose.Schema({
  name: String,
  points: { type: Number, default: 0 },
});

const claimHistorySchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  points: { 
    type: Number, 
    required: true,
    min: 1,
    max: 10
  },
  claimedAt: { 
    type: Date, 
    default: Date.now 
  },
  userSnapshot: {
    name: String,  // Store user name at time of claim for history preservation
    totalPoints: Number
  }
});

const User = mongoose.model('User', userSchema);
const ClaimHistory = mongoose.model('ClaimHistory', claimHistorySchema);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!', timestamp: new Date().toISOString() });
});

// Reset database (for development/testing)
app.post('/api/reset', async (req, res) => {
  try {
    await User.deleteMany({});
    await ClaimHistory.deleteMany({});
    console.log('Database reset successfully');
    res.json({ message: 'Database reset successfully' });
  } catch (error) {
    console.error('Error resetting database:', error);
    res.status(500).json({ error: 'Failed to reset database' });
  }
});

// Fix orphaned history entries
app.post('/api/fix-history', async (req, res) => {
  try {
    // Remove history entries with invalid user references
    const result = await ClaimHistory.deleteMany({
      $or: [
        { userId: null },
        { userId: { $exists: false } }
      ]
    });
    
    console.log(`Removed ${result.deletedCount} orphaned history entries`);
    res.json({ message: `Fixed history: removed ${result.deletedCount} orphaned entries` });
  } catch (error) {
    console.error('Error fixing history:', error);
    res.status(500).json({ error: 'Failed to fix history' });
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 });
    console.log('Fetched users:', users.length);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Add a new user
app.post('/api/users', async (req, res) => {
  const { name } = req.body;
  const user = new User({ name });
  await user.save();
  res.json(user);
});

// Claim points for a user
app.post('/api/claim', async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    // Check if user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const points = Math.floor(Math.random() * 10) + 1;
    const user = await User.findByIdAndUpdate(userId, { $inc: { points } }, { new: true });
    
    // Create history entry with user snapshot for preservation
    const history = new ClaimHistory({ 
      userId, 
      points,
      userSnapshot: {
        name: existingUser.name,
        totalPoints: user.points
      }
    });
    await history.save();
    
    console.log(`Points claimed: ${points} for user ${existingUser.name} (${userId}). New total: ${user.points}`);
    
    res.json({ user, points });
  } catch (error) {
    console.error('Error claiming points:', error);
    res.status(500).json({ error: 'Failed to claim points' });
  }
});

// Get leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 });
    
    // Remove duplicates based on name (keep the one with highest points)
    const uniqueUsers = [];
    const seenNames = new Set();
    
    for (const user of users) {
      if (!seenNames.has(user.name)) {
        seenNames.add(user.name);
        uniqueUsers.push(user);
      }
    }
    
    // Get last claim time for each unique user
    const leaderboard = await Promise.all(uniqueUsers.map(async (user, idx) => {
      // Find the most recent claim for this user
      const lastClaim = await ClaimHistory.findOne({ userId: user._id })
        .sort({ claimedAt: -1 })
        .select('claimedAt');
      
      return {
        rank: idx + 1,
        name: user.name,
        points: user.points,
        _id: user._id,
        lastClaim: lastClaim ? lastClaim.claimedAt : null
      };
    }));
    
    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get claim history
app.get('/api/history', async (req, res) => {
  try {
    const history = await ClaimHistory.find()
      .sort({ claimedAt: -1 })
      .populate('userId', 'name')
      .limit(50); // Limit to last 50 entries for performance
    
    console.log('Fetched history entries:', history.length);
    
    // Debug: Check if population is working
    history.forEach((entry, index) => {
      if (index < 3) { // Log first 3 entries for debugging
        console.log(`History entry ${index}:`, {
          userId: entry.userId,
          points: entry.points,
          userName: entry.userId ? entry.userId.name : 'No user found'
        });
      }
    });
    
    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
