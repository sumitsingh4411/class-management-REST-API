const express = require('express');
const instrctor = require('./model/instrctor');
const student = require('./model/student');
require('./connection/connection');
const app = express();
app.use(express.json());
const port = process.env.port || 3000;
var jwt = require('jsonwebtoken');
const newteacher=require('./model/create')

if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}




function checkjwttoken(req,res,next)
{
    const token=localStorage.getItem('myFirstKey');
    try {
        jwt.verify(token, 'myKey').then(data=>{
            res.status(200).json({
                message: "login successfully",
                results: data
            })
            next();
        }).catch(err=>{
          res.json(err)
        })
      } catch(err) {
        res.json(err)
      }

}
//create username or password for auth
app.post('/signup',(req,res)=>{
    const intruct = new newteacher({
        name: req.body.name,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
    });
    intruct.save().then(data => {
        const token = jwt.sign({ username:username,password:password }, 'myKey');
        localStorage.setItem('myFirstKey', token); 
        res.status(200).json({
            message: "auth create successfully",
            results: data
        })

    }).catch(err => {
        res.json(err);
    })
})
app.post('/login',(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    instrctor.find({username}).then((data)=>{
        if(data.password!=password)
        {
            res.json({
                err:err,
                msg:"username or password is not matched"
            });
        }
        else
        {
            const token = jwt.sign({ username:username,password:password }, 'myKey');
            localStorage.setItem('myFirstKey', token); 
            res.json({
                msg:"successfully login"
            });

        }
    }).catch((err)=>{
        res.json({
            err:err,
            msg:"username or password is not matched"
        });
    })
})
//teacher crud operation
app.get('/', checkjwttoken,(req, res) => {
    instrctor.find({}).then(data => {
        res.status(200).json({
            message: "teacher list",
            results: data
        })

    }).catch(err => {
        res.json(err);
    })
})
app.post('/', checkjwttoken, (req, res) => {
    // let d="";
    // bcrypt.hash(req.body.password, 10, function(err, hash) {
    //      if(err)
    //      res.json(err);
    //      else
    //      d=hash;

    // });
    // console.log(d)
    const intruct = new instrctor({
        name: req.body.name,
        address: req.body.address,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        id_card: req.body.id_card,
        bank_details: req.body.bank_details

    });
    intruct.save().then(data => {
        res.status(200).json({
            message: "teacher inserted successfully",
            results: data
        })

    }).catch(err => {
        res.json(err);
    })
})
app.put('/:id',checkjwttoken, (req, res) => {
    const id = req.params.id;
    instrctor.findById(id, (err, data) => {
        data.name = req.body.name ? req.body.name : data.name;
        data.address = req.body.address ? req.body.address : data.address;
        data.id_card = req.body.id_card ? req.body.id_card : data.id_card;
        data.save().then(data => {
            res.status(200).json({
                message: "teacher updated successfully",
                results: data
            })
    
        }).catch(err => {
            res.json(err);
        })

    })
})
app.delete('/:id',checkjwttoken, (req, res) => {
    const id = req.params.id;
    instrctor.findByIdAndRemove(id).then(data => {
        res.status(200).json({
            message: "teacher deleted successfully",
            results: data
        })
    }).catch(err => {
        res.json(err);
    })
})


//student crud operation
app.get('/student',checkjwttoken, (req, res) => {
    student.find({}).then(data => {
        res.status(200).json({
            message: "student list",
            results: data
        })

    }).catch(err => {
        res.json(err);
    })
})
app.post('/student',checkjwttoken, (req, res) => {
    const stud = new student({
        name: req.body.name,
        address: req.body.address,
        id_card: req.body.id_card,
    });
    stud.save().then(data => {
        res.status(200).json({
            message: "student inserted successfully",
            results: data
        })

    }).catch(err => {
        res.json(err);
    })
})
app.put('/student/:id',checkjwttoken, (req, res) => {
    const id = req.params.id;
    student.findById(id, (err, data) => {
        data.name = req.body.name ? req.body.name : data.name;
        data.address = req.body.address ? req.body.address : data.address;
        data.id_card = req.body.id_card ? req.body.id_card : data.id_card;
        data.save().then(data => {
            res.status(200).json({
                message: "student updated successfully",
                results: data
            })
    
        }).catch(err => {
            res.json(err);
        })

    })
})
app.delete('/student/:id',checkjwttoken, (req, res) => {
    const id = req.params.id;
    student.findByIdAndRemove(id).then(data => {
        res.status(200).json({
            message: "student remove successfully",
            results: data
        })
    }).catch(err => {
        res.json(err);
    })
})
// if url is not found
app.use(function (req, res, next) {
    next(createError(404));
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500)
    res.status(404).json({
        error: "page not found",
    })
    res.status(500).json({
        error: "internal server error",
    })
})
//listining on port 
app.listen(port, () => {
    console.log('listining on port', port)
})