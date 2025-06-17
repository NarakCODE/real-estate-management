import mongoose, { type Document, Schema } from "mongoose";

export interface IReview extends Document {
  authorId: Schema.Types.ObjectId;
  propertyId?: Schema.Types.ObjectId;
  agentId?: Schema.Types.ObjectId;
  rating: number;
  comment: string;
}

const reviewSchema = new Schema<IReview>(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
    },
    agentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
  }
);

reviewSchema.pre("validate", function (next) {
  if (!this.propertyId && !this.agentId) {
    next(new Error("A review must be for a property or an agent."));
  } else {
    next();
  }
});

const ReviewModel = mongoose.model<IReview>("Review", reviewSchema);

export default ReviewModel;
