import {
    authEmail,
    generateToken
} from '../../auth';

import User from '../../models/user';

export default (router) => {
    router.post('/auth/email', authEmail(), generateToken());
    router.post('/auth/register', register, generateToken());
};

async function register(ctx, next) {
    const { name, email, password } = ctx.request.body;

    // TODO - improve validation
    if (name && email && password) {
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                name,
                email
            });
            user.password = user.generateHash(password);
            await user.save();

            ctx.passport = {
                user: user._id,
            };

            console.log(ctx.passport)

            await next();

        } else {
            ctx.status = 400;
            ctx.body = { status: 'error', message: 'E-mail already registered' };
        }
    } else {
        ctx.status = 400;
        ctx.body = { status: 'error', message: 'Invalid email or password' };
    }
}
