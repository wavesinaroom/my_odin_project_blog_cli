import { select } from '@inquirer/prompts';

export default async ()=>{
  fetch('http://localhost:3000/reader/entries')
    .then((data)=>{
      return data.json();
    })
    .then(async(entries)=>{
      const options = [];
      entries.list.forEach((e)=>{
        options.push({name: e.title, value: e.title});
      });
      const answer = await select({message: 'Please choose an article to read', choices: options});
      const article = entries.list.find((e)=>e.title === answer);
      console.log('\n',article.title, '\t', article.date);
      console.log('\n', article.text);

      if(article.comments.length!==0){
        article.comments.forEach((c)=>{
          console.log(c.user,'\n');
          console.log(c.text);
        });
      }
    });
};
