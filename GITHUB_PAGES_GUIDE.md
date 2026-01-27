# 📖 Guide d'Activation GitHub Pages

## 🔧 Étape 1 : Activer GitHub Pages

### Option A : Via l'interface web (RECOMMANDÉ)

1. **Allez sur** : https://github.com/temel84/iptv/settings/pages

2. **Configuration** :
   - **Source** : Sélectionnez `Deploy from a branch`
   - **Branch** : Sélectionnez `gh-pages` (ou `main`)
   - **Folder** : `/ (root)`
   - **Cliquez sur Save** ✓

3. **Patientez 1-2 minutes** ⏳

4. **Votre site sera accessible** :
   ```
   https://temel84.github.io/iptv/
   ```

### Option B : Via GitHub Actions (Automatique)

1. **Allez sur** : https://github.com/temel84/iptv/settings/pages

2. **Configuration** :
   - **Source** : Sélectionnez `GitHub Actions`
   - **Le workflow s'exécutera automatiquement**

3. **Patientez 2-3 minutes** ⏳

4. **Vérifiez le déploiement** :
   - Allez sur : https://github.com/temel84/iptv/actions
   - Vous devriez voir "Deploy to GitHub Pages" en vert

## ✅ Vérifier que ça fonctionne

1. **Attendez 2-3 minutes** après la configuration

2. **Ouvrez** : https://temel84.github.io/iptv/

3. **Si ça ne marche pas** :
   - Vérifiez les Actions : https://github.com/temel84/iptv/actions
   - Vérifiez les Settings : https://github.com/temel84/iptv/settings/pages
   - Regardez s'il y a des erreurs rouges

## 🐛 Résolution de Problèmes

### Problème 1 : Page 404
**Solution** :
- Vérifiez que GitHub Pages est activé
- Attendez 2-3 minutes que le déploiement se fasse
- Vérifiez que la branche est correcte (gh-pages ou main)

### Problème 2 : Erreur 404 sur certaines pages
**Déjà résolu** :
- Le fichier `404.html` redirige automatiquement vers l'accueil

### Problème 3 : Fichiers manquants
**Déjà résolu** :
- Le fichier `.nojekyll` empêche Jekyll de modifier les fichiers

### Problème 4 : Le site ne se met pas à jour
**Solution** :
```bash
git add .
git commit -m "Update"
git push origin main
```
- GitHub Actions redéploiera automatiquement

## 🎯 Structure Fichier

```
iptv/
├── .github/
│   └── workflows/
│       └── pages.yml        # Workflow de déploiement auto
├── .nojekyll                 # Désactive Jekyll
├── 404.html                  # Page 404 custom
├── index.html                # Page d'accueil
├── style.css                 # Styles
├── script.js                 # JavaScript
├── manifest.json             # PWA manifest
└── README.md                 # Documentation
```

## 🚀 Méthode Rapide (Recommandée)

1. **Cliquez sur ce lien** :
   👉 https://github.com/temel84/iptv/settings/pages

2. **Configurez comme ceci** :
   ```
   Source: Deploy from a branch
   Branch: gh-pages (ou main)
   Folder: / (root)
   ```

3. **Cliquez Save** 💾

4. **Patientez 2-3 minutes** ⏳

5. **Ouvrez** : https://temel84.github.io/iptv/

## 📱 Test Local

Pour tester le site localement avant le déploiement :

```bash
# Option 1: Ouvrir simplement le fichier
start index.html

# Option 2: Avec un serveur local (Python)
python -m http.server 8000
# Puis ouvrez : http://localhost:8000

# Option 3: Avec Node.js
npx serve
# Puis ouvrez l'URL affichée
```

## 🎉 Une fois que ça fonctionne !

Votre site sera accessible à :
- 🌐 **https://temel84.github.io/iptv/**

Vous pourrez :
- ✅ Partager le lien
- ✅ L'ajouter aux favoris
- ✅ L'installer comme app sur mobile (PWA)
- ✅ Le tester sur tous les appareils

## 🔗 Liens Utiles

- GitHub Repository : https://github.com/temel84/iptv
- GitHub Pages Settings : https://github.com/temel84/iptv/settings/pages
- GitHub Actions : https://github.com/temel84/iptv/actions
- Site Déployé : https://temel84.github.io/iptv/

---

**Besoin d'aide ?** Vérifiez les erreurs dans l'onglet "Actions" du dépôt GitHub !
