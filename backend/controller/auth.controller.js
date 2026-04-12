exports.createAccount = async(req,res)=>{
    const {orgName,orgMail,location,password} = req.body;

    if(!orgName || !orgMail || !location || !password){
        return res.status(400).json({
            message:"All fields are required ."
        })
    }
    try {
        
    } catch (error) {
        return res.status(500).json({
            message:"Something went wrong. Please try again later."
        })
    }
}