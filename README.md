[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/GhfBEoXz)

### 📚 Adashboard Skills Themes

### Objectif du projet

Créer un mini gestionnaire de compétences structuré par thèmes, simulant un outil de suivi de progression technique (type roadmap personnelle ou suivi d’apprentissage).
Application full-stack construite avec React + Vite permettant de gérer des thèmes de compétences et leurs skills associées, avec suivi d’avancement (KO / PROGRESS / OK).
L’application permet de :
- Ajouter un thème
- Ajouter plusieurs skills à un thème
- Mettre à jour le statut d’une skill
- Supprimer un thème
- Synchroniser les données avec un backend local

### 📖 Description du projet
Application front-end connectée à une API REST locale (http://localhost:3000/themes).
L’application permet de :
- Charger dynamiquement les thèmes depuis le backend (useEffect)
- Ajouter un thème via une requête POST
- Supprimer un thème via DELETE
- Mettre à jour le statut d’une skill via PUT
- Gérer un formulaire dynamique avec ajout/suppression de champs
- Afficher une interface moderne et responsive avec TailwindCSS

### 🛠️ Stack technique
- React
- Vite
- JavaScript (ES6+)
- TailwindCSS
- API REST locale (Node.js / Express ou équivalent)


Routes utilisées :
Méthode	Route	Description
- GET	/themes	Récupérer tous les thèmes
- POST	/themes	Ajouter un thème
- DELETE	/themes/:id	Supprimer un thème
- PUT	/themes/:themeId/skills/:skillIndex/:status	Mettre à jour une skill


### Concepts travaillés
Ce projet met en pratique :
- useState et useEffect
- Gestion d’API avec fetch et async/await
- Manipulation de tableaux immuables (map, filter)
- Synchronisation props → state
- Gestion de formulaires dynamiques
- Architecture composants (App → Themes → Skills)
- Communication parent/enfant via props


⚙️ Installation
1️⃣ Cloner le projet
git clone https://github.com/ton-username/nom-du-repo.git
cd nom-du-repo
2️⃣ Installer les dépendances
npm install
3️⃣ Lancer le front
npm run dev
🔌 Backend requis

Le projet nécessite une API locale accessible à :

http://localhost:3000/themes
