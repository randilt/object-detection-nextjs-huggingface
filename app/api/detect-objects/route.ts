import { AutoModel, AutoProcessor, RawImage } from "@xenova/transformers";

export async function POST(req: Request, res: Response) {
  const { url } = await req.json();
  console.log(url);

  return new Response(
    JSON.stringify({
      url: url,
    }),
    { status: 200 }
  );
}

// if (file) {
//   setLoading(true);
//   setShowProgressButton(true);
//   const res = await edgestore.publicFiles.upload({
//     file,
//     onProgressChange: (progress) => {
//       // you can use this to show a progress bar
//       setProgress(progress);
//     },
//   });
//   setLoading(false);
//   // you can run some server action or api here
//   // to add the necessary data to your database
//   // set the imgData to the url of the uploaded image file
//   setImgData(res.url);
//   axios.post("/api/detect-object", { url: res.url });
// }
