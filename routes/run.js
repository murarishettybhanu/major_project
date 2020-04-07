var hackerEarth = require('hackerearth-node'); //require the Library
//Now set your application 
var hackerEarth = new hackerEarth(
    'af5c254895b65fa63c19d5def82747a1064428d0',  //Your Client Secret Key here this is mandatory
    ''  //mode sync=1 or async(optional)=0 or null async is by default and preferred for nodeJS
);
module.exports = async (req, res) => {
    var config = {};
    config.time_limit = 1;  //your time limit in integer
    config.memory_limit = 323244;  //your memory limit in integer
    config.source = req.body.code;  //your source code for which you want to use hackerEarth api
    config.input = req.body.inputs;  //input against which you have to test your source code
    config.language = req.body.lang; //optional choose any one of them or none

    //compile your code 
    hackerEarth.run(config)
        .then(result => {
            let a = result;
            a = JSON.parse(a);
            // console.log(a.run_status.output_html)
            res.render("compiler", { code: req.body.code, lang: req.body.lang, inputs: req.body.inputs, output: a.run_status.output, post: req.body.post });
            //Handle Result
        })
        .catch(err => {
            console.log(err)
            //Handle Error
        });
}
