#!/usr/bin/env node
import { readFile } from 'node:fs';
import { argv } from'node:process';
import author from './author.js';

function main(){
  switch(argv[2]){
    case `-a`:
      author(); 
      break;
    case `-r`:
      console.log('reader');
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

main();
