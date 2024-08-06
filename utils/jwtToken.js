const jwtToken = (user,message,statusCode,res) =>{
    const token = user.generateJwt();
    const cookieName = user.role === 'Admin' ? 'AdminToken': 'PatientToken';
    res.status(statusCode).cookie(cookieName,token,{
        expires:new Date(Date.now() + process.env.COOKIE_EXPIRE* 24 * 60 * 60*1000)
    })
    .json({
        success:true,
        message,
        user,
        token
    })
}

module.exports = jwtToken;