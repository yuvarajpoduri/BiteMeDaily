import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  savedContentIds: [{
    type: String, 
  }],
  savedForeverIds: [{
    type: String, 
  }],
  skippedContentIds: [{
    type: String,
  }],
  seenContent: [{
    contentId: { type: String, required: true },
    seenAt: { type: Date, default: Date.now }
  }],
  interactionProfile: {
    categoryScores: {
      type: Map,
      of: Number,
      default: {},
    },
    totalReads: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now }, 
  }
}, { timestamps: true });

// Password hashing middleware
UserSchema.pre('save', async function(next) {
  console.log('Hashing password for user:', this.email);
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;
