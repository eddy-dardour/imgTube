const mongoose = require("mongoose");
const VideoSchema = mongoose.Schema({
  title: {
    type : String,
    required : true
  },
  data: Buffer,
  id : {
    type : String,
    required : true
  },
  views : Number,
  likes : Number,
});
module.exports = mongoose.model("Video", VideoSchema);
