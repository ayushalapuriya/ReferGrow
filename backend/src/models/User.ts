import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

export type UserRole = "admin" | "user";

export type BinaryPosition = "left" | "right";

export type UserStatus = "active" | "suspended" | "deleted";

const userSchema = new Schema(
  {
    // Signup Fields
    mobile: { type: String, required: true, unique: true, trim: true },
    countryCode: { type: String, default: "+91", trim: true },
    name: { type: String, trim: true, default: "" },
    email: { type: String, unique: true, lowercase: true, trim: true, sparse: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], required: true, default: "user" },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },

    // Business Settings (Profile Fields)
    businessName: { type: String, trim: true },
    companyPhone: { type: String, trim: true },
    companyEmail: { type: String, lowercase: true, trim: true },
    website: { type: String, trim: true },
    billingAddress: { type: String, trim: true },
    state: { type: String, trim: true },
    pincode: { type: String, trim: true },
    city: { type: String, trim: true },
    language: { type: String, trim: true },
    businessType: { type: String, trim: true },
    industryType: { type: String, trim: true },
    businessDescription: { type: String, trim: true },
    gstin: { type: String, trim: true },
    panNumber: { type: String, trim: true },
    isGSTRegistered: { type: Boolean, default: false },
    enableEInvoicing: { type: Boolean, default: false },
    enableTDS: { type: Boolean, default: false },
    enableTCS: { type: Boolean, default: false },
    businessLogo: { type: String, trim: true },
    signature: { type: String, trim: true },
    currencyCode: { type: String, default: "INR", trim: true },
    currencySymbol: { type: String, default: "₹", trim: true },

    // Account status: active, suspended (blocked by admin), deleted (soft delete)
    status: { type: String, enum: ["active", "suspended", "deleted"], default: "active", index: true },
    
    // Session expiry: when set, user cannot login after this date
    sessionExpiresAt: { type: Date, default: null },

    // Unique code this user shares with new signups.
    referralCode: { type: String, required: true, unique: true, index: true },

    // The user who referred this user (nullable for root/admin accounts).
    parent: { type: Schema.Types.ObjectId, ref: "User", default: null, index: true },

    // Binary placement position under `parent`.
    // - null when parent is null (root)
    // - each parent can have at most 1 left + 1 right child
    position: { type: String, enum: ["left", "right"], default: null, index: true },
  },
  { timestamps: true }
);

// Additional indexes for better query performance
userSchema.index({ isVerified: 1 });
userSchema.index({ isBlocked: 1 });

// Enforce binary constraint: a given parent can have only one left child and one right child.
// Using a partial index keeps multiple root users (parent=null) from conflicting.
userSchema.index(
  { parent: 1, position: 1 },
  {
    unique: true,
    partialFilterExpression: { parent: { $type: "objectId" }, position: { $in: ["left", "right"] } },
  }
);

export type User = InferSchemaType<typeof userSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const UserModel: Model<User> =
  (mongoose.models.User as Model<User>) || mongoose.model<User>("User", userSchema);
