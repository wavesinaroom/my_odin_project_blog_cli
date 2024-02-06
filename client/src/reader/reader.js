import { select } from '@inquirer/prompts';
import viewer from './viewer.js';
import comment_manager from './comment_manager.js';

export default async ()=>{
  const answer = await select({message: "Do you want to read or comment an article", 
    choices:[
      {name: 'Read', value: 'read'},
      {name: 'Comment', value: 'comment'}
    ]
  });

  if(answer === 'read')
    viewer();
  else if(answer === 'comment')
    comment_manager();
  else
    console.error('Unknown option');
};
