const express = require('express'),
      app = express(),
      morgan = require('morgan'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      passport = require('passport');

const PORT = 3000;
const secret = require('./secret');

const authRoute = require('./routes/');
const plRoute = require('./routes/pl');

app.use(bodyParser.json({ type: "*/*" }))
app.use(cors());
app.use(morgan('combined'));
app.use(passport.initialize());

app.get('/', (req, res) => {
    res.json({
        response: "Hey this is a test route, if you see this message... good job (Y)"
    })
})

app.get('/sample', (req, res) => {
    res.json([
        {
            _id: "apxvpu0scsmtwvv",
            current: {
                lat: 49.2827,
                lng: 123.1207
            },
            time: "2018-10-17T00:00:00:000000Z",
            zoom: 12,
            avaiable_data: [
                { 
                    //ref
                    id: "rcfyicmy3tp5z6r",
                    restrictions: [
                        { 
                            day: [0, 2, 4],
                            time: {
                                start: "8:00 AM",
                                end: "4:00 PM"
                            }
                        },
                        {
                            day: [1, 3, 5, 6],
                            time: {
                                start: "12:00 PM",
                                end: "4:00 PM"
                            }
                        }
                    ],
                    points: [
                        {
                            lat: 49.2827,
                            lng: 123.1207
                        },
                        {
                            lat: 49.2828,
                            lng: 123.1208
                        },
                        {
                            lat: 49.2829,
                            lng: 123.1209
                        },
                        {
                            lat: 49.2830,
                            lng: 123.1210
                        },
                        {
                            lat: 49.2821,
                            lng: 123.1211
                        },

                    ]
                },
            ]

        }
    ])
})

authRoute(app);
// plRoute(app);



app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})

mongoose.connect(`mongodb://${secret.id}:${secret.pass}@ds221115.mlab.com:21115/parkzone`,  { useNewUrlParser: true,  useCreateIndex: true }, () => {
    console.log(`Database server is connected`);
})