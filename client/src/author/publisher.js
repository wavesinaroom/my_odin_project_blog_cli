import { select } from '@inquirer/prompts'

const select_publisher_method = async ()=>{
  const answer = await select({message: 'Please select your publising method',
    choices: [
      {
        name: 'Publish',
        value: 'publish',
        description: 'Publishes a blog entry'
      },
      {
        name: 'Unpublish',
        value: 'unpublish',
        description: 'Unpublishes a blog entry'
      }
    ]
  });

  if(answer.value === 'publish')
    list_to_publish();
  else
    list_to_unpublish();
}

const list_to_publish = async()=>{
  fetch('http://localhost:3000/author/entry/publish')
    .then((data)=>{
      return data.json();
    })
    .then(async(entries)=>{
      if(entries.list.length === 0){
        console.error('You don\'t have any entries');
        return;
      }
      const options = [];
      entries.list.forEach((e)=>{
        options.push({name: e.title, value: e._id});
      })
      const answer = await select({message: 'Please choose an entry to publish',
                                   choices: options});
      publish(answer)
    })
    .catch((err)=>{
      if(err)
        console.error('Couldn\'t list your entries');
    });
}

const list_to_unpublish = async()=>{
  fetch('http://localhost:3000/author/entry/unpublish')
    .then((data)=>{
      return data.json();
    })
    .then(async(entries)=>{
      if(entries.list){
        console.error('You don\'t have any entries');
      }

      const options = [];
      entries.list.forEach((e)=>{
        options.push({name: e.title, value: e._id});
      })
      const answer = await select({message: 'Please choose an entry to unpublish',
                                   choices: options});
      unpublish(answer)
    })
    .catch((err)=>{
      if(err)
        console.error('Couldn\'t unpublish your entry');
    });
}

const publish = async(entry)=>{
  const endpoint = `http://localhost:3000/author/entry/${entry}/publish`;
    fetch(endpoint, {method:'PUT'});
}

const unpublish = async(entry)=>{
  const endpoint = `http://localhost:3000/author/entry/${entry}/unpublish`;
  fetch(endpoint, {method:'PUT'})
    .catch((err)=>{
      if(err)
        console.error('Couldn\'t unpublish your entry');
    });
}

export default select_publisher_method
