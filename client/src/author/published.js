import chalk from 'chalk';
import { select, confirm } from '@inquirer/prompts'

const list_to_publish = async()=>{
  fetch('http://localhost:3000/author/entry/publish')
    .then((data)=>{
      return data.json();
    })
    .then(async(entries)=>{
      const options = [];
      entries.list.forEach((e)=>{
        options.push({name: e.title, value: e._id});
      })
      const answer = await select({message: 'Please choose an entry to publish',
                                   choices: options});
      publish(answer)
    });
}

const list_to_unpublish = async()=>{
  fetch('http://localhost:3000/author/entry/unpublish')
    .then((data)=>{
      return data.json();
    })
    .then(async(entries)=>{
      const options = [];
      entries.list.forEach((e)=>{
        options.push({name: e.title, value: e._id});
      })
      const answer = await select({message: 'Please choose an entry to unpublish',
                                   choices: options});
      unpublish(answer)
    });
}

const publish = async(entry)=>{
  const endpoint = `http://localhost:3000/author/entry/${entry}/publish`;
    fetch(endpoint, {method:'PUT'});
}

const unpublish = async(entry)=>{
  const endpoint = `http://localhost:3000/author/entry/${entry}/unpublish`;
    fetch(endpoint, {method:'PUT'});
}

export { list_to_publish, list_to_unpublish}
