const signUp = (request, response) => {
    response.status(200).json({
        status: "success",
    })
}


module.exports = {signUp}