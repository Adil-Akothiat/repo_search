const input = document.querySelector('input');
const form = document.querySelector('form');
const result = document.getElementById('result');
//event
form.addEventListener('submit', repoCheck);

function getRepos() {
    let promise = new Promise((resolve, reject) => {
        if(input.value == '') {
            reject(result.innerHTML = '<span>please enter the name!</span>')
        }else {
            const theInput = input.value;
            resolve(
                fetch(`https://api.github.com/users/${input.value}/repos`)
                .then(response => response.json()) 
                .then(repositories => {
                    result.innerHTML = '';
                    repositories.forEach(repo => {
                        let div = document.createElement('div');
                        let repoName = document.createTextNode(repo.name);
                        div.setAttribute('class', 'repo_name')
                        div.appendChild(repoName);
                        result.appendChild(div);
                        //add link 
                        let link = document.createElement('a');
                        let linkContent = document.createTextNode('link');
                        link.appendChild(linkContent);
                        link.setAttribute('href', `https://github.com/${theInput}/${repo.name}`);
                        link.setAttribute('target', '_blank');
                        div.appendChild(link);
                        //add stargazers
                        let startSpan = document.createElement('span');
                        let startContent = document.createTextNode(`${repo.stargazers_count}★`);
                        startSpan.setAttribute('class', 'my_span');
                        startSpan.appendChild(startContent);
                        div.appendChild(startSpan);
                    });
                })
            )
            input.value = '';
        }
    })
    .then(resolve=> {return resolve})
    .catch(reject => {return reject});
}

function repoCheck(e) {
    e.preventDefault();
    getRepos();
}
