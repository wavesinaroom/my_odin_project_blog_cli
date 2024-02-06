import { select } from '@inquirer/prompts';
import select_editor_method from './entries_editor.js';
import select_publisher_method from './publisher.js';
import entries_list from './comment_manager.js'


export default async ()=>{
  const answer = await select({message: 'Welcome author! Please select a choice from the menu',
    choices: [
      {
        name: 'Blog entry editor',
        value: 'editor',
        description: 'Create, edit of delete a blog entry'
      },
      {
        name: 'Publisher',
        value: 'publisher',
        description: 'Publish or unpublish your blog entries'
      },
      {
        name: 'Comment manager',
        value: 'comment_manager',
        description: 'Delete entry comments'
      }
    ]})

  switch(answer){
    case 'editor':
      select_editor_method();
      break;
    case 'publisher':
      select_publisher_method();
      break;
    case 'comment_manager':
      entries_list();
      break;
  }
}

