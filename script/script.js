let users = [
  { name: "Aday", email: "adadda@gmail.com", img: "img/icon plus.png" },
  { name: "Tim", email: "timtitm@gmail.com", img: "img/icon plus.png" },
  { name: "Eugen", email: "eegegen@gmail.com", img: "img/icon plus.png" }
];
let tasks = [
  {
    title: "Youtube Werbung",
    category: "Marketing",
    description: "Werbungskosten ausrechnen",
    date: "12.03.2022",
    urgency: "low",
    assigned: [users[0],users[1],users[2]]
  },
  {
    title: "Windows installieren",
    category: "IT",
    description: "Windows 11 muss unbedingt installiert werden",
    date: "10.03.2022",
    urgency: "high",
    assigned: [users[1],users[2]]
  }
];


function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}
