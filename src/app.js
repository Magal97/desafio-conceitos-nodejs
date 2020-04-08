const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const likes = 0;  



app.get("/repositories", (request, response) => {

  return response.json(repositories);

});

app.post("/repositories", (request, response) => {

  const { url, title, techs } = request.body;

  const repository = { id: uuid(), title, url, techs, likes };
  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {

  const { id } = request.params;
  const { url, title, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0){

    return response.status(400).json({error: 'Project not found.' })

  }

  const Updatedrepository = {
    id,
    url,
    title,
    techs,
    likes

  };

  repositories[repositoryIndex] = Updatedrepository;

  return response.json(Updatedrepository);

});

app.delete("/repositories/:id", (req, res) => {
    
  const { id } = req.params;
    
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    
  if(repositoryIndex < 0){
    return res.status(400).json({error: 'Project not found.' })
  }

  repositories.splice(repositoryIndex, 1);

  return res.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {

  const { id } = request.params;


  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    
  if(repositoryIndex < 0){
    return response.status(400).json({error: 'Project not found.' })
  } 

  const { url, title, techs, likes } = repositories[repositoryIndex];

  const repositoryUpdatedLikes = {
    id, 
    url,
    title,  
    techs,
    likes: likes + 1  

  };


  repositories[repositoryIndex] = repositoryUpdatedLikes;

  return response.json(repositories[repositoryIndex]);

});

module.exports = app;
