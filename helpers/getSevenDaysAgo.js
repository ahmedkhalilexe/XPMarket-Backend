getSevenDaysAgo = () =>{
    let current = new Date();
    current.setDate(current.getDate() - 30);
    return current;
}
module.exports = getSevenDaysAgo;