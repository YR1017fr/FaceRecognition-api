const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key af090c2f17f1445dbae7b95f10ebcdcf");




const Clarifai = require('clarifai');
console.log(Clarifai);
const app = new Clarifai.App({
    apiKey: 'af090c2f17f1445dbae7b95f10ebcdcf'
   });

const handleApiCall = (req, res) =>{
    // stub.PostModelOutputs(
    //     {
    //         model_id: "{THE_MODEL_ID}",
    //         version_id: "{THE_MODEL_VERSION_ID}",  // This is optional. Defaults to the latest model version.
    //         inputs: [
    //             {data: {image: {url: req.body.input}}}
    //         ]
    //     },
    //     metadata,
    //     (err, response) => {
    //         if (err) {
    //             throw new Error(err);
    //         }
    
    //         if (response.status.code !== 10000) {
    //             throw new Error("Post model outputs failed, status: " + response.status.description);
    //         }
    //         const output = response.outputs[0];
    //         return res.json(output);
    //     }
    // );
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data =>res.json(data))
    .catch(err =>res.status(400).json('unable to work with API'))
   }


const handleImage=(req,res,db)=>{
    const {id} = req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0])
    })
    .catch(err=>res.status(400).json('unable to get entries'))
}

module.exports={
    handleImage:handleImage,
    handleApiCall:handleApiCall
}