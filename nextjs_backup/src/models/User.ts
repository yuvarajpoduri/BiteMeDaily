import mongoose from "mongoose";

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
  // Explicitly skipped content to be hidden everywhere
  skippedContentIds: [{
    type: String,
  }],
  // Track seen content with timestamps for rotation and expiration
  seenContent: [{
    contentId: { type: String, required: true },
    seenAt: { type: Date, default: Date.now }
  }],
  // AI/ML Personalization Metadata
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

export default mongoose.models.User || mongoose.model("User", UserSchema);
