window.onload = function() {
    // Vérifier si un cookie de session existe
    var token = getCookie('token');
    if (token) {
        // Si un cookie de session existe, afficher le contenu de la page après la connexion réussie
        showLoggedInContent();
    } else {
        // Sinon, afficher le formulaire de connexion
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('login-success').style.display = 'none';
    }

    // Ajouter un gestionnaire d'événements pour le bouton de connexion
    document.getElementById('login-button').addEventListener('click', function() {
        var nom = document.getElementById('nom').value;
        var motDePasse = document.getElementById('mot-de-passe').value;

        // Effectuer la requête de connexion
        fetch('http://192.168.65.77:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom: nom,
                motDePasse: motDePasse
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Utilisateur ou mot de passe incorrect.');
            }
            return response.json();
        })
        .then(data => {
            // Stocker le token dans un cookie de session
            document.cookie = `token=${data.token}; path=/;`;
            // Afficher le contenu de la page après la connexion réussie
            showLoggedInContent();
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('error-message').innerText = error.message;
        });
    });
};

// Fonction pour récupérer la valeur d'un cookie
function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}

function showLoggedInContent() {
    // Cacher le formulaire de connexion
    document.getElementById('login-form').style.display = 'none';
    // Afficher le message de connexion réussie
    document.getElementById('login-success').style.display = 'block';
    // Rediriger vers la nouvelle page
    window.location.href = 'http://192.168.65.77/front3/tueur.html'; // Remplacez 'nouvelle_page.html' par l'URL de la page souhaitée
}

 // Gestionnaire d'événements pour le bouton de déconnexion
 document.getElementById("logout-button").addEventListener("click", function() {
    // Supprimer le token des cookies et du stockage local
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    localStorage.removeItem('token');
    // Recharger la page
    window.location.reload();
});