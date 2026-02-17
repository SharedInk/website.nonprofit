# Auckland Tutoring (Student-led • Non-profit)

A simple GitHub Pages website for a student-led tutoring organisation in Auckland.

## How to publish on GitHub Pages
1. Create a new GitHub repository (public is easiest).
2. Upload these files:
   - `index.html`
   - `styles.css`
   - `script.js`
3. Go to **Settings → Pages**
4. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: **main** / **root**
5. Save. Your site link will appear in a minute.

## Update email destination
Open `script.js` and change:
```js
const ORG_EMAIL = "yourorganisation@example.com";
