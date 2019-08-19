module.exports = {

    
   sayHello(req, res) {
    var name = req.body.name;
    res.status(200).send({message: "Hello"});

}
    

    
}