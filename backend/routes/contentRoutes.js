import express from 'express';
import { 
  getDailyContent, 
  markAsRead, 
  skipContent, 
  getReadHistory,
  toggleSaveForever 
} from '../controllers/contentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/daily', protect, getDailyContent);
router.post('/read', protect, markAsRead);
router.post('/skip', protect, skipContent);
router.get('/history', protect, getReadHistory);
router.post('/save-forever', protect, toggleSaveForever);

export default router;
