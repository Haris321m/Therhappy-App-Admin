
import mongoose from 'mongoose';

const talkSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

const Talk = mongoose.model('Talk', talkSchema);

export default Talk;
