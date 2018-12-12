var palaute = require('../models/palaute'); 


exports.palaute_list = function(req,res,next) { 
    var palauteList=[]; 
    palaute.getAllPalaute(function(err, rows, fields) {  
        if (err) {  
        return next(err); } 
        for (var i = 0; i < rows.length; i++) { 

            // Create an object to save current row's data 
            var palaute = { 
                'id':rows[i].id, 
                'sisalto':rows[i].sisalto 
            } 
            // Add object into array 
            palauteList.push(palaute); 
        } 

            // Render index.pug page using array  
        res.render('palaute', {title:'TODO',palauteList:palauteList}); 
    }); 
}; 
exports.palaute_details = function(req,res,next) {
    var palaute;
    if (req.params.id) { 
        palaute.getPalauteById(req.params.id, function(err, rows, fields) { 
            if (err) { 
            return next(err); }
            if(rows.length==1) {
                palaute = {
                    'id':rows[0].id,
                    'sisalto':rows[0].sisalto
                }
                res.render('details', {title:'TODO',palaute: palaute});
            } 
            else {
                res.status(404).json({"status_code":404, "status_message": "Not found"});
            }
        });
    }
};    
// Handle Task create on GET 

exports.palaute_create_get = function(req, res, next) {      
    res.render('palaute_form', { title: 'Luo tehtävä' });
};

// Handle Task create on POST 
exports.palaute_create_post = function(req, res, next) {
    
    
    //Check that the Title field is not empty
    req.checkBody('title', 'Title is required').notEmpty(); 
    
    //Trim and escape the name field. 
    req.sanitize('title').escape();
    req.sanitize('title').trim();
    
    
    
    //Run the validators
    var errors = req.validationErrors();
    
    var palaute = 
      { id:'', 
        title: req.body.title, 
        status:'pending'
       };
    
    if (errors) {
        //If there are errors render the form again, passing the previously entered values and errors
        res.render('palaute_form', { title: 'Luo tehtävä', palaute: palaute, errors: errors});
    return;
    } 
    else {

        palaute.addPalaute(palaute,function(err){
            if(err) {return next(err);}
            res.redirect("/Palautteet");
        });
        
    }
};
    