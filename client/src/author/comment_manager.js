import { select, confirm } from "@inquirer/prompts";

const entries_list = async()=>{
  fetch('http://localhost:3000/author/entries')
    .then((data)=>{
      return data.json();
    })
    .then(async(entries)=>{
      if(entries.length===0){
        console.error('You don\'t have any entries');
        return;
      } 
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

const comments_list = async(entry)=>{
  const endpoint = `http://localhost:3000/author/entry/${entry}/comments`
  fetch(endpoint)
    .then((data)=>{
      return data.json();
    })
    .then(async(result)=>{
      if(result.comments.length === 0){
        console.error('You don\'t have any comments');
      }

      const options = [];
      result.comments.forEach((c)=>{
        options.push({name: c.text, value: {title: entry, id:c._id}})
      });
      const answer = {comment: await select({message: 'Please select a comment to delete', choices:options}), 
                      confirmation: await confirm({message: 'Are you sure you want to delete this comment?'})}
      if(answer.confirmation)
        remove(answer.comment);
    })
    .catch((err)=>{
      if(err)
        console.error('Couldn\'t list your entry comments');
    });
}

const remove = async(comment)=>{
  const endpoint = `http://localhost:3000/author/entry/${comment.title}/comment/${comment.id}/delete`;
  fetch(endpoint, {method: 'POST'})
    .catch((err)=>{
      if(err)
        console.error('Couldn\'t remove your entry comment');
    });
};

export default entries_list; 
