const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create School Schema and model
const SchoolSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },

  adress_str: {
    type: String,
    required: false
  },

  phone: {
    type: String,
    default: "+32 2 553 50 70",
    // required: [true, "Phone number field is required"],
  },

  email: {
    type: String,
    default: "hyf.ischool@gmail.com",
    // required: [true, "Email field is required"],
  },

  rating: {
    type: Number,
    required: false,
    default: 0,
  },

  types: {
    type: String,
    enum: ["Public", "Private"],
    required: [true, "Types is required"],
  },

  areas: {
    type: [String],
    enum: ["General", "Technical", "Vocational", "Art Secondary Education"],
    required: [true, "Areas is required"],
  },
  network: {
    type: String,
    enum: [
      "GO Network",
      "Catholic Network",
      "Municipality Schools",
      "Private schools",
    ],
    required: [true, "Network is required"],
  },
  languageClasses: {
    type: Boolean,
    // required: [true, 'Language classes is required']
    default: true,
  },

  comments: {
    type: Number,
    default: 0,
  },

  photo: {
    type: String,
    required: false,
    //required: [true, "Photo is required"],
  },

  website: {
    type: String,
    default: "https://onderwijs.vlaanderen.be/en/education-in-flanders",
    // required: [true, "Website is required"],
  },

  adress: {
    postcode: {
      type: Number,
      required: [true, "Post code is required"],
    },

    city: { type: String, default: "Gent" },
    street: {
      type: String,
      required: [true, "Street is required"],
    },
    building: {
      type: String,
      required: [true, "Building No is required"],
    },
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

SchoolSchema.index({ location: "2dsphere" });
SchoolSchema.index({ adress: 1, name: 1 }, { unique: true });

const School = mongoose.model("School", SchoolSchema, "schools");

module.exports = School;
