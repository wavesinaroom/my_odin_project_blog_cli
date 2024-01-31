import { select, input, editor, confirm } from "@inquirer/prompts"

export default async()=>{
  fetch('http://localhost:3000/reader/entries')
    .then((data)=>{
      return data.json();
    })
    .then(async(entries)=>{
      const options = [];
      entries.list.forEach((e)=>{
        options.push({name: e.title, value: e});
      });
      const answer = await select({message: 'Select article', choices: options})
      select_method(answer);
    })
    .catch((err)=>{
      if(err)
        console.error('Couldn\'t list your entries');
    });
};

const select_method = async(entry)=>{
  const answer = await select({message: 'Do you want to add, edit or remove a comment?',
    choices: [
      {
        name: 'Add',
        value: 'add',
        description: 'Add a comment'
      },
      {
        name: 'Edit',
        value: 'edit',
        description: 'Edit a comment'
      },
      {
        name: 'Remove',
        value: 'remove',
        description: 'Remove a comment'
      }
    ]});  

  switch(answer){
    case 'add':
      add(entry);
      break;
    case 'edit':
      edit(entry);
      break;
    case 'remove':
      remove(entry);
      break;
  }
}

const add = async(entry)=>{
  const answers = {user: await input({message:'Please enter your user'}),
                   text: await editor({message: 'Please enter your comment'})
                  };  
  const endpoint = `http://localhost:3000/reader/${entry.title}/comment/add`;
  fetch(endpoint,{method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(answers)
  });
};

const edit = async(entry)=>{
  const listUrl = `http://localhost:3000/reader/${entry.title}/comments`
  fetch(listUrl)
    .then((res)=>{
      return res.json();
    })
    .then(async(list)=>{
      const comments = [];
      list.comments.forEach((c)=>{
        comments.push({name:c.text, value:c});
      });
      const comment = await select({message: 'Choose a comment', choices: comments});
      comment.text = await editor({message: 'Please enter your text', default: comment.text});

      const endpoint = `http://localhost:3000/reader/${entry.title}/comment/${comment._id}/edit`;

      fetch(endpoint,{method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(comment)
      });
    })
    .catch((err)=>{
      if(err)
        console.log('Couldn\'t fetch list of comments');
    });
};

const remove = async(entry)=>{
  const listUrl = `http://localhost:3000/reader/${entry.title}/comments`
  fetch(listUrl)
    .then((res)=>{
      return res.json();
    })
    .then(async(list)=>{
      const comments = [];
      list.comments.forEach((c)=>{
        comments.push({name:c.text, value:c});
      });
      const comment = await select({message: 'Choose a comment', choices: comments});
      const remove = await confirm({message: 'Do you really want to delete this comment?'});

      if(!remove)
        return;

      const endpoint = `http://localhost:3000/reader/${entry.title}/comment/${comment._id}/delete`
      fetch(endpoint,{method:'POST'});

    })
};

