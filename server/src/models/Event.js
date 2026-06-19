import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    session_id: { type: String, required: true, index: true },
    event_type: { type: String, required: true, enum: ['page_view', 'click'], index: true },
    page_url: { type: String, required: true, index: true },
    timestamp: { type: Date, required: true, index: true },
    x: { type: Number, default: null },
    y: { type: Number, default: null }
  },
  { versionKey: false }
);

EventSchema.index({ session_id: 1, timestamp: 1 });
EventSchema.index({ page_url: 1, event_type: 1 });

export default mongoose.model('Event', EventSchema);
