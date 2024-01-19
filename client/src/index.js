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
      console.log('DESCRIPTION:','\n');
      console.group();
      console.log('BlogCLI reads and create blogposts with an interactive user interface.', '\n');
      console.log('It features an author profile and a reader profile for blog creation/reading :', '\n' );
      console.groupEnd();
      console.log('USAGE: blogcli [options]', '\n');
      console.group();
      console.log('OPTIONS:', '\n');
      console.group();
      console.log('-a Author mode');
      console.log('-r Reader mode', '\n');
      console.groupEnd();
      console.groupEnd();
      console.log('Made by wavesinaroom','\n')
      break;
    default:
      console.log(`Please enter a valid option`, '\n');
      console.log('Usage: blogcli [options]', '\n');
      console.group();
      console.log('Available options:', '\n');
      console.group();
      console.log('-a Author mode');
      console.log('-r Reader mode', '\n');
      console.groupEnd();
      console.groupEnd();
      console.log('Made by wavesinaroom', '\n');
  }
}

main();
