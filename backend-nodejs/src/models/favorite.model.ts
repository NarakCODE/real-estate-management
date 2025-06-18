import mongoose, { Schema, Types } from "mongoose";

export interface IFavorite {
    userId: Types.ObjectId;
    propertyId: Types.ObjectId;
    savedAt: Date;
}

const FavoriteSchema = new Schema<IFavorite>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    propertyId: {
        type: Schema.Types.ObjectId,
        ref: "Property",
        required: true,
    },
    savedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IFavorite>("Favorite", FavoriteSchema);
