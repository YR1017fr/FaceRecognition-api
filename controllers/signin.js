const handleSignin=(req,res,db,bcrypt)=>{
    const{email,password}=req.body;
    if(!email||!password){
        return res.status(400).json('incorrect form subnission')
    }
    db.select('email','hash').from('login')   
        .where('email','=',email)
        .then(data=>{
            bcrypt.compare(password, data[0].hash, function(err, response) {
                if(response){
                    return db.select('*').from('users')
                        .where('email','=',email)
                        .then(user=>{
                            res.json(user[0])
                        })
                        .catch(err=>res.status(400).json('unable to get uesr'))
                }else{
                    res.status(400).json('wrong credentials')
                }
            });
        })
        .catch(err=>res.status(400).json('wrong credentials'))     
}

module.exports={
    handleSignin:handleSignin
}