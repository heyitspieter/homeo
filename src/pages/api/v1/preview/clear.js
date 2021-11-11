export default async (req, res) => {
  if (req.method === "POST") {
    res.clearPreviewData();

    return res.send({ success: true });
  } else {
    res.status(405).end();
  }
};
