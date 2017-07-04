import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        index: true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: false,
        index: true,
    },
    username: {
        type: String,
        index: true,
    },
    password: {
        type: String,
    }
});

// methods ======================
// generating a hash

UserSchema.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', UserSchema);
