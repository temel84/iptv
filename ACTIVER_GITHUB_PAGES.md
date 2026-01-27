# 🚀 ACTIVER GITHUB PAGES - GUIDE PAS À PAS

## 🔥 ÉTAPE 1 : Ouvrir les Paramètres

**Cliquez sur ce lien (je l'ai ouvert pour vous) :**
👉 https://github.com/temel84/iptv/settings/pages

---

## ⚙️ ÉTAPE 2 : Configurer

Vous devriez voir une page "Pages" avec ces options :

### 📋 Source
**Sélectionnez** : `Deploy from a branch` (pas GitHub Actions pour l'instant)

### 🌳 Branch
**Sélectionnez** : `main` (ou `gh-pages` - les deux fonctionnent)

### 📁 Folder
**Sélectionnez** : `/ (root)`

### 💾 Bouton
**Cliquez sur** : `Save` (bouton vert ou bleu)

---

## ⏳ ÉTAPE 3 : Attendre

**Patientez 2-3 minutes** ⏰

GitHub va déployer votre site. Vous pouvez voir l'avancement ici :
👉 https://github.com/temel84/iptv/deployments

---

## ✅ ÉTAPE 4 : Vérifier

**Ouvrez votre site** :
🌐 https://temel84.github.io/iptv/

---

## 🐛 SI ÇA NE MARCHE PAS

### Option A : Vérifier les déploiements
Allez sur : https://github.com/temel84/iptv/deployments
- Si vous voyez **rouge** ❌ = erreur
- Si vous voyez **vert** ✅ = succès

### Option B : Changer de branche
Si `main` ne marche pas, essayez `gh-pages` :
1. Revenez sur : https://github.com/temel84/iptv/settings/pages
2. Changez "Branch" pour : `gh-pages`
3. Cliquez "Save"

### Option C : GitHub Actions (avancé)
Si vous voulez un déploiement automatique :
1. Allez sur : https://github.com/temel84/iptv/settings/pages
2. Source : `GitHub Actions`
3. Le workflow se lancera automatiquement

---

## 📊 Vérifier que tout est en ligne

```bash
# Vérifier les fichiers sur GitHub
git ls-remote --heads origin main
git ls-remote --heads origin gh-pages
```

---

## 🎯 Ce qui est déjà prêt

✅ Tous les fichiers HTML, CSS, JS sont en place
✅ La branche `main` est à jour
✅ La branche `gh-pages` existe aussi
✅ Le workflow GitHub Actions est configuré
✅ Le fichier `.nojekyll` est présent

**IL MANQUE JUSTE L'ACTIVATION DANS LES SETTINGS !**

---

## 📱 Une fois en ligne

Votre site sera accessible à :
- https://temel84.github.io/iptv/

Vous pourrez :
- Partager le lien
- Le mettre sur votre carte de visite
- L'ajouter à WhatsApp Business
- L'installer comme app sur mobile

---

## 🔗 Liens Importants

- **Votre dépôt** : https://github.com/temel84/iptv
- **Settings Pages** : https://github.com/temel84/iptv/settings/pages
- **Déploiements** : https://github.com/temel84/iptv/deployments
- **Site en ligne** : https://temel84.github.io/iptv/

---

## 💡 RAPPEL

Le code est 100% prêt sur GitHub. Il faut juste **activer GitHub Pages** dans les paramètres du dépôt. C'est une action manuelle qui prend 30 secondes !

**ACTION MAINTENANT :**
1. Le navigateur est déjà ouvert sur la page de configuration
2. Sélectionnez "Deploy from a branch"
3. Sélectionnez "main"
4. Sélectionnez "/ (root)"
5. Cliquez "Save"
6. Attendez 2-3 minutes
7. Ouvrez https://temel84.github.io/iptv/

🚀 **C'est tout ! Votre site sera en ligne !**
