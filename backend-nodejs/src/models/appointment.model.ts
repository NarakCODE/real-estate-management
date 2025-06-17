import { Schema, model, Document } from "mongoose";

interface IAppointment extends Document {
  propertyId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  agentId: Schema.Types.ObjectId;
  requestedDateTime: Date;
  confirmedDateTime?: Date;
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
  notes?: string;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    agentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requestedDateTime: {
      type: Date,
      required: true,
    },
    confirmedDateTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
      required: true,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

const Appointment = model<IAppointment>("Appointment", appointmentSchema);

export default Appointment;
