

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const button = document.createElement('button');
  root.appendChild(button);
  button.innerHTML = "Google Login";

  const reqListener = () => {
    console.log(this.responseText);
  }

  button.addEventListener('click', e => {
    e.preventDefault();
    const req = new XMLHttpRequest();
    req.addEventListener('load', () => {
      console.log(this.responseText);
    });
    req.open("GET", "http://localhost:8080/auth/google");
    req.send();
  })

});
