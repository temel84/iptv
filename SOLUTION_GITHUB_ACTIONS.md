# 🚨 PROBLÈME GITHUB ACTIONS - SOLUTIONS

## 📋 Ce qui se passe

Vous recevez un email "deploy to github all jobs have failed" car le workflow GitHub Actions échoue.

## ✅ SOLUTIONS (dans l'ordre)

### SOLUTION 1 : Activer GitHub Pages manuellement (LE PLUS RAPIDE)

1. **Allez sur** : https://github.com/temel84/iptv/settings/pages

2. **Configuration** :
   ```
   Source: Deploy from a branch
   Branch: main (ou gh-pages)
   Folder: / (root)
   ```

3. **Cliquez Save** 💾

4. **Patientez 2-3 minutes** ⏳

5. **Votre site sera à** : https://temel84.github.io/iptv/

✅ **C'est la méthode la plus simple et la plus fiable !**

---

### SOLUTION 2 : Utiliser GitHub Actions (Automatique mais plus complexe)

Si vous voulez absolument utiliser GitHub Actions :

#### ÉTAPE 1 : Vérifier que GitHub Pages est activé

1. Allez sur : https://github.com/temel84/iptv/settings/pages
2. Sous "Source", sélectionnez : **GitHub Actions** (pas "Deploy from a branch")
3. Cliquez Save

#### ÉTAPE 2 : Vérifier les permissions du dépôt

1. Allez sur : https://github.com/temel84/iptv/settings/actions
2. Sous "Workflow permissions", assurez-vous que :
   - ✅ "Read and write permissions" est sélectionné
   - ✅ "Allow GitHub Actions to create and approve pull requests" est coché

#### ÉTAPE 3 : Vérifier les workflows

1. Allez sur : https://github.com/temel84/iptv/actions
2. Cliquez sur le workflow échoué
3. Lisez le message d'erreur

---

### SOLUTION 3 : Déploiement manuel (Ultime solution)

Si rien ne fonctionne :

```bash
# Créer un dossier orphelin
git checkout --orphan gh-pages

# Nettoyer tout
git rm -rf .

# Copier seulement les fichiers nécessaires
git checkout main -- index.html style.css script.js manifest.json 404.html

# Commiter
git commit -m "Manual deployment to gh-pages"

# Pusher
git push origin gh-pages

# Retourner sur main
git checkout main
```

Puis activez GitHub Pages avec la branche `gh-pages`.

---

## 🔍 Vérifier les erreurs

### Où voir les erreurs détaillées :

1. **GitHub Actions** : https://github.com/temel84/iptv/actions
   - Cliquez sur le workflow échoué (❌ rouge)
   - Cliquez sur le job
   - Lisez les logs

2. **Déploiements** : https://github.com/temel84/iptv/deployments
   - Vérifiez le statut des déploiements

### Erreurs courantes :

| Erreur | Solution |
|--------|----------|
| "Resource not accessible" | Vérifiez les permissions Actions |
| "Branch not found" | La branche n'existe pas |
| "No GitHub Pages configuration" | Activez Pages dans Settings |
| "404 Not Found" | Le dossier _pages manque |

---

## ⚡ RECOMMANDATION

**Utilisez SOLUTION 1** - c'est la méthode la plus simple et fiable !

1. Ouvrez : https://github.com/temel84/iptv/settings/pages
2. Source : `Deploy from a branch`
3. Branch : `main`
4. Folder : `/ (root)`
5. Save

C'est tout ! GitHub Pages va automatiquement déployer votre site à chaque push sur la branche main.

---

## 🎯 Une fois configuré

Votre site sera automatiquement mis à jour à chaque fois que vous faites :

```bash
git add .
git commit -m "Update"
git push origin main
```

Et dans 2-3 minutes, les changements seront en ligne sur :
https://temel84.github.io/iptv/

---

## 📞 Si ça ne marche toujours pas

Donnez-moi le message d'erreur exact que vous voyez dans :
https://github.com/temel84/iptv/actions

Je pourrai vous aider à le corriger précisément !
