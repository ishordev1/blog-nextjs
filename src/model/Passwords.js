import mongoose from "mongoose";
import crypto from "crypto";

const passwordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username or email is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    note: {
      type: String,
      default: "",
      trim: true,
    },
    category: {
      type: String,
      enum: ["social", "work", "banking", "personal", "other"],
      default: "other",
    },
  },
  { timestamps: true }
);

// --- Encryption settings ---
const ALGO = "aes-256-ctr";
const KEY = Buffer.from(process.env.ENCRYPTION_KEY, "hex"); // 64 hex characters = 32 bytes
const IV = Buffer.alloc(16, 0); // static IV for simplicity (can randomize)

// --- Encrypt before saving ---
passwordSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  const cipher = crypto.createCipheriv(ALGO, KEY, IV);
  this.password = cipher.update(this.password, "utf8", "hex") + cipher.final("hex");
  next();
});

// --- Decrypt method ---
passwordSchema.methods.decryptPassword = function () {
  try {
    const decipher = crypto.createDecipheriv(ALGO, KEY, IV);
    return decipher.update(this.password, "hex", "utf8") + decipher.final("utf8");
  } catch (err) {
    console.error("Decrypt error:", err.message);
    return this.password;
  }
};

export const Password = mongoose.models.Passwords || mongoose.model("Passwords", passwordSchema);
