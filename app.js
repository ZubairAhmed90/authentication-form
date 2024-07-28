
        var firebaseConfig = {
            apiKey: "AIzaSyDq7KjjV9ewIdRrYg827HOAteYbsjGXhKA",
            authDomain: "authentication-form-cf448.firebaseapp.com",
            projectId: "authentication-form-cf448",
            storageBucket: "authentication-form-cf448.appspot.com",
            messagingSenderId: "620682990067",
            appId: "1:620682990067:web:187ee575a585c30f550286",
            measurementId: "G-YW4TT466H7"
        };
     

  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
  
  document.querySelectorAll('input[name="authType"]').forEach((elem) => {
    elem.addEventListener('change', function(event) {
      var value = event.target.value;
      if (value === 'signup') {
        document.getElementById('signup-fields').classList.remove('hidden');
      } else {
        document.getElementById('signup-fields').classList.add('hidden');
      }
    });
  });
  
  document.getElementById('auth-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var authType = document.querySelector('input[name="authType"]:checked').value;
  
    if (authType === 'signup') {
      var name = document.getElementById('name').value;
      var phone = document.getElementById('phone').value;
      var country = document.getElementById('country').value;
  
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;
          db.collection("users").doc(user.uid).set({
            name: name,
            phone: phone,
            country: country,
            email: email
          })
          .then(() => {
            showSuccessMessage();
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        });
    } else if (authType === 'login') {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          showSuccessMessage();
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/user-not-found') {
            alert('User not found. Please sign up.');
          } else {
            alert(errorMessage);
          }
        });
    }
  });
  
  function showSuccessMessage() {
    document.getElementById('auth-form').classList.add('hidden');
    document.getElementById('success-message').classList.remove('hidden');
  }
  
  