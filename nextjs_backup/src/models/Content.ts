import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  _id: { type: String }, 
  title: { type: String, required: true },
  description: { type: String, required: true }, // Short explanation (max ~5 lines)
  category: { 
    type: String, 
    required: true, 
    enum: [
      'Tech Tips',
      'Concepts Simplified',
      'Shortcuts & Tools',
      'Health & Focus',
      'Useful Facts',
      'Daily Fixes',
      'History Stories',
      'News'
    ] 
  },
  tags: [{ type: String }],
  last_shown_at: { type: Date },
  usefulness: { type: Number, min: 1, max: 5, default: 3 },
  difficulty: { type: Number, min: 1, max: 5, default: 1 },
  imageUrl: { type: String },
  source: { type: String },
  publishDate: { type: String },
  url: { type: String },
  historyMetadata: {
    century: { type: String },
    region: { type: String }
  }
}, { timestamps: true });

export default mongoose.models.Content || mongoose.model("Content", ContentSchema);
