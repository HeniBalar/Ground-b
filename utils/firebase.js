// const browserEnv = require("browser-env")
// const {initializeApp} = require("firebase/app");

// browserEnv(['navigator']);

// const firebaseConfig = {
//   apiKey: "AIzaSyBjO6CkSyV4TxDItWRPsNn1JTlzgTqbOGI",
//   authDomain: "groundapp-94b04.firebaseapp.com",
//   projectId: "groundapp-94b04",
//   storageBucket: "groundapp-94b04.appspot.com",
//   messagingSenderId: "99090239827",
//   appId: "1:99090239827:web:1bdde7d089ad3a3b3551a6",
//   measurementId: "G-JEKG4Y0SF7"
// };

// const app = initializeApp(firebaseConfig);

// module.exports = app;



var admin = require("firebase-admin");

admin = admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "groundapp-94b04",
    "private_key_id": "3890b7c18606478467173fb33fc56ec8b2b8bcd0",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCraGnAgS56Ymt4\n1VNqEb60aHb6P7CQiR6Ua8Gl60X3C5rUo41285WW+YNjJrPskZQB81NZq4LTyZ8s\nxpd8cO9OHLRREFR9eouwpaUsBr8il2RawJWNRfI8KgrjIofgJlv6VKJmU20w5rQQ\nxVR2f0Ic9RocepqVdBzNfWzgGSSQdf7TIKrflqXOE1f7+qVBiO/CEh7ChL1PRs2W\nrds3x6Snynu2ppFF8I1FgppqQ2B9bB5uJwHbgeXHHpbb47yA9WevrJHdwH1e/+mX\nnHqFkrNSAKhSfcYzC1hoZia8Y+1swswKkteBQwkFFILe24dm7DBlDxNeKNX02tUa\nAan9ULo/AgMBAAECggEAVHQpKtbbciR9BHfDVi8xEc2o1Ys88TIGVaW0L455Fgxr\nOJrvEC1bRpxgrqE6pHRkAwQDTNqzJqugWFzu9brlRczh0VEk+ABBxIMRG1ylnyMN\nqKNb7FQK0rb6T0hLv1bXGcPKknVHhwEctmirwYjZJ9BiEacc9EdWC69hThdFS0Fw\n/5IuiwncKhjpben2W6Wvv/s3QH2/fEiXFTmiL+pr1qibsT4YDGJFsjZQGj4SM+i5\nLKC+MMG24qxG8URka3u7a6tzip3X5O6/7h78MHcovYLFpvZovplvn8WX57lo/Bf8\n722iFPNmKZ0H0o2lhERvimKRYsgATbr3ZJZ0QQG3yQKBgQDitTozj4N6Djwrb86I\nDZug2BPHrki3kKq6EHVkR6YHelh8Yg/sn88xqXAbgdG7HhTbNGZq/8yGiX/w5DlI\npwqNAmwI/ghn322eYADOwur0ggM17KGgZn0CnAQKFWI3u/pxL7HTdmRI9OwmwbP9\nWKijaQqycgKaQEBFMGRzc0x2+QKBgQDBjgltgg7TIVW4kuJejoIhS3oRLAjOvFZz\nDPKglmetCG8IklyDNnEQzARVcqrwNY6JQUriH3tjp06WEUNFkH6mNrysjKuAilYq\nLqFZUjeaDYT0lQoGh+TVBpXMG+gsASQvXdBTxBvQovWc7sqlYV6riVlliasUHG9c\ngb0DfKVw9wKBgQDdTtyKCMboF41VOcf7uIz77vMgMlp6F5cSG479XZQOKLjIc1Ho\nQ/kXGbh+obQDXdIuSnDQcvVNQFzM432oFqiODpc4EARUoh94Q2+GZ3DFT0WjFmSR\nGHtgWLz4uvcuQSqx40VMkH5FWhJNozn5TtsQ6jGvEOzJd39GC3+D1EIIwQKBgQCv\nsuLGAHC6oSDySouosA5acOxe2C0qlXaYO6GnusBkJyq7ijjmdy4NxFUOx+d54/P+\njkGOoGtem8pPmV4KsM72zOtaattn9Kug4PFgZqzIcAtIBl6ybPuBkNe8D30jLOoP\nAUcSMwvYyYTRr0ZO9+N7LVP0QxMET4ebXr4YgzafIwKBgDN2nTepb1HJoA24CXmU\nV/dNGn+shFKEEzDHUSj9LleFO/fJ7g0mCGCslPuwLZZ3prw6qDh0h8M8GFPPlAnf\ndCVMPQnPsAHcFwMA2RiMrHEjDkjy3hFT4eI5KJtxi3zqUFmugtPSnGvWA+YnVfN6\n34jAzcJ6QSHlE2HwGQrzAfUi\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-zb8ar@groundapp-94b04.iam.gserviceaccount.com",
    "client_id": "115313193564451487697",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zb8ar%40groundapp-94b04.iam.gserviceaccount.com"
  })
});

module.exports = admin;
