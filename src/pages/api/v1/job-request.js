import multer from "multer";
import connect from "next-connect";
import JobRequestApi from "src/apis/job-request";

const upload = multer({
  limits: {
    fileSize: 800000,
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

apiRoute.use(upload.array("file", 6));

apiRoute.post(async (req, res) => {
  const jobRequestApi = new JobRequestApi();

  if (req.method === "POST") {
    const [success, err] = await jobRequestApi.submit({
      ...req.body,
      files: req.files,
    });

    if (success) return res.send(success);

    if (err && err.response && err.response.data) {
      return res.status(err.response.status).send(err.response.data);
    }

    res.status(422).send({ message: "An unexpected error has occured" });
  } else {
    res.status(405).end();
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
