import chalk from 'chalk';
import { input, editor, checkbox, select, confirm } from "@inquirer/prompts"; 

const select_editor_method = async()=>{
  const answer = await select({message:'Please select your action', 
    choices: [
      {
        name: 'Create',
        value: 'create',
        description: 'Creates a blog entry'
      },
      {
        name: 'Edit/Remove',
        value: 'edit_remove',
        description: 'Edit or remove an entry'
      }
    ]
  });

  if(answer === 'create')
    create();
  else
    list();
}

const create = async()=>{
  const answers = {
    title: await input({message: 'Please enter your title'}),
    body: await editor({message: 'Please write your blogpost body'})
  }
  fetch('http://localhost:3000/author/entry/create',
    {method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title: answers.title, text: answers.body})});
};

const list = async()=>{
  fetch('http://localhost:3000/author/entries',)
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
        options.push({name: e.title, value: e.title});
      })
      const answers = {
        entry: await select({message: 'Please choose your entry', choices: options}),
        action: await select({message: 'Do you what to edit or remove your entry?'
                              , choices: [{name: 'Edit', value: 'edit'}, {name:'Remove', value: 'remove'}]})
      }

      if(answers.action === 'edit')
        edit(entries.list.find((e)=> e.title === answers.entry));
      else
        remove(entries.list.find((e)=> e.title === answers.entry));
    })
    .catch((err)=>{
      if(err)
        console.error('Couldn\'t list your entries');
    });
};

const edit = async(entry)=>{
      let edit = {};
       const answers =  await checkbox({message: 'Please select what you you want to edit in your blog',
                                      choices: [
                                        {name: 'Title', value: 'title'},
                                        {name: 'Body', value: 'body'}
                                      ]});
      if(answers.length === 1){
        if(answers[0] === 'title')
          edit = {
            title: await input({message: 'Please enter your new title'}),
            text: entry.text
          }
        else
          edit = {
            title: entry.title,
            text: await editor({message: 'Please edit your body', default: entry.text})
          }
      }else if(answers.length === 2){
        edit = {title: await input({message: 'Please enter your new title'}),
                body: await editor({message: 'Please edit your body', default: entry.text})}
      }else{
        console.log(chalk.red('No option selected'));
        list();
      }
    
      const endpoint = `http://localhost:3000/author/entry/${entry._id}/edit`;
      fetch(endpoint,
          {method: 'PUT',
            headers:{
              'Content-Type': 'application/json',
            },   
            body: JSON.stringify({title: edit.title, text: edit.text})}
      )
      .catch((err)=>{
        if(err)  
          console.error('Couldn\'t update your entry');
      });
          
};

const remove = async(entry)=>{
  const answer = await confirm({message:'Are you sure you want to delete this entry?'}) 

  if(answer){
    const endpoint = `http://localhost:3000/author/entry/${entry.title}/delete`
    fetch(endpoint, {method: 'POST'})
    .catch((err)=>{
      if(err)
        console.error('Couldn\'t remove your post');
    });
    return;
  }
  
  list();

};

export default select_editor_method; 
