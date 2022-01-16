// https://dog.ceo/api/breed/hound/images/random

const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const writeFile = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(err);
      resolve('success');
    });
  });
};    


readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);

    return writeFile('dog-img.txt', res.body.message);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));

const getDogPic = async ()=>{

    try {
        const data = await readFilePro(`${__dirname}/dog.txt`)
        console.log(`Breed: ${data}`);
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(res.body.message);
        const success = await writeFile('dog-img.txt', res.body.message);
        console.log(success);
        
    } catch (error) {
        console.log(error)
    }
  
}
getDogPic() 