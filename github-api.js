const input = document.querySelector('.search__git');
const menuRepositories = document.querySelector('.text__repositories');
const informationRepositories = document.querySelector('.text__repositories--pink');

 async function searchGit (name) {
    await fetch(`https://api.github.com/search/repositories?q=${name}&per_page=5`)
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
        });
    }
    function informationRepos (name,owner,start) {
        const informationRep = document.createElement('p');
        informationRep.classList.add('information__repositories');
        informationRep.innerHTML = `<p class = 'name'>Name: ${name}</p> <p class = 'name'>Owner: ${owner}</p> <p class = 'name'>Starts: ${start} </p>`
        informationRepositories.append(informationRep);
        closeInformation(informationRep)
        input.value = '';
        menuRepositories.innerHTML = '';
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
    const deleteElement = (el) => {
        el.parentNode.remove()
        el.onclick = null
      }
      const debounce = (fn, debounceTime) => {
        let inDebounce;
         return function() {
           clearTimeout(inDebounce)
           inDebounce = setTimeout(() => fn.apply(this, arguments), debounceTime)
         }
      };
    const info = debounce(searchGit, 1000);
     function gitRepos (event) {
        input.value? info(event.target.value) : ""
        menuRepositories.innerHTML = ""
    }
    input.addEventListener('keyup', gitRepos)