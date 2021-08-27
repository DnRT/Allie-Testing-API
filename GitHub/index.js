const {Octokit} = require('@octokit/rest');
const configJson = require('./config.json');
const client = new Octokit({
    auth:configJson.token
});

const user='DnRT';
const repo='Allie-Testing-API';
function createIssue(titleIssue){
    client.rest.issues.create({
        owner:user,
        repo:repo,
        title:titleIssue 
    });
}
function closeIssue(number){
    client.rest.issues.lock({
        owner:user,
        repo:repo,
        issue_number:number
    });
}
let issues=client.rest.issues.listForRepo({
    owner:user,
    repo:repo
}).then((response)=>{
    const titleA= "Creating issue test";
    for(let x=0;x<response.data.length;x++){
        if(response.data[x].title===titleA){
            closeIssue(response.data[x].number);
        }
        else{
            createIssue(titleA);
        }
    }
});