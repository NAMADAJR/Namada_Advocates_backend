const express = require('express');

const app = express();


// Index route
app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});


const PORT = process.env.PORT || 5400;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
