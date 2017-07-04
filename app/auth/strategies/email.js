import User from '../../models/user';
import { Strategy as CustomStrategy } from 'passport-custom';

export default new CustomStrategy(async(ctx, done) => {
    console.log('Email Strategy: ', ctx.body);
    try {
        /** Test whether is a login using email and password */
        if (ctx.body.email && ctx.body.password) {
            const user = await User.findOne({ email: ctx.body.email.toLowerCase() });

            if (!user) { done(null, false, {'message': 'User not found.'}); }
            const password = ctx.body.password;
            if (!user.validPassword(password))
                return done(null, false, {'message': 'Password not correct.'});

            done(null, user);

        } else {
            done(null, false, {'message': 'Email and Password are required.'});
        }
    } catch (error) {
        done(error);
    }
});
