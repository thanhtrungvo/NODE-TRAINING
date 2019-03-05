const NotFound = (req, res, next)=>{
    res.status(404).render('404',{title: "Not Found", path:""} )
}
module.exports = NotFound;