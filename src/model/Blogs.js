const { model, default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    imgUrl: {
      type: String,
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      require: true,
    },
  },
  { timestamps: true }
);

export const Blogs =
  mongoose.models.Blogs || mongoose.model("Blogs", blogSchema);
