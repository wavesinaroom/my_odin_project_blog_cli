import { select, input, editor, confirm } from "@inquirer/prompts"

export default async()=>{
  fetch('http://localhost:3000/reader/entries')
    .then((data)=>{
      return data.json();
    })
    .then(async(entries)=>{
      const options = [];
      entries.list.forEach((e)=>{
        options.push({name: e.title, value: e.title});
      });
      const answer = await select({message: 'Select article', choices: options})
      comments_list(answer);
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
      edit(list_comments(entry));
      break;
    case 'remove':
      remove(list_comments(entry));
      break;
  }
}

const add = async(entry)=>{
  const answers = {user: await input({message:'Please enter your user'}),
                   text: await editor({message: 'Please enter your comment'})
                  };  
  const endpoint = `http://localhost:3000/reader/${entry.title}/comment/add`;
  fetch(endpoint,{method: 'POST',
    body:{
      user: answers.user,
      text: answers.text
    }
  });
};

const list_comments = async(entry)=>{
  const endpoint = `http://localhost:3000/reader/${entry.title}/comments`;
  const comments = fetch(endpoint);
  const options = [];

  comments.forEach((c)=>{
    options.push({name: c.text, value: c});
  });
  
  const answer = await select({message: 'Please choose a comment', choices: options});
  return {article: entry.title, comment: answer};
};

const edit = async(comment)=>{
  const endpoint = `http://localhost:3000/reader/${comment.article}/comment/${comment.id}`;
  const answer = await editor({message:'Please edit your comment', default: comment.text});
  comment.text = answer;
  fetch(endpoint, {method: 'POST',
    body: {
      edit: answer
    }
  });
};

const remove = async(comment)=>{
  const endpoint = `http://localhost:3000/reader/${comment.article}/comment/${comment.id}`;
  const answer = await confirm({message: 'Do you really want to delete this comment'})  
  if(answer)
    fetch(endpoint);
};

