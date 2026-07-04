function sendToWhatsapp(){

  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;

  let text =
`Hi e-Corner,

 New Customer Enquiry

Name:
${name}

 Phone:
${phone}

 Email:
${email}

 Subject:
${subject}

 Message:
${message}`;

  let url =
"https://wa.me/919941950591?text=" +
encodeURIComponent(text);

  window.open(url,"_blank");

}