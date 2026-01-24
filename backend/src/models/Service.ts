import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const serviceSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    
    // SEO-friendly URL slug
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    
    // Service image
    image: { type: String, required: true },
    
    // Additional images gallery
    gallery: [{ type: String }],
    
    // Price for purchasing the service.
    price: { type: Number, required: true, min: 0 },
    
    // Original price for discount display
    originalPrice: { type: Number, min: 0 },
    
    // Currency support
    currency: { type: String, enum: ["INR", "USD"], default: "INR" },
    
    // Discount percentage
    discountPercent: { type: Number, min: 0, max: 100 },

    // Business Volume (BV) for this service purchase.
    businessVolume: { type: Number, required: true, min: 0 },

    // Short description for previews
    shortDescription: { type: String, trim: true, maxlength: 200 },
    
    // Full description
    description: { type: String, trim: true },

    // Enhanced status options with approval workflow
    status: { 
      type: String, 
      enum: ["pending_approval", "approved", "rejected", "active", "inactive", "out_of_stock"], 
      default: "pending_approval", 
      index: true 
    },
    
    // Approval tracking
    approvedAt: { type: Date, default: null },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    rejectedAt: { type: Date, default: null },
    rejectedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    rejectionReason: { type: String, trim: true },
    
    // Featured flag for highlighting
    isFeatured: { type: Boolean, default: false },
    
    // Category reference
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    
    // Tags for filtering and search
    tags: [{ type: String, trim: true }],
    
    // Rating and reviews
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviewCount: { type: Number, min: 0, default: 0 },

    // Legacy fields kept for backward compatibility with older data.
    // New code should use businessVolume/status.
    bv: { type: Number, required: false, min: 0 },

    // Legacy boolean (kept for older data).
    isActive: { type: Boolean, default: undefined },
  },
  { timestamps: true }
);

// Indexes for better query performance
serviceSchema.index({ slug: 1 });
serviceSchema.index({ status: 1, isFeatured: 1 });
serviceSchema.index({ categoryId: 1 });
serviceSchema.index({ tags: 1 });
serviceSchema.index({ rating: -1 });

serviceSchema.pre("validate", function syncLegacyFields() {
  const doc = this as unknown as {
    businessVolume?: number;
    bv?: number;
    status?: "active" | "inactive" | "out_of_stock";
    isActive?: boolean;
  };

  if (doc.businessVolume == null && doc.bv != null) {
    doc.businessVolume = doc.bv;
  }

  if (!doc.status && typeof doc.isActive === "boolean") {
    doc.status = doc.isActive ? "active" : "inactive";
  }

  // Keep legacy fields in sync for mixed environments.
  if (doc.businessVolume != null) {
    doc.bv = doc.businessVolume;
  }
  if (doc.status) {
    doc.isActive = doc.status === "active";
  }

});

export type Service = InferSchemaType<typeof serviceSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ServiceModel: Model<Service> =
  (mongoose.models.Service as Model<Service>) ||
  mongoose.model<Service>("Service", serviceSchema);
