import express from "express"
const app = express()

const port = 3000

function getDay() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sonntag, 1 = Montag, ..., 6 = Samstag

    if (dayOfWeek === 0 || dayOfWeek === 6) {
        return "It's the weekend, it's time to have fun!"
    }
    else {
        return "It's a weekday, it's time to work hard!"
    }
}

app.get("/", (req, res) => {
    const getDayMessage = getDay();
    res.render("index.ejs", { getDayMessage: getDayMessage});
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})