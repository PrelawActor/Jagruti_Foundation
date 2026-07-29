exports.createOrder = async (req, res) => {

    console.log(req.body);

    res.json({
        success: true,
        message: "API Working"
    });

};