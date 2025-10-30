window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.crawl').style.animation = 'crawl 20s linear forwards';
});



const listEl = document.getElementById('list');
let editingId = null;

const starContainer = document.querySelector('.stars');
for (let i = 0; i < 200; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    starContainer.appendChild(star);
}

// 🌌 Skjul intro efter animation
setTimeout(() => {
    const crawlContainer = document.querySelector('.crawl-container');
    crawlContainer.style.transition = 'opacity 2s ease-out';
    crawlContainer.style.opacity = '0';

    setTimeout(() => {
        crawlContainer.style.display = 'none';
    }, 2000); // vent til fade-out er færdig
}, 20000); // matcher crawl-animationens varighed


document.getElementById('skipIntroBtn').addEventListener('click', () => {
    const crawlContainer = document.querySelector('.crawl-container');
    crawlContainer.style.transition = 'opacity 1s ease-out';
    crawlContainer.style.opacity = '0';

    setTimeout(() => {
        crawlContainer.style.display = 'none';
    }, 1000);
});



async function loadTask() {
    try {
        const res = await fetch('/api/characters');
        const items = await res.json();
        render(items);
    } catch (error) {
        alert('Fejl ved hentning af characters: ' + error.message);
    }
}

function render(items) {
    listEl.innerHTML = '';

    for (const it of items) {
       const li = document.createElement('li');
       li.className = 'characterName';


       const text = document.createElement('span');
       text.className = 'grow';
       text.textContent = `${it.name} (${it.role})`;

       const btn = document.createElement('button');
       btn.textContent = 'Slet';
       btn.addEventListener('click', () => deleteCharacter(it._id));

       const btn2 = document.createElement('button');
       btn2.textContent = 'Download character';
       btn2.addEventListener('click', () => downloadCharacter(it._id));

       const edtBtn = document.createElement('button');
       edtBtn.textContent = 'Rediger';
       edtBtn.addEventListener('click', () => {
           const nameInput = document.getElementById('CharacterName');
           const roleInput = document.getElementById('CharacterRole');
           const addBtn = document.getElementById('addBtn');

           nameInput.value = it.name;
           roleInput.value = it.role;
           addBtn.textContent = 'Gem'
           editingId = it._id;
       });
       const left = document.createElement('div');
       left.className = 'left';
       left.appendChild(text);
       li.append(left);

       const right = document.createElement('div');
       right.className = 'actions';
       right.appendChild(btn);
       right.appendChild(btn2);
       right.appendChild(edtBtn);
       li.appendChild(right);
       listEl.appendChild(li);
    }
}

function downloadCharacter(id) {
    window.location.href = `/api/characters/${id}/download`;
}


async function addCharacter() {
    const nameInput = document.getElementById('CharacterName');
    const roleInput = document.getElementById('CharacterRole');
    const addBtn = document.getElementById('addBtn');
    const character = {
        name: nameInput.value,
        role: roleInput.value,
    };
    let res;
    if (editingId) {
        try {
            res = await fetch(`/api/characters/${editingId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(character),
            });
        } catch (error) {
            alert('Fejl ved redigering' + error.message);
        }
    } else {
        try {
        res = await fetch(`/api/characters`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(character),
        });
    } catch (error) {
        alert('Fejl ved redigering' + error.message);}
    }

    const result = await res.json().catch(() => ({}));

    if (!res.ok) {
        const messages = Array.isArray(result.errors)
            ? result.errors.join('\n')
            : result.error || res.status;
        alert('Fejl ved oprettelse:\n' + messages);
        return;
    }

    nameInput.value = '';
    roleInput.value = '';
    addBtn.textContent = 'Add';
    editingId = null;
    await loadTask();
}
async function deleteCharacter(id) {
    try {
        const res = await fetch(`/api/characters/${id}`, {method: 'DELETE'});
        if (!res.ok) {
            const err = await res.json().catch(() => {
            });
            alert('Kan ikke slette character ' + (err.error || res.status));
        }
    } catch (error) {
        alert('Fejl ved sletning' + error.message);
    }
        await loadTask();
}



loadTask();
document.getElementById('addBtn').addEventListener('click', addCharacter);