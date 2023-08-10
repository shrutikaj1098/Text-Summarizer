require ('dotenv').config();
const express= require('express');
const hbs=require('hbs');
const app=express();
const { Configuration, OpenAIApi } = require("openai");



app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(express.static('public'));
app.set('view engine','hbs');
const PORT = 3001;

app.get('/',function(req,res)
{
    res.render('index');
});

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

app.post('/summary',async function(req,res)
{
    // console.log(req.body);
    // res.json("Textarea received successfully");
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-0613",
        messages: [ {role: "user", content: req.body.article}],
        functions:[
            {
                "name": "generate_summary",
                "description": "generate summary of the given text",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "type": "string",
                        "description": "generated summary of the given text",
                    },
                    "words_count": {
                        "type": "integer",
                        "description": "count the number of words in the generated summary",
                    }},
                    "required":["summary","words_count"]
            }
        ],
        function_call:{"name":"generate_summary"},
        
      }); 
      console.log(completion.data.choices[0].message);
      const response=JSON.parse(completion.data.choices[0].message.function_call.arguments);
      res.json(response)
    //   console.log(response);
})


app.listen(PORT,()=>{
    console.log('listening on port');
})