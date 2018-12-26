const {
    SHA256
} = require('crypto-js');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

var data = {
    id: 1
};

var password = 'abc123';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log('hash====> ' + hash)
//     });
// });

var hash = '$2a$10$1y.6yiNBqLTW/S2LdPZHyOZbD1wPzM9J9EFogZHDwhogv7lrLYOkK';

bcrypt.compare(password, hash).then((res) => {
    console.log('res====> ' + res)
});


// var encoded = jwt.sign(data, '333');
// console.log('encoded', encoded);

// decoded = jwt.verify(encoded, '333')
// console.log('decoded', decoded);


// var message = 'I am user';

// var hash = SHA256(message);

// console.log(`${message}`);
// console.log(`${hash}`);

// var data = {
//     id: 6
// };
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'secter').toString()
// };

// token.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'secter').toString();

// if (token.hash === resultHash) {
//     console.log('data was not changed');
// } else {
//     console.log('data was changed');
// }