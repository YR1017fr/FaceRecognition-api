const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key af090c2f17f1445dbae7b95f10ebcdcf");


const handleApiCall = (req, res) =>{
    stub.PostModelOutputs(
        {
            model_id: "a403429f2ddf4b49b307e318f00e528b",
            inputs: [{data: {image: {url: req.body.input}}}]
        },
        metadata,
        (err, response) => {
            if (err) {
                return console.log(err);
            }
            if (response.status.code !== 10000) {
                return res.json('無效網址')
            }
            res.json(response);
        }
    );
}


const handleImage=(req,res,db)=>{
    const {id} = req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0])
    })
    .catch(err =>res.status(400).json('unable to get entries'))
}

module.exports={
    handleImage:handleImage,
    handleApiCall:handleApiCall
}