// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;

export default function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        const { token } = req.cookies;
        const checkDataset = async () => {
          const response1 = await fetch(
            `${API_ROUTE}/preprocess/null/?username=${req.query.username}&workspace=${req.query.workspace}&filename=${req.query.filename}&type=${req.query.type}`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          const missingData = await response1.json();

          const response2 = await fetch(
            `${API_ROUTE}/preprocess/duplication/?username=${req.query.username}&workspace=${req.query.workspace}&filename=${req.query.filename}&type=${req.query.type}`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          const duplicateData = await response2.json();

          const response3 = await fetch(
            `${API_ROUTE}/preprocess/outlier/?username=${req.query.username}&workspace=${req.query.workspace}&filename=${req.query.filename}&type=${req.query.type}`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          const outlierData = await response3.json();

          const response4 = await fetch(
            `${API_ROUTE}/preprocess/boxplot/?username=${req.query.username}&workspace=${req.query.workspace}&filename=${req.query.filename}&type=${req.query.type}`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          const boxplotDatas = await response4.json();

          return { missingData, duplicateData, outlierData, boxplotDatas };
        };
        checkDataset().then((data) => res.status(200).json(data));
        break;
      default:
        res.status(200).json({ name: "Jon Doe" });
    }
  } catch (err) {
    res.json(err);
    res.status(405).end();
  }
}
