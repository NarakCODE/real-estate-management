import mongoose, { type Document, Schema } from "mongoose";

export interface IDeal extends Document {
  propertyId: Schema.Types.ObjectId;
  agentId: Schema.Types.ObjectId;
  clientId: Schema.Types.ObjectId;
  dealType: "Sale" | "Rent";
  agreedPrice: number;
  currency: string;
  dealClosedAt: Date;
}

const dealSchema = new Schema<IDeal>(
  {
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    agentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    dealType: { type: String, enum: ["Sale", "Rent"], required: true },
    agreedPrice: { type: Number, required: true },
    currency: { type: String, required: true },
    dealClosedAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const DealModel = mongoose.model<IDeal>("Deal", dealSchema);

export default DealModel;
