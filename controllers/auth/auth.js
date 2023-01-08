

module.exports.login = (req, res, next)=>{
    console.log('Logged In')
    return res.json({status: true})
}