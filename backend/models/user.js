const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
      index: true,
      lowercase: true
    },

    surname: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },

    firstname: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },

    othername: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true
    },

    phonenumber: {
      type: Number,
      required: true,
      unique: true,
      length: [10, "enter a proper number"]
    },

    profile: {
      type: String,
      required: true
    },

    hashed_password: {
      type: String,
      required: true
    },

    salt: String,
    role: {
      type: "Number",
      trim: true
    },

    // photo: {
    //   data: Buffer,
    //   type: String
    // },

    avatar: {
      public_id: {
        type: String,
        default: "avatar/123"
      },
      url: {
        type: String,
        default:
          "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
      }
    },

    resetPasswordLink: {
      data: String,
      default: ""
    },

    school: {
      type: String,
      trim: true,
      required: true
    },

    subject: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function(password) {
    // create a temporary variable called password
    this._password = password;

    //generate salt
    this.salt = this.makeSalt();

    // encryptpassword
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function(password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  }
};

module.exports = mongoose.model("User", userSchema);
