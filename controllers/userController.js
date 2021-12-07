const models = require('../models/index')

exports.index = async (req, res, next) => {
  console.log(req)
  const data = await models.User.findAll();
  res.status(200).json({
    data: data,
    param: req.query.id,
  });
};

exports.upload = async (req, res, next) => {
  console.log(req.file)
  try{
    res.status(200).json({
      data: "upload success",
    });
  }catch{
    res.status(500).json({
      data: "error!",
    });
  }
};
