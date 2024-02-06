#!/usr/bin/env node
import { password } from '@inquirer/prompts';
import { readFile } from 'node:fs';
import { argv } from'node:process';
import reader from './reader/reader.js';
import author from './author/author.js'

function main(){
  switch(argv[2]){
    case `-a`:
      login();
      break;
    case `-r`:
      reader();
      break;
    case undefined:
      readFile('./views/run.txt', {encoding: 'utf8'}, (err,data)=>{
        if(err) throw err;
        console.log(data);
      });
      break;
    default:
      readFile('./views/run_invalid_options.txt', {encoding:'utf8'},(err,data)=>{
        if(err) throw err;
        console.log(data);
      });
      break;
  }
}

const login = async()=>{
  const answer = await password({message: 'Hi author! Please enter your password', mask: true});
  fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({password: answer})
    })
    .then(res=>{
      if(res.status === 200){
        author();
        return;
      }else if(res.status === 401){
        console.error('Wrong password');
      }
    })
    .catch((err)=>{
      if(err)
        console.error('Could not log you in');
    });
}

process.on('SIGINT', ()=>{
  fetch('http://localhost:3000/quit-by-user');
});

process.on('SIGTERM', ()=>{
  fetch(('http://localhost:3000/quit/shutdown'));
});
main();
