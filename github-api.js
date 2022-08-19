const input = document.querySelector('.search__git');
const menuRepositories = document.querySelector('.text__repositories');
const informationRepositories = document.querySelector('.text__repositories--pink');

 function searchGit (name) {
    fetch(`https://api.github.com/search/repositories?q=${name}&per_page=5`)
    .then(res => res.json()
    .then(result => {
        result.items.map(el => listRepositories(`${el.name}`,`${el.owner.login}`,`${el.stargazers_count}`))
     }))

}
    function listRepositories (name,owner,start) {
        const listRepos = document.createElement('p');
        listRepos.classList.add('name__repositories');
        listRepos.innerHTML = name.toUpperCase();
        menuRepositories.append(listRepos);
        listRepos.addEventListener('click', () => {
            informationRepos(name,owner,start);
            menuRepositories.remove()
        });
    }
    function informationRepos (name,owner,start) {
        const informationRep = document.createElement('p');
        informationRep.classList.add('information__repositories');
        informationRep.innerHTML = `Name:${name}\n Owner:${owner}\n Starts:${start}`
        informationRepositories.append(informationRep);
        closeInformation(informationRep)
        input.value = '';
        menuRepositories.value = '';
    }
    function closeInformation (info) {
        const close = document.createElement('button');
        close.classList.add('close');
        informationRepositories.append(close)
        close.addEventListener('click', () => {
            info.remove();
            close.remove()
        })
    }
    function debounce(f, ms) {
        let isCooldown = false;  
        return function() {
          if (isCooldown) return; 
          f.apply(this, arguments);
          isCooldown = true;
          setTimeout(() => isCooldown = false, ms);
        }; 
      }
    const info = debounce(searchGit, 1000);
    const gitRepos = event => {
        input.value? info(event.target.value) : ""
        menuRepositories.innerHTML = ""
    }
    input.addEventListener('keyup', gitRepos)