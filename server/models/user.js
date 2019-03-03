const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: [4, 'Too short, min 4 characters'],
        max: [32, 'Too long, max is 32 characters']
    },
    email: {
        type: String,
        required: true,
        min: [4, 'Too short, min 4 characters'],
        max: [32, 'Too long, max is 32 characters'],
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        required: true, min: [4, 'Too short, min 4 characters'],
        min: [4, 'Too short, min 4 characters'],
        max: [120, 'Too long, max is 32 characters']
    },
    rentals: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Rental'
        }
    ]
});

userSchema.methods.hasSamePassword = function(reqPassword) {
    return bcrypt.compareSync(reqPassword, this.password);//TODO: is it needed async?
};

userSchema.pre('save', function(next) {//cant use arrow here, because arrow has own 'this' scope
    const user = this;

    bcrypt.genSalt(8, (err, salt) => {

        console.log(user);
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }

            console.log("bcrypt password" + hash);
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', userSchema);