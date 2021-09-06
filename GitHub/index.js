const {Octokit} = require('@octokit/rest');
const configJson = require('./config.json');
//Initialize client, needed for every action, it need a key in object format
const client = new Octokit({
    auth:configJson.token
});

const user='DnRT';
const repo='Allie-Testing-API';
//Create an issue, only need a title
function createIssue(titleIssue){
    client.rest.issues.create({
        owner:user,
        repo:repo,
        title:titleIssue 
    });
}
//Close an issue, issue number needed
function closeIssue(number){
    client.rest.issues.update({
        owner:user,
        repo:repo,
        issue_number:number,
        state:"closed"
    });
}
//Add a colaborator
function addColaboratorToRepo(colaborator){
    client.rest.repos.addCollaborator({
        owner:user,
        repo:repo,
        username:colaborator
    });
}
//Add colaborator with specific/all permissions
function addColaboratorToRepo(colaborator,permissions){
    client.rest.repos.addCollaborator({
        owner:user,
        repo:repo,
        username:colaborator,
        permission:permissions
    });
}
//Create a project on a repo
function createProject(titleP){
    client.rest.projects.createForRepo({
        owner:user,
        repo:repo,
        name:titleP
    })
}
//Update project card
function updateCard(id,newNote,arch){
    client.rest.projects.updateCard({
        card_id:id,
        note:newNote,
        archived:arch
    })
}
