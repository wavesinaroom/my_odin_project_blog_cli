#!/usr/bin/env node

const { argv } = require('node:process');

async function main(){
  switch(argv[2]){
    case `-a`:
      const text = await fetch('http://localhost:3000/home')
        .then(function(response){
          return response.text();
        })
        .catch(function(err){
          console.error(err);
        });
      console.log(text);
      break;
    case `-r`:
      console.log(`reader`);
      break;
    case undefined:
      console.log(`Please provide an option`);
      break;
    default:
      console.log(`Please enter a valid option`);
  }
}

main();
