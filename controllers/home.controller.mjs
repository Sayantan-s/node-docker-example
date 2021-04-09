export const getHome = (req,res) => {
    console.log(req.session)
    return res
    .status(200)
    .render('index',{
        route : 'Home'
    })
}