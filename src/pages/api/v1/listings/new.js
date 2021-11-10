import formidable from "formidable";
import ListingApi from "src/apis/listing";

function runMiddleware(req, res) {
  const form = new formidable.IncomingForm({
    multiples: true,
  });

  return new Promise(function (resolve, reject) {
    form.parse(req, function (err, fields, files) {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export default async (req, res) => {
  const listingApi = new ListingApi(req);

  if (req.method === "POST") {
    let formData = await runMiddleware(req, res);

    req.body = formData.fields;

    const [success, err] = await listingApi.createListing(req.body);

    if (success) return res.send(success);

    if (err && err.response && err.response.data) {
      return res.status(err.response.status).send(err.response.data);
    }

    res.status(422).send({ message: "An unexpected error has occured" });
  } else {
    res.status(405).end();
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
