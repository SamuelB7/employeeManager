function onlyUsers(req, res, next) {
    if(!req.session.companyId) {
        return res.redirect('/company/login')
    } 
    //console.log(req.session)
    next()
}

function logged(req, res, next) {
    if(req.session.companyId){
        return res.redirect(`/company/${req.session.companyId}`)
    }

    next()
}

module.exports = {
    onlyUsers,
    logged
}