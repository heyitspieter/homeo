import multer from "multer";
import connect from "next-connect";
import ListingApi from "src/apis/listing";

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error("Uploaded file type not supported"));
    }

    callback(undefined, true);
  },
});

const apiRoute = connect({
  onError(error, req, res) {
    res
      .status(501)
      .send({ error: `An unexpected error occured. ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).send({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("image"));

apiRoute.patch(async (req, res) => {
  const listingApi = new ListingApi(req);

  const [success, err] = await listingApi.uploadImage({
    ...req.body,
    file: req.file,
  });

  if (success) return res.send(success);

  if (err && err.response && err.response.data) {
    return res.status(err.response.status).send(err.response.data);
  }

  res.status(422).send({ message: "An unexpected error has occured" });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
