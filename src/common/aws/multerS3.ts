import { HttpException } from '@nestjs/common';
import * as moment from 'moment-timezone';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
dotenv.config();

const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const storage = multerS3({
  s3: s3,
  acl: 'public-read',
  bucket: process.env.AWS_S3_BUCKET,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const dateTime = moment().format('YYYYMMDDHHmmss');

    if (!['png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(ext)) {
      return cb(new HttpException('system.error.noImageFile', 400));
    }

    cb(
      null,
      `${dateTime}_${Math.floor(Math.random() * 10000).toString()}_${
        file.originalname
      }`,
    );
  },
});

export const s3Single = () => {
  const limits = {
    fileSize: 5242880 * 2, //10MB
  };

  const upload = {
    storage: storage,
    limits,
  };

  return upload;
};

export const s3Multi = () => {
  const limits = {
    fileSize: 5242880 * 4, //20MB
  };

  const upload = {
    storage: storage,
    limits,
  };

  return upload;
};
