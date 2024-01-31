import dateformat from 'dateformat';
import { select } from '@inquirer/prompts';

export default async ()=>{
  fetch('http://localhost:3000/reader/entries')
    .then((data)=>{
      return data.json();
    })
    .then(async(entries)=>{
      if(entries.list.length === 0){
        console.error('You don\'t have any entries to read');
        return;
      }
      const options = [];
      entries.list.forEach((e)=>{
        options.push({name: e.title, value: e.title});
      });
      const answer = await select({message: 'Please choose an article to read', choices: options});
      const article = entries.list.find((e)=>e.title === answer);
      console.log('\n',article.title, '\t', dateformat(article.date, "ddd mmm dd yyyy"));
      console.log('\n', article.text);

      if(article.comments.length!==0){
        article.comments.forEach((c)=>{
          console.log(c.user,'\n');
          console.log(c.text);
        });
      }
    });
};
