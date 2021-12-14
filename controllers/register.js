const handleRegister = (req, res, db, bcrypt) =>{
    const {email, name, password} = req.body;
    if(!email || !name || !password){
        return res.status(400).json('incorrect form subnission')
    }
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            db.transaction(trx =>{
                trx.insert({hash,email})
                .into('login')
                .returning(['email','id'])
                .then(loginemail =>{
                    return trx('users')
                        .returning('*')
                        .insert({
                            name,
                            id:loginemail[0].id,
                            email:loginemail[0].email,
                            joined:new Date()
                        })
                        .then(user =>{
                            res.json(user[0]);
                        })            
                })
                .then(trx.commit)
                .catch(trx.rollback)
            })
            .catch(err =>res.status(400).json('unable to register'))
        });
    });
    
}
module.exports = {
    handleRegister
}